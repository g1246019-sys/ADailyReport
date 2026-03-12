/**
 * ADailyReport 配置文件
 * 根据您的需求自定义以下配置
 */

module.exports = {
  // ==================== 关注领域配置 ====================
  // 您感兴趣的领域关键词，AI会根据这些关键词搜索最新资讯
  topics: [
    '人工智能',
    'AI大模型',
    'LLM',
    'ChatGPT',
    'Claude',
    'GPT-4',
    'Gemini',
    '开源大模型',
    'AI开源',
    '前端开发',
    'JavaScript',
    'TypeScript',
    'React',
    'Vue',
    'Node.js',
    'GitHub',
    '程序员',
    '技术 news'
  ],

  // 每个领域搜索的文章数量
  articlesPerTopic: 5,

  // ==================== RSS 订阅源 ====================
  // 可选的RSS订阅源，会与搜索结果合并
  rssSources: [
    // 国内科技媒体（经验证可用的）
    {
      name: '量子位',
      url: 'https://www.qbitai.com/feed'
    },
    {
      name: '钛媒体',
      url: 'https://www.tmtpost.com/feed'
    },
    {
      name: '爱范儿',
      url: 'https://www.ifanr.com/feed/'
    },
    {
      name: '少数派',
      url: 'https://sspai.com/feed'
    },
    {
      name: '雷峰网',
      url: 'https://www.leiphone.com/feed'
    },
    // 技术社区
    {
      name: '掘金',
      url: 'https://juejin.cn/rss'
    },
    {
      name: '开源中国',
      url: 'https://www.oschina.net/news/rss'
    },
    {
      name: 'V2EX',
      url: 'https://www.v2ex.com/index.xml'
    },
    // 国际科技媒体
    {
      name: 'TechCrunch',
      url: 'https://techcrunch.com/feed/'
    },
    {
      name: 'Wired',
      url: 'https://www.wired.com/feed/rss'
    },
    {
      name: 'Ars Technica',
      url: 'https://feeds.arstechnica.com/arstechnica/index'
    },
    {
      name: 'Engadget',
      url: 'https://www.engadget.com/rss.xml'
    },
    // 开发者社区
    {
      name: 'Hacker News',
      url: 'https://hnrss.org/frontpage'
    },
    {
      name: 'Dev.to',
      url: 'https://dev.to/feed'
    },
    {
      name: 'GitHub Trending',
      url: 'https://github.com/trending.rss'
    }
  ],

  // ==================== AI 配置 ====================
  ai: {
    // AI 提供商: 'siliconflow' (硅基流动) 或 'openai'
    provider: 'siliconflow',

    // 硅基流动模型列表（推荐使用免费/低价模型）
    // 模型列表参考: https://siliconflow.cn/models
    models: {
      // 免费模型（推荐）
      free: 'Qwen/Qwen2.5-7B-Instruct',
      // 性价比模型
      pro: 'Qwen/Qwen2.5-32B-Instruct',
      // 高性能模型
      premium: 'Qwen/Qwen2.5-72B-Instruct'
    },

    // 当前使用的模型（可切换为 'free'/'pro'/'premium'）
    currentModel: 'free',

    // API 配置
    baseURL: 'https://api.siliconflow.cn/v1',

    temperature: 0.7,
    maxTokens: 4000
  },

  // ==================== 日报配置 ====================
  report: {
    // 保留最近多少天的日报
    historyDays: 30,

    // 日报标题模板
    titleTemplate: '{{date}} AI 每日资讯简报',

    // 是否包含热门话题排行榜
    includeHotTopics: true,

    // 是否包含工具推荐
    includeTools: true
  },

  // ==================== 输出配置 ====================
  output: {
    // 输出目录
    dir: './output',

    // 网站标题
    siteTitle: 'ADailyReport - 每日AI资讯',

    // GitHub Pages 部署配置
    github: {
      // 你的GitHub用户名
      username: 'YOUR_GITHUB_USERNAME',
      // 仓库名（可选，默认使用仓库名）
      repo: '',
      // 部署分支
      branch: 'gh-pages'
    }
  }
};
