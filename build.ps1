# MathPortal Build Script for Netlify Drag & Drop

Write-Host "`n=== MATHPORTAL NETLIFY BUILD ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Groq API Key alin: https://console.groq.com/ (UCRETSIZ!)" -ForegroundColor Yellow
Write-Host "2. API Key'inizi girin:" -ForegroundColor Yellow
Write-Host ""

$plainKey = Read-Host "API Key"

if ($plainKey) {
    $env:API_KEY = $plainKey
    Write-Host "`n[OK] API Key ayarlandi" -ForegroundColor Green
    Write-Host "`n[BUILD] Build basliyor...`n" -ForegroundColor Cyan
    
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n`n============================================" -ForegroundColor Green
        Write-Host "[OK] BUILD BASARILI!" -ForegroundColor Green
        Write-Host "============================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Simdi yapmaniz gerekenler:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. 'dist' klasorunu acin" -ForegroundColor White
        Write-Host "2. https://app.netlify.com/drop adresine gidin" -ForegroundColor White
        Write-Host "3. 'dist' klasorunu surukle-birak yapin" -ForegroundColor White
        Write-Host "4. Birkac saniye bekleyin - Link hazir!" -ForegroundColor White
        Write-Host ""
        Write-Host "UYARI: 'dist' klasorunu surukleyin, tum projeyi degil!" -ForegroundColor Yellow
        Write-Host ""
        
        # dist klasorunu ac
        $distPath = Join-Path $PSScriptRoot "dist"
        if (Test-Path $distPath) {
            Write-Host "dist klasoru aciliyor..." -ForegroundColor Cyan
            Start-Sleep -Seconds 1
            explorer.exe $distPath
        }
    } else {
        Write-Host "`n[HATA] Build basarisiz!" -ForegroundColor Red
        Write-Host "Hatayi yukarida kontrol edin." -ForegroundColor Yellow
    }
} else {
    Write-Host "`n[HATA] API Key bos olamaz!" -ForegroundColor Red
}

Write-Host ""



