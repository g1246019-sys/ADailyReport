/**
 * AI 日报生成器 - 日报生成逻辑
 * 支持 OpenAI API 和 硅基流动(SiliconFlow) API
 */

const OpenAI = require('openai');
const { getSystemPrompt, getUserPrompt } = require('./prompt');
const config = require('../../config');

let aiClient = null;

/**
 * 获取当前使用的模型名称
 */
function getModelName() {
  const aiConfig = config.ai;

  if (aiConfig.provider === 'siliconflow') {
    // 硅基流动：根据配置选择模型
    const modelKey = aiConfig.currentModel || 'free';
    return aiConfig.models?.[modelKey] || aiConfig.models.free;
  } else {
    // OpenAI：直接使用配置的模型名
    return aiConfig.model;
  }
}

/**
 * 初始化 AI 客户端
 */
function initAIClient() {
  if (!aiClient) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('未设置 OPENAI_API_KEY 环境变量！\n请在 .env 文件中设置 OPENAI_API_KEY');
    }

    const aiConfig = config.ai;

    if (aiConfig.provider === 'siliconflow') {
      // 硅基流动配置
      aiClient = new OpenAI({
        apiKey: apiKey,
        baseURL: aiConfig.baseURL || 'https://api.siliconflow.cn/v1'
      });
    } else {
      // OpenAI 配置
      aiClient = new OpenAI({
        apiKey: apiKey
      });
    }
  }

  return aiClient;
}

/**
 * 生成日报
 * @param {Array} data - 采集的原始数据
 * @param {string} dateStr - 日期字符串
 * @returns {Promise<Object>} - 生成的日报
 */
async function generateReport(data, dateStr) {
  console.log('\n========== 开始生成日报 ==========\n');

  const aiConfig = config.ai;
  const modelName = getModelName();

  try {
    const client = initAIClient();

    console.log(`🤖 正在调用 ${aiConfig.provider === 'siliconflow' ? '硅基流动' : 'OpenAI'} AI 生成日报...`);
    console.log(`   提供商: ${aiConfig.provider}`);
    console.log(`   模型: ${modelName}`);

    const response = await client.chat.completions.create({
      model: modelName,
      temperature: aiConfig.temperature,
      max_tokens: aiConfig.maxTokens,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: getSystemPrompt()
        },
        {
          role: "user",
          content: getUserPrompt(data, dateStr)
        }
      ]
    });

    const content = response.choices[0].message.content;
    console.log('   ✓ AI 生成完成');

    // 解析 JSON
    let report;
    try {
      report = JSON.parse(content);
    } catch (parseError) {
      console.error('   ✗ JSON 解析失败，尝试修复...');
      // 尝试提取 JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        report = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('无法解析 AI 响应');
      }
    }

    // 添加元数据
    report.meta = {
      generatedAt: new Date().toISOString(),
      sourceCount: data.length,
      date: dateStr,
      provider: aiConfig.provider,
      model: modelName
    };

    console.log(`   ✓ 日报结构解析完成`);
    console.log(`   - 分类数: ${report.categories?.length || 0}`);
    console.log(`   - 热点话题: ${report.hotTopics?.length || 0}`);

    return report;

  } catch (error) {
    console.error('生成日报失败:', error.message);

    // 如果 AI 生成失败，返回降级版本的日报
    console.log('   ⚠️ 返回降级版本日报...');
    return generateFallbackReport(data, dateStr);
  }
}

/**
 * 生成降级版本的日报（不调用 AI）
 */
function generateFallbackReport(data, dateStr) {
  const categories = {};

  // 按来源分组
  for (const item of data) {
    const source = item.source || '其他';
    if (!categories[source]) {
      categories[source] = [];
    }
    categories[source].push({
      title: item.title,
      summary: item.description || '暂无摘要',
      url: item.url,
      source: source
    });
  }

  return {
    title: `${dateStr} 每日资讯汇总`,
    summary: `今日共收集 ${data.length} 条资讯，涵盖 ${Object.keys(categories).length} 个来源。`,
    hotTopics: [],
    categories: Object.entries(categories).map(([name, items]) => ({
      name: name,
      description: `来自 ${name} 的最新资讯`,
      items: items.slice(0, 5)
    })),
    tools: [],
    closing: '以上是今日资讯汇总，更多详情请点击链接查看。',
    meta: {
      generatedAt: new Date().toISOString(),
      sourceCount: data.length,
      date: dateStr,
      fallback: true
    }
  };
}

module.exports = {
  generateReport
};
