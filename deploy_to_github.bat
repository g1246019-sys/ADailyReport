@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: ==================== 请修改以下配置 ====================
set "GITHUB_USERNAME=g1246019" 
set "REPO_NAME=ADailyReport"
:: ==================== 配置结束 ====================

echo ╔═══════════════════════════════════════════════════╗
echo ║        🚀 ADailyReport 一键部署脚本              ║
echo ╚═══════════════════════════════════════════════════╝

cd /d "%~dp0"

if not exist ".env" (
    echo ❌ 错误: .env 文件不存在
    pause
    exit /b 1
)

echo ✅ 环境检查通过

if not exist ".git" (
    echo 📦 初始化 Git 仓库...
    git init
    git branch -M main
)

echo 📝 添加文件...
git add .

echo 💾 提交代码...
git commit -m "🤖 Init ADailyReport - 每日AI资讯自动生成系统"

echo 🔗 连接远程仓库...
git remote remove origin 2>nul
git remote add origin "https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git"

echo 🚀 推送到 GitHub...
git push -u origin main

echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║                   ✅ 部署完成！                   ║
echo ╚═══════════════════════════════════════════════════╝
echo.
echo 📋 下一步操作:
echo    1. 访问 https://github.com/%GITHUB_USERNAME%/%REPO_NAME%/settings/secrets/actions
echo    2. 添加 Secrets:
echo       - Name: OPENAI_API_KEY
echo       - Value: sk-faofthghctumhoyskxrodvmkmrrhpluyvktgsqglcruagfiu
echo    3. 进入 Settings ^> Pages
echo    4. Source 选择 'Deploy from a branch'
echo    5. Branch 选择 'gh-pages'，目录 '/(root)'
echo.
echo 🌐 日报网站地址: https://clawhub.ai/
echo ⏰ 每天北京时间8点会自动生成日报
echo.

pause
