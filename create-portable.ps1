# UInsight Portable 단일 실행파일 생성 스크립트

Write-Host "UInsight Portable 단일 실행파일 생성 중..." -ForegroundColor Green

# 경량화된 빌드 실행
Write-Host "1. 경량화된 빌드 생성 중..." -ForegroundColor Yellow
npm run build-lightweight

# 압축 파일 생성
Write-Host "2. 압축 파일 생성 중..." -ForegroundColor Yellow
$sourcePath = "dist\UInsight-Lightweight-win32-x64"
$zipPath = "dist\UInsight-Portable-Single.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path "$sourcePath\*" -DestinationPath $zipPath -CompressionLevel Optimal

# 자동 압축 해제 배치 파일 생성
Write-Host "3. 자동 압축 해제 스크립트 생성 중..." -ForegroundColor Yellow
$batchContent = @"
@echo off
echo UInsight 실행 중...
set TEMP_DIR=%TEMP%\UInsight_%RANDOM%
mkdir "%TEMP_DIR%"
powershell -Command "Expand-Archive -Path '%~dp0UInsight-Portable-Single.zip' -DestinationPath '%TEMP_DIR%' -Force"
start "" "%TEMP_DIR%\UInsight-Lightweight.exe"
timeout /t 2 /nobreak >nul
rmdir /s /q "%TEMP_DIR%"
"@

$batchContent | Out-File -FilePath "dist\UInsight-Portable-Single.bat" -Encoding ASCII

Write-Host "4. 완료!" -ForegroundColor Green
Write-Host "생성된 파일:" -ForegroundColor Cyan
Write-Host "- dist\UInsight-Portable-Single.zip (압축된 앱)" -ForegroundColor White
Write-Host "- dist\UInsight-Portable-Single.bat (단일 실행 파일)" -ForegroundColor White
Write-Host ""
Write-Host "사용법: UInsight-Portable-Single.bat 파일을 실행하세요." -ForegroundColor Yellow 