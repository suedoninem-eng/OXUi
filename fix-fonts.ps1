$f = 'D:\OXUI SUED ONINEM\ECOSISTEMA OXUI\src\styles\acquisitionhub.css'
$c = Get-Content $f -Raw -Encoding UTF8
$c = $c.Replace("'Syncopate',sans-serif", "var(--ah-font-heading)")
$c = $c.Replace("'Syncopate', sans-serif", "var(--ah-font-heading)")
$c = $c.Replace("font-family:'Syncopate'", "font-family:var(--ah-font-heading)")
$c = $c.Replace("font-family:'Outfit'", "font-family:var(--ah-font-body)")
$c = $c.Replace("'Outfit',sans-serif", "var(--ah-font-body)")
$c = $c.Replace("'Outfit', sans-serif", "var(--ah-font-body)")
$c | Set-Content $f -Encoding UTF8
Write-Host "Done: replacements applied."
