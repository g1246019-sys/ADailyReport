/**
 * ADailyReport - 主程序入口
 * 自动化每日AI资讯日报生成与发布
 */

require('dotenv').config();
const dayjs = require('dayjs');

const { collectAll } = require('./collector');
const { generate } = require('./generator');

/**
 * 主函数
 */
async function main() {
  const startTime = Date.now();

  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║         🤖 ADailyReport 每日AI资讯生成器           ║');
  console.log('╚═══════════════════════════════════════════════════╝');
  console.log(`📅 执行时间: ${dayjs().format('YYYY年MM月DD日 HH:mm:ss')}\n`);

  try {
    // 1. 数据采集
    const collectedData = await collectAll();

    // 2. 生成日报
    console.log('\n========== 开始生成 ==========\n');
    const result = await generate(collectedData);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║                   ✅ 完成！                       ║');
    console.log('╚═══════════════════════════════════════════════════╝');
    console.log(`\n⏱️  总耗时: ${elapsed}秒`);
    console.log(`📄 日报已保存到: output/`);

  } catch (error) {
    console.error('\n❌ 执行失败:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 执行主函数
main();
