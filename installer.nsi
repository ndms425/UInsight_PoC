; UInsight Desktop App 설치 스크립트
; NSIS Modern User Interface를 사용

!include "MUI2.nsh"

; 설치 파일 정보
Name "UInsight Desktop App"
OutFile "UInsight-Setup-1.0.0.exe"
InstallDir "$PROGRAMFILES64\UInsight"
InstallDirRegKey HKCU "Software\UInsight" ""
RequestExecutionLevel admin

; 인터페이스 설정
!define MUI_ABORTWARNING
!define MUI_ICON "${NSISDIR}\Contrib\Graphics\Icons\modern-install.ico"
!define MUI_UNICON "${NSISDIR}\Contrib\Graphics\Icons\modern-uninstall.ico"

; 설치 페이지
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "LICENSE"
!insertmacro MUI_PAGE_COMPONENTS
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

; 제거 페이지
!insertmacro MUI_UNPAGE_WELCOME
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_UNPAGE_FINISH

; 언어
!insertmacro MUI_LANGUAGE "Korean"
!insertmacro MUI_LANGUAGE "English"

; 설치 섹션
Section "UInsight Desktop App" SecMain
  SectionIn RO
  
  ; 설치 디렉터리 설정
  SetOutPath "$INSTDIR"
  
  ; 파일 복사
  File /r "release\UInsight-win32-x64\*.*"
  
  ; 레지스트리 키 작성
  WriteRegStr HKCU "Software\UInsight" "" $INSTDIR
  
  ; 제거 프로그램 정보 작성
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\UInsight" "DisplayName" "UInsight Desktop App"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\UInsight" "UninstallString" "$INSTDIR\uninstall.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\UInsight" "InstallLocation" "$INSTDIR"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\UInsight" "DisplayIcon" "$INSTDIR\UInsight.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\UInsight" "Publisher" "UInsight Team"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\UInsight" "DisplayVersion" "1.0.0"
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\UInsight" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\UInsight" "NoRepair" 1
  
  ; 제거 프로그램 생성
  WriteUninstaller "$INSTDIR\uninstall.exe"
  
SectionEnd

; 바탕화면 바로가기 섹션
Section "바탕화면 바로가기" SecDesktop
  CreateShortCut "$DESKTOP\UInsight.lnk" "$INSTDIR\UInsight.exe"
SectionEnd

; 시작메뉴 바로가기 섹션
Section "시작메뉴 바로가기" SecStartMenu
  CreateDirectory "$SMPROGRAMS\UInsight"
  CreateShortCut "$SMPROGRAMS\UInsight\UInsight.lnk" "$INSTDIR\UInsight.exe"
  CreateShortCut "$SMPROGRAMS\UInsight\Uninstall.lnk" "$INSTDIR\uninstall.exe"
SectionEnd

; 섹션 설명
LangString DESC_SecMain ${LANG_KOREAN} "UInsight Desktop App 메인 프로그램"
LangString DESC_SecMain ${LANG_ENGLISH} "UInsight Desktop App main program"
LangString DESC_SecDesktop ${LANG_KOREAN} "바탕화면에 바로가기를 생성합니다"
LangString DESC_SecDesktop ${LANG_ENGLISH} "Create desktop shortcut"
LangString DESC_SecStartMenu ${LANG_KOREAN} "시작메뉴에 바로가기를 생성합니다"
LangString DESC_SecStartMenu ${LANG_ENGLISH} "Create start menu shortcuts"

!insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  !insertmacro MUI_DESCRIPTION_TEXT ${SecMain} $(DESC_SecMain)
  !insertmacro MUI_DESCRIPTION_TEXT ${SecDesktop} $(DESC_SecDesktop)
  !insertmacro MUI_DESCRIPTION_TEXT ${SecStartMenu} $(DESC_SecStartMenu)
!insertmacro MUI_FUNCTION_DESCRIPTION_END

; 제거 섹션
Section "Uninstall"
  
  ; 파일 삭제
  RMDir /r "$INSTDIR"
  
  ; 바로가기 삭제
  Delete "$DESKTOP\UInsight.lnk"
  RMDir /r "$SMPROGRAMS\UInsight"
  
  ; 레지스트리 키 삭제
  DeleteRegKey /ifempty HKCU "Software\UInsight"
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\UInsight"
  
SectionEnd 