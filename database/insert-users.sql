-- Insert users and admins into vending_products_db
-- Run this script to add test users if they don't exist

USE vending_products_db;

-- Insert admin if not exists (password: admin123 - SHA256 hashed)
INSERT IGNORE INTO admins (username, password, email, full_name, is_active) VALUES
('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin@vendingmachine.com', 'System Administrator', TRUE);

-- Insert users if not exists (password: user123 - SHA256 hashed)
INSERT IGNORE INTO users (username, password, email, balance, phone_number, is_active) VALUES
('demo_user', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'demo@example.com', 50.00, '555-0100', TRUE),
('john_doe', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'john@example.com', 25.00, '555-0101', TRUE),
('jane_smith', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'jane@example.com', 100.00, '555-0102', TRUE);

-- Verify inserts
SELECT 'Admins:' AS '', COUNT(*) as count FROM admins
UNION ALL SELECT 'Users:', COUNT(*) FROM users;

SELECT username, email, balance FROM users;
SELECT username, email FROM admins;

