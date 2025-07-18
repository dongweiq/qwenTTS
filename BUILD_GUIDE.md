# macOS 下打包 Windows x86 程序指南

## 快速开始

### 方法一：使用脚本（推荐）
```bash
./build-win.sh
```

### 方法二：手动执行
```bash
# 安装依赖
npm install

# 打包 Windows x64 版本
npm run package:win-x64

# 打包 Windows x86 版本  
npm run package:win-ia32

# 或者同时打包两个架构
npm run package:win
```

## 输出文件

打包完成后，在 `dist/` 目录下会生成：

- `Qwen-TTS Setup 1.0.0.exe` - NSIS 安装程序
- `Qwen-TTS 1.0.0.exe` - 便携版程序
- 对应的 x64 和 ia32 版本

## 注意事项

1. **图标文件**: 需要在 `build/` 目录下放置 `icon.ico` 文件
2. **交叉编译**: electron-builder 支持在 macOS 下直接打包 Windows 程序
3. **依赖**: 确保已安装 Node.js 和 npm
4. **网络**: 首次打包时会下载 Electron 二进制文件，需要良好的网络连接

## 自定义配置

可以在 `package.json` 的 `build.win` 部分修改：

- `target`: 打包格式（nsis, portable, zip 等）
- `arch`: 目标架构（x64, ia32, arm64）
- `icon`: 应用图标路径

## 故障排除

如果遇到问题：

1. 清理缓存：`rm -rf node_modules dist && npm install`
2. 检查网络连接
3. 确保有足够的磁盘空间
4. 查看详细日志：`DEBUG=electron-builder npm run package:win`