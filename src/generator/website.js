/**
 * 网站生成器 - 构建静态网站
 * 将日报数据生成为静态 HTML 网站
 */

const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const { generateHTML } = require('./template');
const config = require('../../config');

const outputDir = path.resolve(process.cwd(), config.output.dir);

/**
 * 构建网站
 * @param {Object} report - 日报数据
 * @param {Array} history - 历史日报列表
 */
async function buildWebsite(report, history = []) {
  console.log('\n========== 开始构建网站 ==========\n');

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 生成 HTML
  const html = generateHTML(report, history, config.output);
  const indexPath = path.join(outputDir, 'index.html');

  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log(`✅ 首页已生成: ${indexPath}`);

  // 保存日报 JSON 数据（用于后续处理）
  // 处理不同格式的日期
  let reportDate;
  try {
    reportDate = dayjs(report.meta.date, ['YYYY年MM月DD日', 'YYYY-MM-DD']).format('YYYY-MM-DD');
    if (reportDate === 'Invalid Date') {
      reportDate = dayjs().format('YYYY-MM-DD');
    }
  } catch (e) {
    reportDate = dayjs().format('YYYY-MM-DD');
  }

  const reportDir = path.join(outputDir, 'reports');

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportJsonPath = path.join(reportDir, `${reportDate}.json`);
  fs.writeFileSync(reportJsonPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`✅ 日报数据已保存: ${reportJsonPath}`);

  // 更新历史索引
  await updateHistoryIndex(report, history);

  console.log('\n✅ 网站构建完成！');

  return {
    indexPath,
    reportJsonPath
  };
}

/**
 * 更新历史日报索引
 */
async function updateHistoryIndex(report, existingHistory) {
  const reportDate = dayjs(report.meta.date);
  const dateStr = reportDate.format('YYYY-MM-DD');
  const displayDate = reportDate.format('MM月DD日');

  // 添加当前日报到历史
  const newHistoryItem = {
    title: `📰 ${displayDate} 期`,
    url: `reports/${dateStr}.json`,
    date: displayDate,
    fullDate: dateStr
  };

  // 合并历史（去重，按日期排序）
  const allHistory = [newHistoryItem, ...existingHistory];
  const uniqueHistory = allHistory.filter((item, index, self) =>
    index === self.findIndex(t => t.fullDate === item.fullDate)
  );

  // 只保留最近30天
  const recentHistory = uniqueHistory.slice(0, config.report.historyDays);

  // 保存历史索引
  const historyPath = path.join(config.output.dir, 'history.json');
  fs.writeFileSync(historyPath, JSON.stringify(recentHistory, null, 2), 'utf-8');

  return recentHistory;
}

/**
 * 加载历史日报索引
 */
function loadHistoryIndex() {
  const historyPath = path.join(config.output.dir, 'history.json');

  if (fs.existsSync(historyPath)) {
    try {
      const data = fs.readFileSync(historyPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('加载历史索引失败:', error.message);
      return [];
    }
  }

  return [];
}

/**
 * 清理旧日报（保留最近N天）
 */
function cleanupOldReports() {
  const reportDir = path.join(outputDir, 'reports');

  if (!fs.existsSync(reportDir)) {
    return;
  }

  const files = fs.readdirSync(reportDir);
  const cutoffDate = dayjs().subtract(config.report.historyDays, 'day');

  for (const file of files) {
    if (file.endsWith('.json')) {
      const dateStr = file.replace('.json', '');
      const fileDate = dayjs(dateStr);

      if (fileDate.isBefore(cutoffDate)) {
        const filePath = path.join(reportDir, file);
        fs.unlinkSync(filePath);
        console.log(`🗑️  已清理旧日报: ${file}`);
      }
    }
  }
}

module.exports = {
  buildWebsite,
  loadHistoryIndex,
  cleanupOldReports
};
