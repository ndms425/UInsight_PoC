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

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 모드 실행
```bash
npm run dev
```

### 3. 일반 실행
```bash
npm start
```

## 📦 배포용 빌드

### 1. 포터블 실행파일 패키징
```bash
npm run package
```

### 2. ZIP 포터블 버전 생성
```bash
Compress-Archive -Path "release\UInsight-win32-x64\*" -DestinationPath "UInsight-Portable-1.0.0.zip" -Force
```

### 3. 전체 릴리즈 빌드 (패키징 + 압축)
```bash
npm run package && Compress-Archive -Path "release\UInsight-win32-x64\*" -DestinationPath "UInsight-Portable-1.0.0.zip" -Force
```

## 📁 빌드 결과물

빌드 완료 후 다음 파일들이 생성됩니다:

### Windows 배포파일
- **release/UInsight-win32-x64/** - 실행 가능한 폴더 (UInsight.exe 포함)
- **UInsight-Portable-1.0.0.zip** - 포터블 ZIP 파일
- **installer.nsi** - NSIS 설치파일 스크립트 (NSIS 설치 필요)

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