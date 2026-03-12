@echo off
chcp 65001 >nul
echo ╔═══════════════════════════════════════════════════╗
echo ║           🚀 推送 ADailyReport 到 GitHub          ║
echo ╚═══════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/6] 配置 Git 用户信息...
git config --global user.email "g1246019@gmail.com"
git config --global user.name "g1246019"

echo [2/6] 初始化仓库...
git init
git branch -M main

echo [3/6] 添加文件...
git add -A

echo [4/6] 提交代码...
git commit -m "Initial commit - ADailyReport 每日AI资讯自动生成系统"

echo [5/6] 设置远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/g1246019-sys/ADailyReport.git

echo [6/6] 推送到 GitHub...
git push -u origin main

echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║                   ✅ 推送完成！                  ║
echo ╚═══════════════════════════════════════════════════╝
echo.
echo 📋 下一步配置:
echo    1. 访问: https://github.com/g1246019-sys/ADailyReport/settings/secrets/actions
echo    2. 添加 Secrets: OPENAI_API_KEY = sk-faofthghctumhoyskxrodvmkmrrhpluyvktgsqglcruagfiu
echo    3. Settings ^> Pages: Branch 选择 gh-pages
echo.
echo 🌐 网站地址: https://clawhub.ai/
echo.

pause
