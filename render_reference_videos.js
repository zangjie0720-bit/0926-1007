const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/75772/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core');

const root = __dirname;
const manifest = JSON.parse(fs.readFileSync(path.join(root, '参考片素材', 'manifest.json'), 'utf8'));
const duration = process.argv.includes('--test') ? 3 : 60;
const width = 360;
const height = 640;

async function render(browser, day) {
  const page = await browser.newPage({ viewport: { width, height } });
  const images = day.frames.map(file => 'data:image/png;base64,' + fs.readFileSync(path.join(root, '参考片素材', '图片', file)).toString('base64'));
  await page.goto('about:blank');
  const base64 = await page.evaluate(async ({ images, day, duration, width, height }) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const loaded = await Promise.all(images.map(src => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    })));
    const stream = canvas.captureStream(12);
    const type = MediaRecorder.isTypeSupported('video/webm;codecs=vp8') ? 'video/webm;codecs=vp8' : 'video/webm';
    const recorder = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 450000 });
    const chunks = [];
    recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
    const finished = new Promise(resolve => recorder.onstop = resolve);
    const start = performance.now();
    function frame() {
      const t = Math.min(duration, (performance.now() - start) / 1000);
      const act = Math.min(2, Math.floor(t / (duration / 3)));
      const img = loaded[act];
      const ratio = Math.max(width / img.width, height / img.height);
      const dw = img.width * ratio;
      const dh = img.height * ratio;
      const local = (t % (duration / 3)) / (duration / 3);
      const drift = Math.sin(local * Math.PI) * 4;
      ctx.fillStyle = '#101010';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, (width - dw) / 2 + drift, (height - dh) / 2, dw, dh);
      const grad = ctx.createLinearGradient(0, height - 160, 0, height);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,.76)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, height - 160, width, 160);
      ctx.fillStyle = 'white';
      ctx.font = '600 21px "Microsoft YaHei", sans-serif';
      ctx.fillText(day.title, 18, height - 112, width - 36);
      ctx.font = '15px "Microsoft YaHei", sans-serif';
      ctx.fillText(['首帧｜出发', '中帧｜当天主画面', '尾帧｜收尾'][act], 18, height - 81, width - 36);
      ctx.font = '14px "Microsoft YaHei", sans-serif';
      ctx.fillText(day.tips[act], 18, height - 54, width - 36);
      ctx.fillStyle = 'rgba(255,255,255,.7)';
      ctx.fillRect(18, height - 27, (width - 36) * (t / duration), 3);
      if (t < duration) requestAnimationFrame(frame);
      else recorder.stop();
    }
    recorder.start(1000);
    frame();
    await finished;
    const blob = new Blob(chunks, { type });
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, { images, day, duration, width, height });
  const output = path.join(root, '参考片素材', '视频', day.id + '.webm');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, Buffer.from(base64, 'base64'));
  await page.close();
  console.log(`${day.id}: ${output}`);
}

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--autoplay-policy=no-user-gesture-required', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
  try {
    const targets = process.argv.includes('--test') ? manifest.slice(0, 1) : manifest;
    let next = 0;
    async function worker() {
      while (next < targets.length) await render(browser, targets[next++]);
    }
    await Promise.all([worker(), worker(), worker()]);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
