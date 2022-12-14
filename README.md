# web-authn-completed-app

- [简介](#简介)
- [预览](#预览)
- [安装](#安装)
- [运行](#运行)
- [常见问题](#常见问题)
- [许可证](#许可证)

## 简介

此 monorepo 项目包含 client (客户端) 和 server (服务端) 两部分的代码实现
- client
- server

*有关 client 和 server 端的详细信息, 请查看对应模块的 README*

## 预览

点击链接在线预览: [web-authn-completed-app](https://1bb8-240e-305-1b82-ae4d-703b-ca1e-d729-14c5.jp.ngrok.io)

## 安装

克隆代码后安装依赖项
```
git clone git@github.com:guMcrey/web-authn-completed-app.git
npm install pnpm -g
pnpm install
```

## 运行

**方式1：Client、Server、MySQL 都使用 Docker 镜像**（推荐）

本地环境准备:
- Docker

```
docker-compose up --build
docker container ls
docker exec -ti <mysql-container-id> /bin/bash
mysql -h127.0.0.1 -uroot -pPassword123#@!

show databases;
use web_authn_demo;
```

创建数据库表：
```
# 将 packages/server/sql/init.sql 内容粘贴到 mysql 容器命令行中
show tables;
```

使用浏览器：http://localhost:5173

---

**方式2：Client、Server 本地运行，MySQL 使用 Docker 镜像**

本地环境准备:
- Node 16+
- NPM 8+
- Docker

```
docker-compose -f docker-compose-dev.yml up --build
docker container ls
docker exec -ti <mysql-container-id> /bin/bash
mysql -h127.0.0.1 -uroot -pPassword123#@!

show databases;
use web_authn_demo;
```

创建数据库表：
```
# 将 packages/server/sql/init.sql 内容粘贴到 mysql 容器命令行中
show tables;
```

使用浏览器：http://localhost:5173

**方式3：Client、Server、MySQL 均本地运行**

本地环境准备:
- Node 16+
- NPM 8+
- MySQL 8+

分别启动 server 和 client 端
```
cd packages/server
pnpm run start:dev

cd ..
cd client
pnpm run dev
```

连接 MySQL
```
# 请按需修改用户名和密码
mysql -h127.0.0.1 -uroot -pPassword123#@!
```

创建数据库表
```
# 将 packages/server/sql/init.sql 内容粘贴到 mysql 容器命令行中
show tables;
```

使用浏览器：http://localhost:5173

## 常见问题
- [MySQL 8.0 - Client does not support authentication protocol requested by server; consider upgrading MySQL client](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)

```
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'Password123#@!';
flush privileges;
```

## 许可证

web-authn-completed-app 是开源项目, 许可证为 [MIT](./LICENSE)
