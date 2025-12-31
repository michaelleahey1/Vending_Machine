# Quick Fix: Database User Setup

## Problem
The backend is running but login fails with "Invalid username or password" because the database doesn't have user data yet.

## Solution

### Option 1: Run MySQL Command (Easiest)
Open Command Prompt or PowerShell and run:

```cmd
mysql -u root -pNotreDame@1 vending_products_db < database\insert-users.sql
```

### Option 2: Run Full Database Script
If you want to set up everything from scratch:

```cmd
mysql -u root -pNotreDame@1 < database\0_consolidated_database.sql
```

### Option 3: Manual SQL Execution
1. Open MySQL Command Line Client or MySQL Workbench
2. Connect to your MySQL server
3. Run these commands:

```sql
USE vending_products_db;

-- Insert admin (password: admin123)
INSERT IGNORE INTO admins (username, password, email, full_name, is_active) VALUES
('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin@vendingmachine.com', 'System Administrator', TRUE);

-- Insert users (password: user123)
INSERT IGNORE INTO users (username, password, email, balance, phone_number, is_active) VALUES
('demo_user', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'demo@example.com', 50.00, '555-0100', TRUE),
('john_doe', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'john@example.com', 25.00, '555-0101', TRUE),
('jane_smith', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'jane@example.com', 100.00, '555-0102', TRUE);
```

## Test Credentials

After running the script, you can login with:

- **Admin**: username `admin`, password `admin123`
- **User**: username `demo_user`, password `user123`

## Verify Setup

After inserting users, refresh your browser and try logging in again. The login should work!

