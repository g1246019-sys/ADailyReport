#!/bin/bash

# ADailyReport 一键部署脚本

# ==================== 请修改以下配置 ====================
GITHUB_USERNAME="your-username"  # 你的GitHub用户名
REPO_NAME="ADailyReport"          # 仓库名称
# ==================== 配置结束 ====================

echo "╔═══════════════════════════════════════════════════╗"
echo "║        🚀 ADailyReport 一键部署脚本              ║"
echo "╚═══════════════════════════════════════════════════╝"

# 进入项目目录
cd "$(dirname "$0")"

# 检查 .env 文件是否存在
if [ ! -f ".env" ]; then
    echo "❌ 错误: .env 文件不存在"
    echo "   请先创建 .env 文件并配置 OPENAI_API_KEY"
    exit 1
fi

echo "✅ 环境检查通过"

# 初始化 git（如果尚未初始化）
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git branch -M main
fi

# 添加所有文件
echo "📝 添加文件..."
git add .

# 提交代码
echo "💾 提交代码..."
git commit -m "🤖 Init ADailyReport - 每日AI资讯自动生成系统"

# 设置远程仓库
echo "🔗 连接远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# 推送到 GitHub
echo "🚀 推送到 GitHub..."
git push -u origin main

echo ""
echo "╔═══════════════════════════════════════════════════╗"
echo "║                   ✅ 部署完成！                   ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""
echo "📋 下一步操作:"
echo "   1. 访问 https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/secrets/actions"
echo "   2. 添加 Secrets:"
echo "      - Name: OPENAI_API_KEY"
echo "      - Value: 你的硅基流动 API Key"
echo "   3. 进入 Settings → Pages"
echo "   4. Source 选择 'Deploy from a branch'"
echo "   5. Branch 选择 'gh-pages'，目录 '/(root)'"
echo ""
echo "🌐 日报网站地址: https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
echo "⏰ 每天北京时间8点会自动生成日报"
echo ""
