# UInsight Desktop App

UInsight 화면 점검 관리 시스템 - Desktop Application

## 📱 개요

UInsight는 웹 화면의 점검 프로세스를 관리하는 데스크톱 애플리케이션입니다.

### 주요 기능
- 🖥️ **점검대상 화면관리**: 점검할 화면들을 등록하고 관리
- 📝 **점검 사후기록**: 점검 완료 후 결과 기록
- 📊 **점검현황_회차**: 회차별 점검 현황 및 결함 수 조회
- 🔗 **연관메인화면 선택**: 서브/팝업 화면 점검 시 메인화면 선택

## 🚀 개발 환경에서 실행

### 📋 초기 환경 구성 (필수)

> **참고**: GitHub 용량 제한으로 인해 일부 대용량 파일들이 제외되었습니다. 아래 가이드에 따라 환경을 구성해주세요.

#### 1. 프로젝트 클론
```bash
git clone https://github.com/ndms425/UInsight_PoC.git
cd UInsight_PoC
```

#### 2. Node.js 의존성 설치
```bash
npm install
```
> **제외된 파일**: `node_modules/` 폴더 (패키지 관리 표준)  
> **이유**: 용량이 크고 `package.json`으로 관리되는 파일들  
> **해결**: `npm install` 명령어로 자동 설치

#### 3. Tailwind CSS 실행파일 다운로드 (선택사항)
```bash
# 방법 1: 공식 사이트에서 직접 다운로드
# https://github.com/tailwindlabs/tailwindcss/releases/latest
# tailwindcss-windows-x64.exe 다운로드 후 tailwindcss.exe로 이름 변경

# 방법 2: 또는 CDN 사용 (이미 설정됨)
# HTML 파일들이 이미 Tailwind CSS CDN을 사용하도록 설정되어 있음
```
> **제외된 파일**: `tailwindcss.exe` (126MB)  
> **이유**: GitHub 파일 크기 제한 100MB 초과  
> **해결**: 위 방법 중 하나 선택 (CDN 사용 권장)

### 4. 앱 실행
```bash
# 개발 모드 실행
npm run dev

# 일반 실행
npm start
```

## 📦 배포용 빌드

> **참고**: 빌드 결과물들은 용량이 커서 GitHub에서 제외되었습니다. 로컬에서 빌드해주세요.

### 1. 포터블 실행파일 패키징
```bash
npm run package
```
> **제외된 파일**: `release/` 폴더 (수백 MB)  
> **이유**: 빌드 결과물은 소스코드가 아님  
> **해결**: 위 명령어로 `release/UInsight-win32-x64/UInsight.exe` 생성

### 2. NSIS 설치파일 빌드 (선택사항)
```bash
# NSIS 설치 필요: https://nsis.sourceforge.io/Download
npm run package  # 먼저 패키징 실행
makensis installer.nsi  # NSIS 설치파일 생성
```
> **제외된 파일**: `dist/` 폴더  
> **이유**: electron-builder 빌드 결과물  
> **해결**: NSIS 설치 후 위 명령어 실행

### 3. ZIP 포터블 버전 생성
```bash
# Windows PowerShell에서
npm run package
Compress-Archive -Path "release\UInsight-win32-x64\*" -DestinationPath "UInsight-Portable-1.0.0.zip" -Force
```
> **제외된 파일**: `UInsight-Portable-1.0.0.zip` (279MB)  
> **이유**: 압축된 배포 파일  
> **해결**: 로컬 빌드 후 위 명령어로 압축

### 4. 전체 릴리즈 빌드 (패키징 + 압축)
```bash
npm run package && Compress-Archive -Path "release\UInsight-win32-x64\*" -DestinationPath "UInsight-Portable-1.0.0.zip" -Force
```

## 📁 빌드 결과물

빌드 완료 후 다음 파일들이 생성됩니다:

