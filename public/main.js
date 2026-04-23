import { app, BrowserWindow } from 'electron'
import path from 'path';
import { fileURLToPath } from 'url';

const createWindowsMain = () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    let windowsMain = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            sandbox: false,
            spellcheck: false
        }
    });

    if (app.isPackaged) {
        windowsMain.loadFile(path.join(__dirname, '../dist/index.html'));
    } else {
        // En desarrollo, conéctate al servidor de Vite
        windowsMain.loadURL('http://localhost:5173');
    }
}

app.whenReady().then(createWindowsMain);