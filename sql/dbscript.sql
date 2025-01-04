create database db;
use db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    pword VARCHAR(255) NOT NULL
);

show databases;
show tables;

describe users;

SELECT * FROM users;