### Windows 배포파일
- **release/UInsight-win32-x64/** - 실행 가능한 폴더 (UInsight.exe 포함)
- **UInsight-Portable-1.0.0.zip** - 포터블 ZIP 파일
- **UInsight-Setup-1.0.0.exe** - NSIS 설치파일 (NSIS 설치 시)

## 🚨 GitHub에서 제외된 파일들 요약

| 파일/폴더 | 크기 | 제외 이유 | 해결 방법 |
|-----------|------|-----------|-----------|
| `tailwindcss.exe` | 126MB | GitHub 크기 제한 초과 | [공식 다운로드](https://github.com/tailwindlabs/tailwindcss/releases) 또는 CDN 사용 |
| `node_modules/` | 수백MB | 패키지 관리 표준 | `npm install` |
| `release/` | 수백MB | 빌드 결과물 | `npm run package` |
| `UInsight-Portable-1.0.0.zip` | 279MB | 압축 배포 파일 | 로컬 빌드 후 압축 |
| `dist/` | 수백MB | electron-builder 결과물 | NSIS 설치 후 빌드 |

### 💡 빠른 시작 가이드 (요약)
```bash
# 1. 클론 및 의존성 설치
git clone https://github.com/ndms425/UInsight_PoC.git
cd UInsight_PoC
npm install

# 2. 앱 실행
npm start

# 3. 배포용 빌드 (선택사항)
npm run package
```

## 🎯 사용자 배포 가이드

### 설치형 (권장)
1. `UInsight Setup 1.0.0.exe` 다운로드
2. 실행하여 설치 진행
3. 설치 완료 후 바탕화면 또는 시작메뉴에서 실행

### 포터블형
1. `UInsight-Portable-1.0.0.exe` 다운로드
2. 원하는 폴더에 저장
3. 더블클릭으로 바로 실행 (설치 불필요)

## 🖥️ 시스템 요구사항

- **OS**: Windows 10 이상 (64-bit)
- **메모리**: 최소 4GB RAM
- **저장공간**: 최소 500MB
- **네트워크**: 인터넷 연결 (선택사항)

## 🎬 데모 시연 가이드

### 1. 메인 대시보드
- 4개 주요 기능 버튼으로 구성
- 각 버튼 클릭시 해당 기능 화면으로 이동

### 2. 상단 메뉴 활용
- **UInsight 메뉴**: 홈, 새로고침, 개발자도구, 종료
- **메뉴**: 각 기능 화면으로 바로 이동
- **도움말**: 앱 정보 표시

### 3. 키보드 단축키
- `Ctrl+H`: 홈으로 이동
- `Ctrl+R`: 새로고침
- `F12`: 개발자 도구 열기
- `Ctrl+Q`: 앱 종료

## 🔧 기술 스택

- **Electron**: 데스크톱 앱 프레임워크
- **React**: UI 라이브러리
- **Tailwind CSS**: 스타일링
- **electron-builder**: 빌드 및 배포

## 📞 지원

문의사항이나 버그 리포트는 UInsight Team으로 연락주세요.

---

**UInsight Team** | v1.0.0 | MIT License 

## 프로젝트 구조

```
UInsight/
├── src/                          # 소스 코드
│   ├── pages/                   # HTML 페이지들
│   │   ├── index.html          # 메인 화면
│   │   ├── 점검대상화면관리.html
│   │   ├── 점검사후기록.html
│   │   ├── 점검현황_회차.html
│   │   ├── 연관메인화면선택.html
│   │   ├── UI표준점검결과.html
│   │   ├── 부서관리_표준점검.html
│   │   └── UI표준점검결과_tabStops.html
│   ├── components/              # React/TSX 컴포넌트
│   │   └── 점검-수행-버튼-추가.tsx
│   ├── styles/                  # CSS 파일들
│   │   ├── input.css
│   │   └── output.css
│   └── scripts/                 # JavaScript 파일들
│       └── index.js
├── build/                       # 빌드 관련 파일들
│   ├── create-portable.ps1
│   ├── electron-builder.yml
│   ├── installer.nsi
│   └── safelist.txt
├── docs/                        # 문서 파일들
│   ├── README.md
│   ├── LICENSE
│   └── git-commands.md
├── node_modules/                # Node.js 의존성
├── main.js                      # Electron 메인 프로세스
├── package.json                 # 프로젝트 설정
├── package-lock.json            # 의존성 잠금 파일
├── tailwind.config.js           # Tailwind CSS 설정
├── postcss.config.js            # PostCSS 설정
└── .gitignore                   # Git 무시 파일 목록
``` 