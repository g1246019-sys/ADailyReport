# 🦞 OpenClaw Find Skills 安装指南

## 方法一：使用 ClawHub 命令行安装

由于网络限制，请尝试以下命令：

```bash
# 搜索 Find Skills
npx clawhub search find-skills

# 安装 Find Skills
npx clawhub install find-skills
```

## 方法二：通过 OpenClaw 聊天界面安装

1. 运行 OpenClaw：
```bash
openclaw tui
```

2. 发送消息给 OpenClaw：
```
帮我安装 Find Skills
```

或者发送：
```
帮我安装 https://clawhub.ai/JimLiuxinghai/find-skills
```

## 方法三：手动安装

1. 下载 Find Skills 压缩包
2. 解压到 Skills 目录：
   - 打开 OpenClaw 设置，点击"打开工作空间"
   - 找到 `skills` 文件夹
   - 将解压后的 `find-skills` 文件夹放入

## 安装验证

安装完成后，运行：
```bash
openclaw skills list
```

应该能看到 `find-skills` 在列表中。

## Find Skills 使用方法

安装完成后，可以这样使用：

```
帮我搜索关于 JavaScript 异步编程的 Skills
```

或：
```
使用 Find Skills 搜索 AI 相关的代码生成工具
```

---

## 常见问题

### 1. 安装失败怎么办？
- 检查网络连接
- 确保 OpenClaw 已正确配置模型
- 尝试方法二或方法三

### 2. 找不到 Skills 目录？
运行以下命令查看：
```bash
openclaw
# 在聊天界面问 "我的 Skill 安装目录在哪里？"
```
