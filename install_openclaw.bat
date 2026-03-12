@echo off
chcp 65001 >nul
echo ╔═══════════════════════════════════════════════════╗
echo ║        🦞 OpenClaw 安装脚本                     ║
echo ╚═══════════════════════════════════════════════════╝
echo.

echo [1/4] 检查 Node.js 版本...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装
    echo    请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js 已安装

echo.
echo [2/4] 安装 OpenClaw...
call npm install -g openclaw@latest
if errorlevel 1 (
    echo ❌ OpenClaw 安装失败
    pause
    exit /b 1
)
echo ✅ OpenClaw 安装完成

echo.
echo [3/4] 初始化 OpenClaw...
echo.
echo    接下来会打开浏览器进行配置
echo    按任意键继续...
pause >nul
call claw onboarding

echo.
echo [4/4] 安装 Find Skills...
echo.
echo    在 OpenClaw 中发送以下命令安装 Find Skills:
echo    帮我安装 Find Skills
echo.
echo    或者使用命令:
echo    claw skills install find-skills
echo.

echo ╔═══════════════════════════════════════════════════╗
echo ║                   ✅ 安装完成！                  ║
echo ╚═══════════════════════════════════════════════════╝
echo.
echo 📖 使用方法:
echo    运行: claw
echo    或: claw tui
echo.
pause
