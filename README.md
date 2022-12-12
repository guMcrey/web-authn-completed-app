# web-authn-completed-app

- [简介](#简介)
- [预览](#预览)
- [运行](#运行)
- [许可证](#许可证)

## 简介

此 monorepo 项目包含 client (客户端) 和 server (服务端) 两部分的代码实现
- client
- server

*有关 client 和 server 端的详细信息, 请查看对应模块的 README*

## 预览

请点击在线预览: [web-authn-completed-app](https://1bb8-240e-305-1b82-ae4d-703b-ca1e-d729-14c5.jp.ngrok.io)

## 运行

本地环境准备:
- Node 16+
- NPM 8+
- MySQL 8+

克隆代码后安装依赖项
```
git clone git@github.com:guMcrey/web-authn-completed-app.git
pnpm install
```

分别启动 server 和 client 端
```
cd packages/server
pnpm run start:dev

cd ..
cd client
pnpm run dev
```

访问 http://localhost:5173

## 许可证

web-authn-completed-app 是开源项目, 许可证为 [MIT](./LICENSE)
