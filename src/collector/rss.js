/**
 * 数据采集器 - RSS 订阅模块
 * 解析各大科技媒体的 RSS 订阅源
 */

const Parser = require('rss-parser');

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'ADailyReport/1.0'
  }
});

/**
 * 解析单个 RSS 源
 * @param {Object} source - RSS源配置 {name, url}
 * @param {number} maxItems - 最大条目数
 * @returns {Promise<Array>} - 解析后的文章列表
 */
async function parseRSS(source, maxItems = 10) {
  console.log(`📰 解析RSS源: ${source.name}`);

  try {
    const feed = await parser.parseURL(source.url);

    // 计算3天前的时间戳
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const articles = (feed.items || [])
      .filter(item => {
        // 过滤掉3天前的旧文章
        const pubDate = new Date(item.pubDate || item.isoDate);
        return pubDate >= threeDaysAgo;
      })
      .slice(0, maxItems)
      .map(item => ({
        title: item.title || '',
        url: item.link || '',
        description: cleanHTML(item.contentSnippet || item.content || ''),
        pubDate: item.pubDate || item.isoDate || '',
        source: source.name,
        type: 'rss'
      }));

    console.log(`   ✓ 获取到 ${articles.length} 篇最新文章`);
    return articles;

  } catch (error) {
    console.error(`   ✗ RSS解析失败: ${source.name} - ${error.message}`);
    return [];
  }
}

/**
 * 批量解析多个 RSS 源
 * @param {Array} sources - RSS源配置数组
 * @param {number} maxItemsPerSource - 每个源的最大条目数
 * @returns {Promise<Array>} - 合并后的文章列表
 */
async function parseMultiple(sources, maxItemsPerSource = 5) {
  const allArticles = [];

  for (const source of sources) {
    const articles = await parseRSS(source, maxItemsPerSource);
    allArticles.push(...articles);

    // 避免请求过快
    await sleep(500);
  }

  // 按发布时间排序
  allArticles.sort((a, b) => {
    return new Date(b.pubDate) - new Date(a.pubDate);
  });

  return allArticles;
}

/**
 * 清理 HTML 标签，提取纯文本
 */
function cleanHTML(html) {
  if (!html) return '';

  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .trim()
    .substring(0, 300); // 截取前300字符
}

/**
 * 延迟函数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  parseRSS,
  parseMultiple
};
