const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// 개발 모드 확인
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  // 메인 창 생성
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false, // 로컬 파일 로드를 위해 필요
    },
    // icon: path.join(__dirname, 'assets', 'icon.png'), // 아이콘 설정 (선택사항)
    titleBarStyle: 'default',
    show: false, // 로딩 완료 후 표시
  });

  // index.html 파일 로드
  mainWindow.loadFile('index.html');

  // 창이 준비되면 표시
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // 개발 모드에서는 DevTools 열기
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // 창이 닫힐 때
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 새 창 열기 처리 (팝업 허용)
  mainWindow.webContents.setWindowOpenHandler(({ url, frameName, features }) => {
    console.log('Opening new window:', url);
    
    // 연관메인화면선택.html 같은 팝업은 새 창에서 열기
    if (url.includes('연관메인화면선택.html') || frameName === 'selectMainScreen') {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 1200,
          height: 800,
          parent: mainWindow,
          modal: false,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false,
          }
        }
      };
    }
    
    // 외부 링크는 기본 브라우저에서 열기
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    
    // 기타 내부 파일들은 허용
    return { action: 'allow' };
  });
}

// 앱 메뉴 설정
function createMenu() {
  const template = [
    {
      label: 'UInsight',
      submenu: [
        {
          label: '홈으로',
          accelerator: 'CmdOrCtrl+H',
          click: () => {
            if (mainWindow) {
              mainWindow.loadFile('index.html');
            }
          }
        },
        { type: 'separator' },
        {
          label: '새로고침',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (mainWindow) {
              mainWindow.reload();
            }
          }
        },
        {
          label: '개발자 도구',
          accelerator: 'F12',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.toggleDevTools();
            }
          }
        },
        { type: 'separator' },
        {
          label: '종료',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: '메뉴',
      submenu: [
        {
          label: '점검대상 화면관리',
          click: () => {
            if (mainWindow) {
              mainWindow.loadFile('점검대상화면관리.html');
            }
          }
        },
        {
          label: '점검 사후기록',
          click: () => {
            if (mainWindow) {
              mainWindow.loadFile('점검사후기록.html');
            }
          }
        },
        {
          label: '점검현황_회차',
          click: () => {
            if (mainWindow) {
              mainWindow.loadFile('점검현황_회차.html');
            }
          }
        },
        {
          label: '연관메인화면 선택',
          click: () => {
            if (mainWindow) {
              mainWindow.loadFile('연관메인화면선택.html');
            }
          }
        }
      ]
    },
    {
      label: '도움말',
      submenu: [
        {
          label: 'UInsight 정보',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'UInsight 정보',
              message: 'UInsight v1.0.0',
              detail: '화면 점검 관리 시스템\n\n개발: UInsight Team\n목적: 화면 점검 프로세스 자동화'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// 앱이 준비되면 창 생성
app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    // macOS에서 독 아이콘 클릭 시 창 다시 생성
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 창이 닫히면 앱 종료 (macOS 제외)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 보안: 웹 보안 설정 (로컬 파일용)
app.on('web-contents-created', (event, contents) => {
  // 새 창 열기 허용 (팝업 등)
  contents.on('new-window', (event, navigationUrl) => {
    // 내부 HTML 파일들은 허용
    if (navigationUrl.endsWith('.html')) {
      return; // 기본 동작 허용
    }
  });
});

// 개발 모드 설정
if (isDev) {
  console.log('🚀 UInsight Desktop App - Development Mode');
} 