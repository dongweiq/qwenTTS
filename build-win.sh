#!/bin/bash

echo "🚀 开始在 macOS 下打包 Windows x86 程序..."

# 检查是否安装了必要的依赖
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 Node.js"
    exit 1
fi

# 安装依赖（如果需要）
if [ ! -d "node_modules" ]; then
    echo "📦 安装项目依赖..."
    npm install
fi

# 清理之前的构建
echo "🧹 清理之前的构建文件..."
rm -rf dist/

# 打包 Windows x64 版本
echo "📦 打包 Windows x64 版本..."
npm run package:win-x64

# 打包 Windows x86 (ia32) 版本  
echo "📦 打包 Windows x86 版本..."
npm run package:win-ia32

echo "✅ 打包完成！"
echo "📁 输出目录: ./dist/"
ls -la dist/