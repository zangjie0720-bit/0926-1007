$source = 'C:\Users\75772\.codex\generated_images\01a0d8d8-3b97-79f3-92fb-5bde9871450e'
$destination = Join-Path $PSScriptRoot '图片'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
$files = @(
  @('01-首帧.png','exec-53952fc3-de54-4f6a-bc86-587331681bb7.png'),
  @('01-中帧.png','exec-cf021c85-b7a1-4123-ad0a-6bb1a5424cc9.png'),
  @('01-尾帧.png','exec-4e7f274b-6822-49f4-95de-8e033526ade1.png'),
  @('02-首帧.png','exec-5b30222d-3d01-4c33-9e0b-52511dd72ed6.png'),
  @('02-中帧.png','exec-33681026-b2e3-417f-9101-18c08b1c8993.png'),
  @('02-尾帧.png','exec-bf10ef6a-4d69-4aea-b543-a82caa9ffe64.png'),
  @('03-首帧.png','exec-ae6101b6-38f8-4a40-bc15-434925c1760b.png'),
  @('03-中帧.png','exec-fc4e20fa-94e3-4f41-b304-f219203212b8.png'),
  @('03-尾帧.png','exec-e9a788a9-a823-4f7b-8b34-362128b48671.png'),
  @('04-首帧.png','exec-657f7d74-4d9b-4f22-a342-65480d26d547.png'),
  @('04-中帧.png','exec-17c0355c-c5e9-4698-82cc-2cfcba562d6d.png'),
  @('04-尾帧.png','exec-5da07e7d-b2ee-4650-9ff0-84eb89d1c542.png'),
  @('05-首帧.png','exec-f4cc8de3-b770-40a5-a9a4-a8401e243812.png'),
  @('05-中帧.png','exec-0780d712-7e93-4470-8b1b-234693e618db.png'),
  @('05-尾帧.png','exec-dd00b95e-8faf-4797-ad93-7db4a101dbc5.png'),
  @('06-首帧.png','exec-acc80e34-fd13-42dd-9d05-1640a1ea6793.png'),
  @('06-中帧.png','exec-7ef407a7-44c6-460e-9bc4-22898eb579ba.png'),
  @('06-尾帧.png','exec-eb02e0f2-5924-495e-a315-e1deba543157.png'),
  @('07-首帧.png','exec-799a1503-0983-43c7-9c0e-9083955c585c.png'),
  @('07-中帧.png','exec-720d1cc7-044f-4028-bdc9-00d79489ce29.png'),
  @('07-尾帧.png','exec-4cda1649-3a88-49ac-8481-550fccbf9da4.png'),
  @('08-首帧.png','exec-8cc9422f-9ad4-4170-aac0-a0526532ef37.png'),
  @('08-中帧.png','exec-f0dda0ad-41da-403d-ae31-091c80ff649e.png'),
  @('08-尾帧.png','exec-7254f32e-bdcc-4c1d-859b-8ae77ccee5db.png'),
  @('09-首帧.png','exec-042672a8-daa6-47d7-abff-a01c5279f5f0.png'),
  @('09-中帧.png','exec-597f80a0-5963-4391-89ce-5b1d3c58594b.png'),
  @('09-尾帧.png','exec-c42dcdda-11d0-49a1-9e49-58095a6b27ac.png'),
  @('10-首帧.png','exec-3f4c7bbf-4a1e-4b81-97df-9886329115d9.png'),
  @('10-中帧.png','exec-48805b6a-3297-40a4-981e-191282657f5e.png'),
  @('10-尾帧.png','exec-7f39fad5-4fa2-492e-8e30-a7d408839206.png'),
  @('11-首帧.png','exec-b7075b40-6e2a-44e9-876c-cffc223beab2.png'),
  @('11-中帧.png','exec-f1741dfa-df56-4864-a5b7-5588600f014a.png'),
  @('11-尾帧.png','exec-7b03aaee-3043-477e-801e-434093733ef9.png'),
  @('12-首帧.png','exec-818d7127-1cf9-4774-a6eb-d5c145884c9e.png'),
  @('12-中帧.png','exec-3088ccbd-3678-4d6b-bafd-7f8eda244634.png'),
  @('12-尾帧.png','exec-d93bee8f-412c-4138-9679-2ac907a71073.png')
)
foreach ($pair in $files) {
  Copy-Item -LiteralPath (Join-Path $source $pair[1]) -Destination (Join-Path $destination $pair[0]) -Force
}
Write-Output "Copied $($files.Count) keyframes."
