CREATE DATABASE mern_db;
use mern_db;
CREATE TABLE product(
id INT(11) PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(200),
price DOUBLE,
stock double,
createdAt DATE,
updatedAt DATE
)ENGINE=INNODB;

select * from account;

drop table account;

CREATE TABLE account(
id int primary key auto_increment,
email varchar(40) not null,
password varchar(40) not null,
createdAt DATE,
updatedAt DATE
)ENGINE=INNODB;