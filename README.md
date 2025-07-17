# Qwen-TTS 语音合成桌面工具

## 项目简介

Qwen-TTS 是一个基于 Electron 的跨平台桌面应用，集成了阿里云 Qwen-TTS 语音合成 API，支持多种音色选择，帮助用户将文本快速转换为高质量语音，并可一键保存音频文件。

## 主要功能

- 支持输入任意文本并合成为语音
- 多种音色选择（普通话、方言、男女声等）
- 一键保存生成的音频（WAV 格式）
- 本地存储 API Key，方便下次使用
- 跨平台支持（Windows、macOS、Linux）

## 安装与运行

1. **克隆项目**
   ```bash
   git clone <本项目地址>
   cd qwenTTS
   ```
2. **安装依赖**
   ```bash
   npm install
   ```
3. **启动应用**
   ```bash
   npm start
   ```

## 打包发布

支持一键打包为各平台安装包：

- Windows：`npm run package:win`
- macOS：`npm run package:mac`
- Linux：`npm run package:linux`

打包产物在 `dist/` 目录下。

## 依赖说明

- [electron](https://www.electronjs.org/) ^37.2.2
- [electron-builder](https://www.electron.build/) ^26.0.12
- [axios](https://github.com/axios/axios) ^1.10.0
- [dotenv](https://github.com/motdotla/dotenv) ^17.2.0

## API Key 获取

本工具需使用阿里云 Qwen-TTS 服务，请前往 [阿里云DashScope控制台](https://dashscope.aliyun.com/) 获取 API Key。

## 使用说明

1. 启动应用后，输入阿里云 API Key。
2. 输入需要合成的文本。
3. 选择音色。
4. 点击“生成语音”按钮，稍等片刻即可试听。
5. 如需保存音频，点击“保存音频”按钮。

## 常见问题

- **API Key 无效或额度不足**：请确认 API Key 正确且有调用额度。
- **生成失败/无声音频**：请检查网络连接，或查看开发者工具（Cmd+Option+I 或 Ctrl+Shift+I）获取详细报错。
- **音频保存失败**：请确认有写入权限，或更换保存路径。

## 许可证

ISC

---

如有问题欢迎提 issue 或 PR 贡献！
