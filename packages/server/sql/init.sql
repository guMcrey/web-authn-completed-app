CREATE TABLE IF NOT EXISTS `user`(
  `id` VARCHAR(72) NOT NULL,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `createTime` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`, `username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `credential`(
    `credId` VARCHAR(172) NOT NULL,
    `username` VARCHAR(16) NOT NULL,
    `publicKey` TEXT NOT NULL,
    `prevCounter` INT UNSIGNED,
    `deviceName` VARCHAR(128),
    `createTime` VARCHAR(32) NOT NULL,
    PRIMARY KEY(`credId`)
)ENGINE = InnoDB DEFAULT CHARSET = utf8;