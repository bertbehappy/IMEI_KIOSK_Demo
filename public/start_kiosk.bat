@echo off
chcp 65001 >nul
title 數位好鄰居 KIOSK 啟動程式

echo ===================================================
echo   數位好鄰居 X 高齡數位互動體驗 KIOSK 啟動中...
echo ===================================================

:: 設定網頁檔案路徑 (預設為當前桌面上的 kiosk.html)
set "TARGET_FILE=C:\Users\bert_chang\Desktop\kiosk.html"

:: 若桌面路徑不存在，自動檢查目前 bat 檔同目錄下的 kiosk.html
if not exist "%TARGET_FILE%" (
    if exist "%~dp0kiosk.html" (
        set "TARGET_FILE=%~dp0kiosk.html"
    ) else if exist "%USERPROFILE%\Desktop\kiosk.html" (
        set "TARGET_FILE=%USERPROFILE%\Desktop\kiosk.html"
    )
)

echo 目標檔案: %TARGET_FILE%

:: 尋找 Google Chrome 安裝路徑
set "CHROME_EXE="

if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "CHROME_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set "CHROME_EXE=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set "CHROME_EXE=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
) else (
    :: 若未找到標準安裝路徑，嘗試使用系統 PATH 中的 chrome
    set "CHROME_EXE=chrome.exe"
)

echo 瀏覽器路徑: %CHROME_EXE%
echo 正在以全螢幕導覽機 + 靜默出單模式啟動...

:: 啟動 Chrome (加上獨立設定檔隔離，確保即使有其他 Chrome 視窗也能強制進入 Kiosk)
start "" "%CHROME_EXE%" ^
  --kiosk ^
  --kiosk-printing ^
  --disable-pinch ^
  --overscroll-history-navigation=0 ^
  --no-first-run ^
  --user-data-dir="%TEMP%\kiosk_chrome_profile" ^
  "%TARGET_FILE%"

exit
