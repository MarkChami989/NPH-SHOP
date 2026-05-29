-- 🚀 1. Khla2 l-database real taba3 l-shop
CREATE DATABASE IF NOT EXISTS nph_shop_db;

-- 2. Target load l-schema l-jdidé dghré
USE nph_shop_db;

-- 3. Khla2 table l-users relational structure kamil
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nph_id VARCHAR(20) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    number VARCHAR(20) NOT NULL,
    location VARCHAR(100) NOT NULL,
    wishlistCount INT DEFAULT 0
);
USE nph_shop_db;

-- 🧹 M7é l-old tables kermel n-fukk ayya mismatch structural columns
DROP TABLE IF EXISTS alfa_mtc_orders;
DROP TABLE IF EXISTS recharges;

-- 🚀 1. Khla2 table l-recharges structural complete
CREATE TABLE recharges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    provider VARCHAR(20) NOT NULL,
    price VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🚀 2. Khla2 table l-alfa_mtc_orders dynamic trace complete
CREATE TABLE alfa_mtc_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(30) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    provider VARCHAR(20) NOT NULL,
    price VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'Completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS terminal_activities;
CREATE TABLE terminal_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) DEFAULT 'system',
    type VARCHAR(50) NOT NULL,
    details VARCHAR(255) NOT NULL,
    target VARCHAR(100) DEFAULT 'N/A',
    status VARCHAR(50) DEFAULT 'success',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;