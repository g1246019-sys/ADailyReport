/**
 * AI 日报生成器 - Prompt 模板
 * 定义生成日报的提示词
 */

/**
 * 生成系统提示词
 */
function getSystemPrompt() {
  return `你是一位专业的科技编辑，负责为读者整理和撰写每日科技资讯简报。

## 你的任务
根据提供的原始资讯内容，整理、编辑成一份结构清晰、内容丰富的每日简报。

## 输出要求
1. 语言风格：专业、简洁、易读
2. 内容组织：按主题分类，每类包含3-5条重点资讯
3. 每条资讯要求：
   - 标题：简洁有力，能概括核心信息
   - 摘要：50-100字，概括文章要点
   - 来源：标明信息来源
4. 可以适当补充背景信息，但不要过度发挥
5. 如果某领域资讯较少，可以合并或减少篇幅

## 输出格式
请直接输出JSON格式（不需要markdown代码块），格式如下：
{
  "title": "2026年3月12日 AI每日资讯",
  "summary": "今日简报摘要（100字以内）",
  "hotTopics": ["热点话题1", "热点话题2", "热点话题3"],
  "categories": [
    {
      "name": "AI 进展",
      "description": "本类别简述",
      "items": [
        {
          "title": "资讯标题",
          "summary": "资讯摘要（50-100字）",
          "url": "原始链接",
          "source": "来源网站"
        }
      ]
    }
  ],
  "tools": [
    {
      "name": "工具名称",
      "description": "工具简介",
      "url": "工具链接"
    }
  ],
  "closing": "简短的结束语"
}`;
}

/**
 * 生成用户提示词
 * @param {Array} data - 采集的原始数据
 * @param {string} dateStr - 日期字符串
 */
function getUserPrompt(data, dateStr) {
  const topicsList = data.map((item, index) => `
${index + 1}. [${item.source || '未知来源'}]
   标题：${item.title}
   链接：${item.url}
   摘要：${item.description || '无'}
`).join('\n');

  return `## 任务
请为 ${dateStr} 整理一份AI和科技领域的每日资讯简报。

## 原始资讯数据
${topicsList}

## 要求
1. 从上述资讯中提取最有价值的内容
2. 按主题分类组织（建议分类：AI进展、大模型动态、开源项目、技术教程、工具推荐等）
3. 筛选出当日最热门的3-5个话题
4. 识别并推荐有价值的开发工具或项目
5. 请确保输出的JSON格式正确`;
}

module.exports = {
  getSystemPrompt,
  getUserPrompt
};
