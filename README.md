# web-authn-completed-app

English | [简体中文](./README.zh-CN.md)

> web-authn-completed-app is a complete application based on [SimpleWebAuthn](https://simplewebauthn.dev/docs/). It allows websites to authenticate users using built-in authenticators such as Apple TouchID and Windows Hello or mobile device biometric; it can replace conventional verification methods such as passwords or SMS verification codes, and provide users with a more secure and easy login experience.

## About

This monorepo project contains code of client and server
- [client](./packages/client/README.md)
- [server](./packages/server/README.md)

*For more information about client and server, please check the README of the module*

## Overview

💻 overview online demo: [web-authn-completed-app](https://1bb8-240e-305-1b82-ae4d-703b-ca1e-d729-14c5.jp.ngrok.io)

## Install

Install dependencies after cloning the code
```
git clone git@github.com:guMcrey/web-authn-completed-app.git
npm install pnpm -g
pnpm install
```

## Development

> ⚠ In order to ensure that the full functionality can be used normally, it is recommended to use ngrok proxy to experience under HTTPS

**1. Client, Server, and MySQL all use Docker images**

Local environment preparation:
- Docker

```
docker-compose up --build -d
docker container ls
docker exec -ti <mysql-container-id> /bin/bash
mysql -h127.0.0.1 -uroot -pPassword123#@!

show databases;
use web_authn_demo;
```

Create a database table:
```
# Paste the content of packages/server/sql/init.sql into the command line of the mysql container
show tables;
```

Browser access：http://localhost:5173

---

**2：Client and Server run locally, MySQL uses Docker image**

Local environment preparation:
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

Create a database table:
```
# Paste the content of packages/server/sql/init.sql into the command line of the mysql container
show tables;
```

Start the server and client
```
cd packages/server
pnpm run start:dev

cd ..
cd client
pnpm run dev
```

Browser access：http://localhost:5173

---

**3：Client, Server, and MySQL all run locally**

Local environment preparation:
- Node 16+
- NPM 8+
- MySQL 8+

Start the server and client
```
cd packages/server
pnpm run start:dev

cd ..
cd client
pnpm run dev
```

Connect to mysql
```
# Please modify the username and password as needed
mysql -h127.0.0.1 -uroot -pPassword123#@!
```

Create database tables
```
# Paste the contents of packages/server/sql/init.sql into the mysql command line
show tables;
```

Browser access：http://localhost:5173

## FAQ

- [MySQL 8.0 - Client does not support authentication protocol requested by server; consider upgrading MySQL client](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)

    ```
    ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'Password123#@!';
    flush privileges;
    ```
- Create authentication error under http
     - Create certificate, verify certificate functions are only available in the security context (HTTPS) of supported browsers
- When accessing http://localhost:5173, how to use the function of creating authentication or verifying authentication?
     - You can use [ngrok](https://ngrok.com) as a proxy

    ```
    ngrok http 5173
    ```

## License

is an open source project, licensed at [MIT](./LICENSE)
