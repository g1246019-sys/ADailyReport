/**
 * 数据采集器 - 统一入口
 * 整合搜索和 RSS 两种采集方式
 */

const { searchBatch } = require('./search');
const { parseMultiple } = require('./rss');
const config = require('../../config');

/**
 * 采集所有数据
 * @returns {Promise<Object>} - 采集结果
 */
async function collectAll() {
  console.log('\n========== 开始数据采集 ==========\n');

  const results = {
    searchResults: [],
    rssArticles: [],
    timestamp: new Date().toISOString()
  };

  // 1. 关键词搜索
  console.log('📡 阶段1: 关键词搜索\n');
  results.searchResults = await searchBatch(
    config.topics,
    config.articlesPerTopic
  );

  // 2. RSS 订阅源
  if (config.rssSources && config.rssSources.length > 0) {
    console.log('\n📡 阶段2: RSS订阅源解析\n');
    results.rssArticles = await parseMultiple(
      config.rssSources,
      10
    );
  }

  // 3. 合并去重
  console.log('\n📡 阶段3: 数据整理\n');
  const allData = [...results.searchResults, ...results.rssArticles];
  const uniqueData = deduplicate(allData);

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
