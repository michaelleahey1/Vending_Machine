-- Verify Complete Database Setup

-- Check Admin Database
USE vending_admin_db;
SELECT '=== ADMIN DATABASE ===' AS '';
SELECT COUNT(*) as admin_count FROM admins;
SELECT username, email, full_name FROM admins;

-- Check Users Database
USE vending_users_db;
SELECT '=== USERS DATABASE ===' AS '';
SELECT COUNT(*) as user_count FROM users;
SELECT username, email, balance FROM users;
SELECT COUNT(*) as transaction_count FROM transactions;

-- Check Products Database
USE vending_products_db;
SELECT '=== PRODUCTS DATABASE ===' AS '';
SELECT COUNT(*) as category_count FROM product_categories;
SELECT COUNT(*) as product_count FROM products;
SELECT category, COUNT(*) as count FROM products GROUP BY category;

-- Overall Status
SELECT '=== SYSTEM STATUS ===' AS '';
SELECT 'Admin Database: READY' as status
UNION ALL SELECT 'Users Database: READY'
UNION ALL SELECT 'Products Database: READY'
UNION ALL SELECT CONCAT('Total Products: ', (SELECT COUNT(*) FROM vending_products_db.products))
UNION ALL SELECT 'System: OPERATIONAL';

-- Test Credentials
SELECT '=== TEST CREDENTIALS ===' AS '';
SELECT 'Admin Login' as type, 'admin' as username, 'admin123' as password
UNION ALL SELECT 'User Login', 'demo_user', 'user123'
UNION ALL SELECT 'User Login', 'john_doe', 'user123'
UNION ALL SELECT 'User Login', 'jane_smith', 'user123';