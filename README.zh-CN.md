# web-authn-completed-app

简体中文 | [英文](./README.md)

> web-authn-completed-app 是一个基于 [SimpleWebAuthn](https://simplewebauthn.dev/docs/) 实现的完整应用。它允许网站使用内置的认证器（如 Apple TouchID 和 Windows Hello 或移动设备的生物识别传感器）对用户进行身份认证；它可以代替密码或短信验证码等常规验证方式，为用户提供更安全、轻松的登录体验。

## 简介

此 monorepo 项目包含 client (客户端) 和 server (服务端) 两部分的代码实现
- [client](./packages/client/README.md)
- [server](./packages/server/README.md)

*有关 client 和 server 端的详细信息, 请查看对应模块的 README*

<details>
<summary>🌟 关于 WebAuthn</summary>
在开始了解 web-authn-completed-app 之前, 需要了解一下 WebAuthn, 因为 web-authn-completed-app 就是基于 WebAuthn API 实现的完整应用 (已经了解的可以[跳过](#预览)此部分)

**WebAuthn 是什么?**

- WebAuthn 由 W3C（万维网联盟）提出，是一种**基于浏览器的、新型的在线身份认证技术，允许用户使用基于硬件的身份验证设备（如 Apple TouchID 和 Windows Hello 或移动设备的生物识别传感器）来进行身份验证**。WebAuthn 旨在为用户提供更安全方便的在线身份验证方式，并且被大多数现代 Web 浏览器支持。

**WebAuthn 为什么更安全?**

- 和 HTTPS 一样，WebAuthn 使用**非对称加密**的思路来保证安全性，但侧重点又有所不同。WebAuthn 的核心在于“认证”而非“加密”，即保证产生了凭证的认证器是用户的认证器，而不是第三方在伪造凭证

  确保认证器是合法的: 通过调用 WebAuthn API, 在不同平台下，我们可以实现通过指纹、面部甚至虹膜扫描来认证身份，同时确保安全和隐私。因为像指纹、面部甚至虹膜扫描被仿冒的几率很小, 且能确保授权是由用户本人操作或用户本人知晓的情况下操作

  至于 WebAuthn 为什么不会有数据被拦截或欺骗的问题呢? 与其实现原理有关, 参见 WebAuthn 工作原理

**WebAuthn 工作原理是什么?** (简述)

- 使用 WebAuthn 分为两部分: 注册和验证
  - 注册

    a. 在用户第一次访问网站时, 使用用户名/密码登录网站后, 操作注册密钥, 在这个过程中浏览器会调起系统的认证器 (如果设备和浏览器都支持 WebAuthn)
    
    b. 用户使用指纹或面部甚至虹膜扫瞄授权注册后, 认证器生成一对公私钥, 私钥保存在客户端, 公钥被签名后浏览器并上传到服务器端

  - 验证
    
    a. 注册完成后, 当用户下次登录就可以使用注册的密钥, 使用非对称加密算法验证通过后, 直接登录, 不再需要输入密码或二次认证信息, 让用户登录更简单

  当然在实际调用 WebAuthn 过程中, 需要很多参数传递用于验证来源或其他确保数据传递安全的证明等。总体来看, 在整个注册和验证过程中, 保存在客户端的私钥不会在网络上传播, 所以泄露的风险微乎其微。而服务器端存储的公钥即使泄露, 对于黑客也毫无意义

**WebAuthn 缺点有哪些?**

- 主要的缺点有两个
  - 兼容性较差, 虽然目前大多浏览器和设备都支持了这一 API, 但对设备系统版本和浏览器版本还是有一定的要求. 且对于跨端登录时, Android 设备目前来看表现不佳
  - 用户必须先注册, 才能使用密钥代替传统的身份认证方式, 所以暂时无法完全代替传统的身份认证方式。

虽然目前存在这些缺点, 但 WebAuthn 作为一种新的身份认证替代方案是值得我们持续关注和学习的, 相信未来会变得更好。
</details>

## 预览

💻 点击链接在线预览: [web-authn.x-dev.club](https://web-authn.x-dev.club)

设备和浏览器要求：
- 以下任一设备
  - 一部 Android 设备（最好带有生物识别传感器）
  - 一部搭载 iOS 14 或更高版本且具备触控 ID 或面容 ID 功能的 iPhone 或 iPad
  - 一部搭载 macOS Big Sur 或更高版本且具备触控 ID 功能的 MacBook Pro 或 Air
  - 设置了 Windows Hello 的 Windows 10 19H1 或更高版本
- 以下任一浏览器
  - Google Chrome 67 或更高版本
  - Microsoft Edge 85 或更高版本
  - Safari 14 或更高版本
  - 更多浏览器兼容性请查看 [Can I use](https://www.yuque.com/r/goto?url=https%3A%2F%2Fcaniuse.com%2F%3Fsearch%3DwebAuthn)

<p align="left">
  <img width="500" src="./preview/WIN10-Microsoft Edge.gif" />
  &emsp;
  <img width="128" src="./preview/Android-Huawei browser.gif" />
</p>

*声明：所有通过 [web-authn.x-dev.club](https://web-authn.x-dev.club) 注册的用户数据不会被使用，仅用于 demo 用户统计，如仍介意可以发邮件到 itgumx@163.com 删除数据*

## 安装

克隆代码后安装依赖项
```
git clone git@github.com:guMcrey/web-authn-completed-app.git
npm install pnpm -g
pnpm install
```

## 本地运行

> ⚠ 为了确保可以正常使用完整功能，建议使用 ngrok 代理到 HTTPS 下体验

**方式1：Client、Server、MySQL 都使用 Docker 镜像**

本地环境准备:
- Docker

```
docker-compose up --build -d
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

浏览器访问：http://localhost:5173

---

**方式2：Client、Server 本地运行，MySQL 使用 Docker 镜像**

本地环境准备:
- Node 16+
- NPM 8+
- Docker

```
docker-compose -f docker-compose-dev.yml up --build -d
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

分别启动 server 和 client 端
```
cd packages/server
pnpm run start:dev

cd ..
cd client
pnpm run dev
```

浏览器访问：http://localhost:5173

---

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

浏览器访问：http://localhost:5173

## 常见问题
- [MySQL 8.0 - Client does not support authentication protocol requested by server; consider upgrading MySQL client](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)

    ```
    ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'Password123#@!';
    flush privileges;
    ```
- http 下创建认证报错
    - 创建认证、验证认证功能仅在支持的浏览器的安全上下文（HTTPS）中可用
- 当访问 http://localhost:5173 时, 如何使用创建认证或验证认证功能呢?
    - 可以使用 [ngrok](https://ngrok.com) 做代理

    ```
    ngrok http 5173
    ```

## 许可证

web-authn-completed-app 是开源项目, 许可证为 [MIT](./LICENSE)
