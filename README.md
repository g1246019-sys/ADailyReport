# 🤖 ADailyReport

自动化每日AI资讯日报生成与发布系统

![GitHub Stars](https://img.shields.io/github/stars/yourusername/ADailyReport)
![GitHub License](https://img.shields.io/github/license/yourusername/ADailyReport)
![Node.js](https://img.shields.io/node/v/a-daily-report)

## 📖 项目介绍

ADailyReport 是一个自动化生成每日资讯简报的 Node.js 项目。每天自动采集你关注的领域的最新资讯，利用 AI 整理成结构化的日报，并通过 GitHub Pages 自动发布。

### ✨ 特性

- 🤖 **AI 智能整理**：支持硅基流动（免费模型）和 OpenAI GPT
- ⏰ **定时自动执行**：每天北京时间 8:00 自动生成
- 📱 **响应式网站**：适配手机和电脑阅读
- 📂 **历史存档**：保留最近 30 天日报
- 🚀 **自动部署**：GitHub Actions 自动发布到 GitHub Pages

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/ADailyReport.git
cd ADailyReport
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
# 复制环境变量文件
cp .env.example .env

# 编辑 .env，填入你的硅基流动 API Key
# 获取地址: https://siliconflow.cn/dashboard/ak
# 新用户赠送额度，免费模型足够使用
OPENAI_API_KEY=sk-your-api-key-here
```

### 4. 配置关注领域

编辑 `config.js` 文件，修改 `topics` 数组：

```javascript
topics: [
  '人工智能',
  '大语言模型',
  'LLM',
  'ChatGPT',
  'Claude',
  '开源项目',
  '前端开发'
]
```

### 5. 本地测试

```bash
npm start
```

执行后，日报将生成在 `output/` 目录。

## 📡 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 创建新仓库，命名为 `ADailyReport`
3. 推送代码到仓库

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ADailyReport.git
git push -u origin main
```

### 2. 配置 GitHub Pages

1. 进入仓库设置 (Settings)
2. 找到 "Pages" 左侧菜单
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "gh-pages"，目录选择 "/(root)"
5. 点击 Save

### 3. 添加 GitHub Secrets

1. 进入仓库的 Settings → Secrets and variables → Actions
2. 添加新的 Secret：
   - Name: `OPENAI_API_KEY`
   - Value: 你的 OpenAI API Key

### 4. 启用 Actions

1. 进入仓库的 Actions 页面
2. 点击 "I understand my workflows, go ahead and enable them"
3. 每天北京时间 8:00 会自动执行

## 📁 项目结构

```
ADailyReport/
├── .github/
│   └── workflows/
│       └── daily-report.yml    # GitHub Actions 工作流
├── src/
│   ├── collector/              # 数据采集
│   │   ├── index.js
│   │   ├── search.js          # 搜索引擎采集
│   │   └── rss.js             # RSS订阅解析
│   ├── generator/             # 日报生成
│   │   ├── index.js
│   │   ├── report.js          # AI生成日报
│   │   ├── prompt.js          # AI提示词
│   │   ├── template.js        # HTML模板
│   │   └── website.js         # 网站构建
│   └── index.js               # 主入口
├── config.js                   # 配置文件
├── package.json
└── README.md
```

## ⚙️ 配置说明

| 配置项 | 说明 | 默认值 |
|-------|------|-------|
| `topics` | 关注的关键词 | AI、大语言模型等 |
| `ai.provider` | AI 提供商 | siliconflow |
| `ai.currentModel` | 使用的模型 | free (Qwen2.5-7B) |
| `ai.temperature` | AI 创造性参数 | 0.7 |
| `report.historyDays` | 历史日报保留天数 | 30 |
| `rssSources` | RSS 订阅源 | 36氪、掘金等 |

## 🧠 硅基流动模型配置

在 `config.js` 中可以切换不同模型：

```javascript
ai: {
  currentModel: 'free',  // 免费模型（推荐）

  models: {
    // 免费模型 - 足够日常使用
    free: 'Qwen/Qwen2.5-7B-Instruct',

    // 性价比模型 - 32B参数
    pro: 'Qwen/Qwen2.5-32B-Instruct',

    // 高性能模型 - 72B参数
    premium: 'Qwen/Qwen2.5-72B-Instruct'
  }
}
```

### 热门免费模型

| 模型 | 说明 |
|-----|------|
| Qwen/Qwen2.5-7B-Instruct | 阿里通义千问，免费额度充足 ✅ |
| THUDM/glm4-9b-chat | 智谱 GLM-4 |
| 01-ai/Yi-1.5-6B-Chat | 01.AI Yi-1.5 |
| mistralai/Mistral-7B-Instruct-v0.2 | Mistral 7B |

## 🔧 自定义 RSS 源

在 `config.js` 中添加：

```javascript
rssSources: [
  {
    name: '站点名称',
    url: 'RSS订阅地址'
  }
]
```

## ❓ 常见问题

### 1. 硅基流动 API 收费吗？

新用户赠送免费额度，免费的 Qwen2.5-7B-Instruct 模型足够日常使用。如果额度用完，可以充值（非常便宜，约 ¥10 可以用很久）。

### 2. 可以使用 OpenAI 吗？

可以。在 `config.js` 中修改配置：

```javascript
ai: {
  provider: 'openai',
  model: 'gpt-4o'
}
```

### 3. 可以不使用 AI 吗？

可以。如果不设置 `OPENAI_API_KEY`，系统会生成简化版日报（仅包含原始资讯列表）。

### 4. GitHub Pages 访问不了？

- 检查仓库设置中 Pages 配置是否正确
- 确认 Actions 已执行成功
- 等待 1-2 分钟让部署完成

### 5. 如何手动触发生成？

进入 GitHub Actions 页面，点击 "Daily Report" → "Run workflow"

## 📝 License

MIT License - 欢迎开源和修改

## 🙏 致谢

- [硅基流动](https://siliconflow.cn) - 提供免费/低价 AI 模型
- [OpenAI](https://openai.com) - AI 能力支持
- [DuckDuckGo](https://duckduckgo.com) - 提供搜索 API
- [RSS Parser](https://github.com/rbren/rss-parser) - RSS 解析
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) - GitHub Pages 部署
