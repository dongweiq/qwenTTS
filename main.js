const { app, BrowserWindow, ipcMain, dialog, globalShortcut } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
// 移除dashscope依赖，使用axios直接调用API

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  // 注册全局快捷键：Ctrl+Shift+I（Windows/Linux）或Cmd+Option+I（macOS）打开开发者工具
  const shortcut = process.platform === 'darwin' ? 'Command+Option+I' : 'Control+Shift+I';
  globalShortcut.register(shortcut, () => {
    if (mainWindow) {
      mainWindow.webContents.openDevTools();
    }
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// 注销全局快捷键
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.handle('generate-tts', async (event, { apiKey, text, voice }) => {
  try {
    console.log('后端收到的voice参数:', voice); // 添加日志，便于调试
    
    const response = await axios.post('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
      model: 'qwen-tts-latest',
      input: { text: text, voice: voice }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    // 适配新的返回结构
    const data = response.data;
    if (!data || !data.output || !data.output.audio || !data.output.audio.url) {
      throw new Error('TTS接口返回数据格式异常，未找到音频URL');
    }
    const audioUrl = data.output.audio.url;
    const audioResponse = await axios.get(audioUrl, { responseType: 'stream' });
    const tempPath = path.join(app.getPath('temp'), 'qwen-tts-audio.wav');
    const writer = fs.createWriteStream(tempPath);
    audioResponse.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(tempPath));
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('TTS generation error:', error);
    throw error;
  }
});

ipcMain.handle('save-audio', async (event, { tempPath, fileName }) => {
  const { filePath } = await dialog.showSaveDialog({
    defaultPath: fileName,
    filters: [{ name: 'Audio Files', extensions: ['wav'] }]
  });

  if (filePath) {
    fs.copyFileSync(tempPath, filePath);
    return filePath;
  }
  return null;
});