/**
 * 数据采集器 - 统一入口
 * 使用 RSS 订阅源采集最新资讯
 */

const { parseMultiple } = require('./rss');
const config = require('../../config');

/**
 * 采集所有数据
 * @returns {Promise<Object>} - 采集结果
 */
async function collectAll() {
  console.log('\n========== 开始数据采集 ==========\n');

  const results = {
    rssArticles: [],
    timestamp: new Date().toISOString()
  };

  // 1. RSS 订阅源
  if (config.rssSources && config.rssSources.length > 0) {
    console.log('📡 RSS订阅源解析\n');
    results.rssArticles = await parseMultiple(
      config.rssSources,
      10
    );
  }

  // 2. 数据整理
  console.log('\n📡 数据整理\n');
  const uniqueData = deduplicate(results.rssArticles);

  console.log(`   ✓ 共获取 ${uniqueData.length} 条有效资讯`);

  return {
    ...results,
    combinedData: uniqueData
  };
}

/**
 * 根据URL去重
 */
function deduplicate(data) {
  const seen = new Set();
  const result = [];

  for (const item of data) {
    if (item.url && !seen.has(item.url)) {
      seen.add(item.url);
      result.push(item);
    }
  }

  return result;
}

module.exports = {
  collectAll
};
