/**
 * ADailyReport 配置文件
 * 根据您的需求自定义以下配置
 */

module.exports = {
  // ==================== 关注领域配置 ====================
  // 您感兴趣的领域关键词，AI会根据这些关键词搜索最新资讯
  topics: [
    '人工智能',
    '大语言模型',
    'LLM',
    'ChatGPT',
    'Claude',
    '开源项目',
    '前端开发',
    'JavaScript'
  ],

  // 每个领域搜索的文章数量
  articlesPerTopic: 3,

  // ==================== RSS 订阅源 ====================
  // 可选的RSS订阅源，会与搜索结果合并
  rssSources: [
    {
      name: '36氪',
      url: 'https://36kr.com/feed/'
    },
    {
      name: 'InfoQ',
      url: 'https://www.infoq.com feed/'
    },
    {
      name: '掘金',
      url: 'https://juejin.cn/rss'
    },
    {
      name: '开源中国',
      url: 'https://www.oschina.net/news/rss'
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
