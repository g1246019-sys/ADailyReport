/**
 * 数据采集器 - 搜索引擎模块
 * 使用 DuckDuckGo API 进行搜索（免费，无需API Key）
 */

const axios = require('axios');

/**
 * 搜索最新资讯
 * @param {string} keyword - 搜索关键词
 * @param {number} maxResults - 最大结果数
 * @returns {Promise<Array>} - 搜索结果数组
 */
async function searchNews(keyword, maxResults = 5) {
  // 在关键词中添加时间限定词以获取最新资讯
  const timeKeywords = ['', '今天', '本周', '本月'];
  const randomTime = timeKeywords[Math.floor(Math.random() * timeKeywords.length)];
  const searchQuery = randomTime ? `${keyword} ${randomTime}` : keyword;

  console.log(`🔍 搜索: ${searchQuery}`);

  try {
    // 使用 DuckDuckGo Instant Answer API
    const response = await axios.get('https://api.duckduckgo.com/', {
      params: {
        q: searchQuery,
        format: 'json',
        no_html: 1,
        skip_disambig: 1
      },
      timeout: 10000
    });

    const data = response.data;

    // 解析相关主题和新闻
    const results = [];

    // 获取 RelatedTopics
    if (data.RelatedTopics) {
      for (const topic of data.RelatedTopics.slice(0, maxResults)) {
        if (topic.Text && topic.FirstURL) {
          results.push({
            title: topic.Text,
            url: topic.FirstURL,
            source: extractSource(topic.FirstURL),
            keyword: keyword
          });
        }
      }
    }

    // 如果没有足够结果，尝试获取 Abstract
    if (results.length === 0 && data.AbstractText) {
      results.push({
        title: data.AbstractText.substring(0, 200),
        url: data.AbstractURL || '',
        source: extractSource(data.AbstractURL),
        keyword: keyword
      });
    }

    console.log(`   ✓ 获取到 ${results.length} 条结果`);
    return results;

  } catch (error) {
    console.error(`   ✗ 搜索失败: ${keyword} - ${error.message}`);
    return [];
  }
}

/**
 * 批量搜索多个关键词
 * @param {Array<string>} keywords - 关键词数组
 * @param {number} maxResultsPerKeyword - 每个关键词的最大结果数
 * @returns {Promise<Array>} - 合并后的搜索结果
 */
async function searchBatch(keywords, maxResultsPerKeyword = 3) {
  const allResults = [];
  const seenUrls = new Set();

  for (const keyword of keywords) {
    const results = await searchNews(keyword, maxResultsPerKeyword);

    // 去重
    for (const result of results) {
      if (!seenUrls.has(result.url) && result.url) {
        seenUrls.add(result.url);
        allResults.push(result);
      }
    }

    // 避免请求过快
    await sleep(1000);
  }

  return allResults;
}

/**
 * 从URL中提取来源网站
 */
function extractSource(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return '未知来源';
  }
}

/**
 * 延迟函数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  searchNews,
  searchBatch
};
