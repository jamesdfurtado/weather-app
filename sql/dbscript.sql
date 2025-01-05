create database db;
use db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    pword VARCHAR(255) NOT NULL
);

CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    location VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


show databases;
show tables;

describe users;
SELECT * FROM users;

DESCRIBE locations;
SELECT * FROM locations;

