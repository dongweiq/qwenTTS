const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  generateTTS: (data) => ipcRenderer.invoke('generate-tts', data),
  saveAudio: (data) => ipcRenderer.invoke('save-audio', data)
});