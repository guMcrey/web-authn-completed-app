# web-authn-completed-app

> WebAuthn completed application, includes client and server.

> docker node steps
  - add Dockerfile
  - add .dockerignore
  - 构建镜像: docker build . -t hakuna/web-authn-completed-app-server
  - 运行镜像: docker run -p 3001:3001 hakuna/web-authn-completed-app-server

> docker mysql steps
  - add docker-compose.yml
  - add database dir
  - docker-compose up --build

> docker client steps
  - add Dockerfile
  - add .dockerignore
  - add nginx.config
  - 添加配置到 docker-compose.yml 中

> common cmd
  - enter docker image details: docker exec -ti a102c38f9e02 /bin/bash
  - view logs: docker logs a102c38f9e02
  - view docker ls: docker container ls
  - use docker compose build docker: docker-compose up --build
  - stop image: docker kill a102c38f9e02

> questions
  - MySQL 8.0 connection/Client does not support authentication protocol requested by server; consider upgrading MySQL client
  https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
  ```
    ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'Password123#@!';
    flush privileges;
    mysql -h127.0.0.1 -uroot -pPassword123#@!
  ```
  - nginx.conf set host
  ```
  proxy_set_header Host $host;
  ```
