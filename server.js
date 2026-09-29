/**
 * HELLO AI CODING 前端页面服务器
 * 使用 Node.js 内置 http 模块实现，零第三方依赖
 * @author wangcheng
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// 服务监听端口号
const PORT = 3000;

// 前端页面文件的完整路径（public/index.html）
const PAGE_FILE_PATH = path.join(__dirname, 'public', 'index.html');

/**
 * 处理客户端请求：根据请求路径返回对应响应
 * @param {http.IncomingMessage} req 请求对象
 * @param {http.ServerResponse} res 响应对象
 * @author wangcheng
 */
function handleRequest(req, res) {
  // 只处理首页和页面文件本身两个路径，其余路径统一返回 404
  if (req.url === '/' || req.url === '/index.html') {
    sendPage(res);
  } else {
    sendNotFound(res);
  }
}

/**
 * 读取并返回前端页面内容
 * @param {http.ServerResponse} res 响应对象
 * @author wangcheng
 */
function sendPage(res) {
  fs.readFile(PAGE_FILE_PATH, 'utf8', (err, html) => {
    // 读取失败时返回 500，并在控制台打印错误原因
    if (err) {
      console.error('读取页面文件失败：', err.message);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('服务器内部错误：页面文件读取失败');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
}

/**
 * 返回 404 页面未找到响应
 * @param {http.ServerResponse} res 响应对象
 * @author wangcheng
 */
function sendNotFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 页面未找到');
}

/**
 * 创建 HTTP 服务并监听端口，启动失败时给出中文提示
 * @author wangcheng
 */
function startServer() {
  const server = http.createServer(handleRequest);

  server.listen(PORT, () => {
    console.log(`服务已启动，请访问 http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    // 端口被占用时提示用户如何处理
    if (err.code === 'EADDRINUSE') {
      console.error(`端口 ${PORT} 已被占用，请关闭占用程序，或修改 server.js 中的 PORT 后重试`);
    } else {
      console.error('服务启动失败：', err.message);
    }
  });
}

startServer();
