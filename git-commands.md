# GitHub Repository 업로드 명령어

## Repository 생성 후 실행할 명령어

1. **GitHub에서 UInsight_PoC repository 생성 완료 후:**

```bash
# 코드 푸시
git push -u origin main
```

## 현재 준비 완료된 상태

✅ Git repository 초기화 완료  
✅ 모든 파일 커밋 완료  
✅ 원격 저장소 URL 설정 완료  
✅ .gitignore 설정 완료  

## Repository 정보

- **Repository Name**: `UInsight_PoC`
- **GitHub URL**: https://github.com/ndms425/UInsight_PoC
- **Description**: UInsight Desktop App - 화면 점검 관리 시스템 PoC

## 포함된 파일들

- `main.js` - Electron 메인 프로세스
- `package.json` - 프로젝트 설정 및 의존성
- `README.md` - 프로젝트 문서
- `index.html` - 메인 대시보드
- `점검대상화면관리.html` - 화면 관리 페이지
- `점검사후기록.html` - 점검 기록 페이지
- `점검현황_회차.html` - 회차별 현황 페이지
- `연관메인화면선택.html` - 메인화면 선택 팝업
- `installer.nsi` - NSIS 설치파일 스크립트
- `LICENSE` - MIT 라이센스
- `.gitignore` - Git 제외 파일 설정

## 빌드 명령어

```bash
# 개발 모드 실행
npm start

# 포터블 실행파일 생성
npm run package

# ZIP 파일 생성
Compress-Archive -Path "release\UInsight-win32-x64\*" -DestinationPath "UInsight-Portable-1.0.0.zip" -Force
```

## 생성된 파일들

1. **`UInsight-Portable-1.0.0.exe`** (83MB) - 단일 실행파일 (포터블 버전)
   - 설치가 필요 없는 독립 실행파일
   - 바로 더블클릭으로 실행 가능
   - 추천하는 방식입니다!

2. **`UInsight Setup 1.0.0.exe`** (83MB) - 설치파일
   - 일반적인 Windows 설치 프로그램
   - 설치 후 시작 메뉴에 바로가기 생성
   - 제어판에서 제거 가능

## 사용 방법

**포터블 버전 (권장):**
```
dist/UInsight-Portable-1.0.0.exe
```
- 이 파일을 원하는 위치에 복사하고 바로 실행하세요
- 설치 과정 없이 즉시 사용 가능합니다

**설치 버전:**
```
dist/UInsight Setup 1.0.0.exe
```
- 실행하면 설치 마법사가 나타납니다
- 설치 후 바탕화면과 시작 메뉴에 바로가기가 생성됩니다

두 버전 모두 완전히 동일한 기능을 제공하며, React 기반의 점검 화면과 모든 HTML 파일들이 포함되어 있습니다. 포터블 버전을 사용하시면 설치 없이 바로 사용하실 수 있어 더 편리합니다. 