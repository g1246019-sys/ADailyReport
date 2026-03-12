/**
 * 日报生成器 - 统一入口
 * 整合 AI 生成和网站构建
 */

const { generateReport } = require('./report');
const { buildWebsite, loadHistoryIndex, cleanupOldReports } = require('./website');
const dayjs = require('dayjs');

/**
 * 生成完整的日报和网站
 * @param {Object} collectedData - 采集的数据
 * @returns {Promise<Object>} - 生成结果
 */
async function generate(collectedData) {
  // 获取日期
  const dateStr = dayjs().format('YYYY年MM月DD日');

  console.log('\n========== 开始生成日报 ==========\n');

  // 1. AI 生成日报
  const report = await generateReport(collectedData.combinedData, dateStr);

  // 2. 加载历史索引
  const history = loadHistoryIndex();

  // 3. 构建网站
  const result = await buildWebsite(report, history);

  // 4. 清理旧日报
  cleanupOldReports();

  return {
    report,
    ...result
  };
}

module.exports = {
  generate
};
