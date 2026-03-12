/**
 * 网站生成器 - HTML 模板
 * 生成静态网站的 HTML 模板
 */

const dayjs = require('dayjs');

/**
 * 生成完整的 HTML 页面
 * @param {Object} report - 日报数据
 * @param {Array} history - 历史日报列表
 * @param {Object} config - 站点配置
 */
function generateHTML(report, history, config) {
  const date = dayjs(report.meta.date).format('YYYY年MM月DD日');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${report.title} | ${config.siteTitle}</title>
    <meta name="description" content="${report.summary}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f7fa;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header */
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 0 0 20px 20px;
            margin-bottom: 30px;
        }

        header h1 {
            font-size: 2rem;
            margin-bottom: 10px;
        }

        header .date {
            opacity: 0.9;
            font-size: 1.1rem;
        }

        /* Summary */
        .summary {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            margin-bottom: 25px;
        }

        .summary h2 {
            color: #667eea;
            font-size: 1.3rem;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f0f0;
        }

        .summary p {
            color: #555;
            font-size: 1.05rem;
        }

        /* Hot Topics */
        .hot-topics {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            margin-bottom: 25px;
        }

        .hot-topics h2 {
            color: #ff6b6b;
            font-size: 1.3rem;
            margin-bottom: 15px;
        }

        .hot-topics ul {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            list-style: none;
        }

        .hot-topics li {
            background: linear-gradient(135deg, #ff6b6b, #ffa500);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.95rem;
        }

        .hot-topics li a {
            color: white;
            text-decoration: none;
        }

        .hot-topics li a:hover {
            text-decoration: underline;
        }

        /* Categories */
        .category {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            margin-bottom: 25px;
        }

        .category h2 {
            color: #333;
            font-size: 1.4rem;
            margin-bottom: 10px;
        }

        .category .description {
            color: #888;
            font-size: 0.95rem;
            margin-bottom: 20px;
        }

        .article {
            padding: 15px 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .article:last-child {
            border-bottom: none;
        }

        .article h3 {
            font-size: 1.1rem;
            margin-bottom: 8px;
        }

        .article h3 a {
            color: #333;
            text-decoration: none;
            transition: color 0.2s;
        }

        .article h3 a:hover {
            color: #667eea;
        }

        .article .meta {
            font-size: 0.85rem;
            color: #888;
            margin-bottom: 8px;
        }

        .article .meta span {
            margin-right: 15px;
        }

        .article .summary-text {
            color: #666;
            font-size: 0.95rem;
        }

        /* Tools */
        .tools {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            margin-bottom: 25px;
        }

        .tools h2 {
            color: #51cf66;
            font-size: 1.3rem;
            margin-bottom: 15px;
        }

        .tool-item {
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .tool-item:last-child {
            border-bottom: none;
        }

        .tool-item a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }

        .tool-item a:hover {
            text-decoration: underline;
        }

        .tool-item .desc {
            color: #666;
            font-size: 0.9rem;
            margin-top: 4px;
        }

        /* Closing */
        .closing {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            margin-bottom: 25px;
            text-align: center;
            color: #666;
        }

        /* History */
        .history {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            margin-bottom: 25px;
        }

        .history h2 {
            color: #333;
            font-size: 1.3rem;
            margin-bottom: 15px;
        }

        .history ul {
            list-style: none;
        }

        .history li {
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .history li:last-child {
            border-bottom: none;
        }

        .history a {
            color: #667eea;
            text-decoration: none;
        }

        .history a:hover {
            text-decoration: underline;
        }

        .history .date {
            color: #888;
            font-size: 0.85rem;
            margin-left: 10px;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 30px 20px;
            color: #888;
            font-size: 0.9rem;
        }

        footer a {
            color: #667eea;
            text-decoration: none;
        }

        /* Responsive */
        @media (max-width: 600px) {
            header h1 {
                font-size: 1.5rem;
            }

            .container {
                padding: 15px;
            }

            .category, .summary, .hot-topics, .tools, .closing, .history {
                padding: 20px;
            }
        }

        /* Fallback badge */
        .fallback-badge {
            display: inline-block;
            background: #ffe066;
            color: #333;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.8rem;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <header>
        <h1>🤖 ${config.siteTitle}</h1>
        <p class="date">📅 ${date} ${report.meta.fallback ? '<span class="fallback-badge">简化版</span>' : ''}</p>
    </header>

    <div class="container">
        <!-- 简报摘要 -->
        <section class="summary">
            <h2>📝 今日简报</h2>
            <p>${report.summary}</p>
        </section>

        <!-- 热点话题 -->
        ${report.hotTopics && report.hotTopics.length > 0 ? `
        <section class="hot-topics">
            <h2>🔥 热门话题</h2>
            <ul>
                ${report.hotTopics.map(topic => `<li><a href="https://www.baidu.com/s?wd=${encodeURIComponent(topic)}" target="_blank" rel="noopener">${topic}</a></li>`).join('')}
            </ul>
        </section>
        ` : ''}

        <!-- 分类资讯 -->
        ${report.categories ? report.categories.map(category => `
        <section class="category">
            <h2>${category.name}</h2>
            <p class="description">${category.description}</p>
            ${category.items ? category.items.map(item => `
            <article class="article">
                <h3><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></h3>
                <p class="meta">
                    <span>📰 ${item.source}</span>
                </p>
                <p class="summary-text">${item.summary}</p>
            </article>
            `).join('') : ''}
        </section>
        `).join('') : ''}

        <!-- 工具推荐 -->
        ${report.tools && report.tools.length > 0 ? `
        <section class="tools">
            <h2>🛠️ 工具推荐</h2>
            ${report.tools.map(tool => `
            <div class="tool-item">
                <a href="${tool.url}" target="_blank" rel="noopener">${tool.name}</a>
                <p class="desc">${tool.description}</p>
            </div>
            `).join('')}
        </section>
        ` : ''}

        <!-- 结束语 -->
        ${report.closing ? `
        <section class="closing">
            <p>${report.closing}</p>
        </section>
        ` : ''}

        <!-- 历史日报 -->
        <section class="history">
            <h2>📚 历史日报</h2>
            <ul>
                ${history.map(item => `
                <li>
                    <a href="${item.url}">${item.title}</a>
                    <span class="date">${item.date}</span>
                </li>
                `).join('')}
            </ul>
        </section>
    </div>

    <footer>
        <p>🤖 由 <a href="https://github.com" target="_blank">ADailyReport</a> 自动生成</p>
        <p>© ${new Date().getFullYear()} ADailyReport - 每日AI资讯</p>
    </footer>
</body>
</html>`;
}

module.exports = {
  generateHTML
};
