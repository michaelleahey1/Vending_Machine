-- Consolidated Database Setup - All tables in one database
-- Run this script to create all tables in vending_products_db

CREATE DATABASE IF NOT EXISTS vending_products_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE vending_products_db;

-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admins;

-- Admins table
CREATE TABLE admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    CONSTRAINT chk_balance CHECK (balance >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Product categories table
CREATE TABLE product_categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category_name (category_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products table
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    category_id INT,
    category VARCHAR(50),
    image_url VARCHAR(255),
    sku VARCHAR(50) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_product_name (product_name),
    INDEX idx_category (category),
    INDEX idx_stock (stock_quantity),
    FOREIGN KEY (category_id) REFERENCES product_categories(category_id) ON DELETE SET NULL,
    CONSTRAINT chk_price CHECK (price >= 0),
    CONSTRAINT chk_stock_quantity CHECK (stock_quantity >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Transactions table
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    transaction_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'completed',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_product_id (product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT chk_quantity CHECK (quantity > 0),
    CONSTRAINT chk_total_amount CHECK (total_amount >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin (password: admin123 - SHA256 hashed)
INSERT INTO admins (username, password, email, full_name) VALUES
('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin@vendingmachine.com', 'System Administrator');

-- Insert demo users (password: user123 - SHA256 hashed)
INSERT INTO users (username, password, email, balance, phone_number) VALUES
('demo_user', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'demo@example.com', 50.00, '555-0100'),
('john_doe', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'john@example.com', 25.00, '555-0101'),
('jane_smith', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'jane@example.com', 100.00, '555-0102');

-- Insert categories
INSERT INTO product_categories (category_name, description, display_order) VALUES
('Beverages', 'Soft drinks, water, and beverages', 1),
('Snacks', 'Chips, cookies, and snacks', 2),
('Candy', 'Chocolates and candies', 3),
('Healthy', 'Healthy snacks and drinks', 4),
('Hot Drinks', 'Coffee, tea, and hot chocolate', 5);

-- Insert products
INSERT INTO products (product_name, description, price, stock_quantity, category_id, category, sku) VALUES
-- Beverages
('Coca Cola', 'Classic Coke 330ml', 1.50, 25, 1, 'Beverages', 'BEV-COKE-330'),
('Pepsi', 'Pepsi 330ml', 1.50, 20, 1, 'Beverages', 'BEV-PEPSI-330'),
('Sprite', 'Lemon-lime soda 330ml', 1.50, 22, 1, 'Beverages', 'BEV-SPRITE-330'),
('Water', 'Spring Water 500ml', 1.00, 40, 1, 'Beverages', 'BEV-WATER-500'),
('Orange Juice', 'Fresh orange juice 330ml', 2.25, 15, 1, 'Beverages', 'BEV-OJ-330'),
-- Snacks
('Lays Chips', 'Classic potato chips 40g', 2.00, 30, 2, 'Snacks', 'SNK-LAYS-40'),
('Doritos', 'Nacho cheese tortilla chips', 2.25, 25, 2, 'Snacks', 'SNK-DORI-44'),
('Pringles', 'Original flavor 40g', 2.50, 20, 2, 'Snacks', 'SNK-PRING-40'),
('Pretzels', 'Salted pretzels 50g', 1.75, 22, 2, 'Snacks', 'SNK-PRET-50'),
-- Candy
('Snickers', 'Chocolate bar 50g', 1.50, 35, 3, 'Candy', 'CND-SNICK-50'),
('KitKat', 'Crispy wafer chocolate 42g', 1.50, 32, 3, 'Candy', 'CND-KIT-42'),
('M&Ms', 'Milk chocolate candies 45g', 1.75, 30, 3, 'Candy', 'CND-MMS-45'),
('Reeses', 'Peanut butter cups 42g', 1.75, 28, 3, 'Candy', 'CND-REES-42'),
('Skittles', 'Fruit candies 61g', 1.50, 24, 3, 'Candy', 'CND-SKIT-61'),
-- Healthy
('Granola Bar', 'Oats and honey bar 40g', 1.75, 20, 4, 'Healthy', 'HLT-GRAN-40'),
('Trail Mix', 'Mixed nuts and dried fruit', 2.50, 18, 4, 'Healthy', 'HLT-TRAIL-50'),
('Protein Bar', 'Chocolate protein bar 60g', 3.00, 15, 4, 'Healthy', 'HLT-PROT-60'),
-- Hot Drinks
('Coffee', 'Freshly brewed coffee 12oz', 2.00, 50, 5, 'Hot Drinks', 'HOT-COFF-12'),
('Hot Chocolate', 'Rich hot chocolate 12oz', 2.25, 45, 5, 'Hot Drinks', 'HOT-CHOC-12'),
('Green Tea', 'Premium green tea 12oz', 1.75, 40, 5, 'Hot Drinks', 'HOT-GTEA-12');

SELECT 'Consolidated database created successfully!' AS status;
SELECT CONCAT('Admins: ', COUNT(*)) as summary FROM admins
UNION ALL SELECT CONCAT('Users: ', COUNT(*)) FROM users
UNION ALL SELECT CONCAT('Products: ', COUNT(*)) FROM products
UNION ALL SELECT CONCAT('Categories: ', COUNT(*)) FROM product_categories;

