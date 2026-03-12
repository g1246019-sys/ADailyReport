@echo off
chcp 65001 >nul

echo ╔═══════════════════════════════════════════════════╗
echo ║        🚀 推送到 GitHub                        ║
echo ╚═══════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 📦 初始化 Git...
git init 2>nul
git branch -M main

echo 📝 添加文件...
git add -A

echo 💾 提交代码...
git commit -m "Initial commit" 2>nul || echo "已提交"

echo 🔗 连接远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/g1246019-sys/ADailyReport.git

echo 🚀 推送到 GitHub...
git push -u origin main

echo.
echo ✅ 完成！
echo.
pause
