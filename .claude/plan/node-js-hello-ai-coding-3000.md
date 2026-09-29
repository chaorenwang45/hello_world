# 计划：Node.js 前端页面 —— 显示 "HELLO AI CODING"（端口 3000）

## 背景（Context）

`hello_world` 目录当前为空，属于全新项目。用户需要一个能用 Node.js 启动的前端页面，启动后在浏览器访问 `http://localhost:3000` 能看到 "HELLO AI CODING" 字样。

环境检测结果：
- Node.js v22.12.0 可用
- 全局 npm 为 6.13.4，且提示不支持 Node v22（`npm WARN does not support Node.js v22.12.0`）

## 技术方案

**使用 Node.js 内置 `http` 模块，零第三方依赖（不用 Express）。**

理由：
1. npm 版本过旧且与 Node 22 不兼容，安装第三方依赖存在失败风险；
2. 仅需返回一个静态页面，内置模块完全够用，启动无需 `npm install`；
3. 页面与服务器代码分离，后续想改文字或样式直接编辑 HTML 即可。

## 文件结构

```
hello_world/
├── server.js           # Node HTTP 服务器（内置模块，无依赖）
├── public/
│   └── index.html      # 前端页面，页面中央显示 HELLO AI CODING
└── package.json        # 项目信息 + start 脚本（无任何依赖）
```

## 实现步骤

### 1. 创建 `public/index.html`
- 标准 HTML5 页面，`<title>` 为 "HELLO AI CODING"
- 页面中央大字显示 **HELLO AI CODING**（简单 CSS 居中，深色/浅色底皆可，保持简洁美观）
- HTML 注释使用中文

### 2. 创建 `server.js`
逻辑保持简单直白，便于审阅：
- `require('http')`、`require('fs')`、`require('path')` 三个内置模块
- 常量：`PORT = 3000`、页面文件路径 `public/index.html`
- 路由规则：
  - `GET /` 或 `/index.html` → 读取并返回 `public/index.html`，`Content-Type: text/html; charset=utf-8`
  - 其他路径 → 返回 `404`，中文提示
  - 读取文件失败 → 返回 `500`，中文错误提示（含 `console.error` 输出）
- 启动后 `console.log` 中文提示：`服务已启动，请访问 http://localhost:3000`
- 遵循编码规范：所有函数带中文注释，注释署名 `@author wangcheng`；不使用类，避免过度设计

### 3. 创建 `package.json`
- `name`、`version`、`description`（中文）
- `"scripts": { "start": "node server.js" }`
- 不声明任何 dependencies（保持零依赖）

### 4. 归档计划文件（遵循项目约定）
- 将本计划复制到项目根目录 `.claude/plan/` 下（该目录不存在则创建）

## 验证方式

1. 启动服务：`node server.js`，确认控制台输出中文启动提示、无报错
2. 命令行验证页面内容：
   ```
   curl -s http://localhost:3000
   ```
   确认返回的 HTML 中包含 `HELLO AI CODING`
3. 验证 404 分支：`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/xxx` 应返回 404
4. 请用户在浏览器打开 `http://localhost:3000`，确认页面上可见 "HELLO AI CODING" 字样
5. 若 3000 端口被占用导致启动失败（`EADDRINUSE`），则向用户反馈并确认是否更换端口

## 风险与说明

- 本方案不需要联网安装任何包，规避了旧版 npm 的兼容性问题
- 端口固定 3000，与用户要求一致；如需改动只需修改 `server.js` 中的 `PORT` 常量
