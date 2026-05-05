-- Insert sample users
INSERT INTO users (email, password) VALUES ('user1@example.com', 'password123');
INSERT INTO users (email, password) VALUES ('user2@example.com', 'password456');

-- January transactions for user1
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Paycheck', 2400.00, 'Income', '2026-01-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Grocery Store', 95.50, 'Groceries', '2026-01-02', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Whole Foods', 67.30, 'Groceries', '2026-01-05', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Coffee Shop', 22.00, 'Dining', '2026-01-06', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Restaurant Dinner', 65.40, 'Dining', '2026-01-08', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Electric Bill', 125.00, 'Utilities', '2026-01-10', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Amazon Shopping', 189.99, 'Shopping', '2026-01-12', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Freelance Payment', 600.00, 'Income', '2026-01-15', 'income');

-- February transactions for user1
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Paycheck', 2400.00, 'Income', '2026-02-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Grocery Store', 102.75, 'Groceries', '2026-02-02', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Netflix', 15.99, 'Subscriptions', '2026-02-03', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Restaurant', 48.50, 'Dining', '2026-02-07', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Target Shopping', 156.20, 'Shopping', '2026-02-10', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Water Bill', 68.00, 'Utilities', '2026-02-12', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Gas Station', 52.30, 'Transportation', '2026-02-15', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Freelance Payment', 550.00, 'Income', '2026-02-20', 'income');

-- March transactions for user1
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Paycheck', 2400.00, 'Income', '2026-03-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Costco', 145.80, 'Groceries', '2026-03-03', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Lunch', 18.75, 'Dining', '2026-03-05', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Amazon', 234.99, 'Shopping', '2026-03-08', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Electric Bill', 138.00, 'Utilities', '2026-03-11', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Dinner', 72.50, 'Dining', '2026-03-14', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Freelance Payment', 700.00, 'Income', '2026-03-18', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Gym Membership', 50.00, 'Health', '2026-03-20', 'expense');

-- April transactions for user1
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Paycheck', 2400.00, 'Income', '2026-04-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Grocery Store', 87.50, 'Groceries', '2026-04-02', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Netflix', 15.99, 'Subscriptions', '2026-04-03', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Restaurant', 42.00, 'Dining', '2026-04-05', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Target', 98.40, 'Shopping', '2026-04-08', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Electric Bill', 110.00, 'Utilities', '2026-04-10', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Gas', 45.75, 'Transportation', '2026-04-12', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Freelance Payment', 500.00, 'Income', '2026-04-15', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Coffee', 12.50, 'Dining', '2026-04-18', 'expense');

-- May transactions for user1
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Paycheck', 2400.00, 'Income', '2026-05-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Grocery Store', 92.30, 'Groceries', '2026-05-02', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Dining Out', 55.80, 'Dining', '2026-05-03', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Amazon', 127.45, 'Shopping', '2026-05-05', 'expense');

-- January transactions for user2
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Salary', 3000.00, 'Income', '2026-01-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Costco', 165.00, 'Groceries', '2026-01-03', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Amazon Shopping', 215.99, 'Shopping', '2026-01-05', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Gas', 62.00, 'Transportation', '2026-01-07', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Restaurant', 85.20, 'Dining', '2026-01-09', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Gym Membership', 50.00, 'Health', '2026-01-11', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Water Bill', 72.50, 'Utilities', '2026-01-15', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Bonus', 800.00, 'Income', '2026-01-20', 'income');

-- February transactions for user2
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Salary', 3000.00, 'Income', '2026-02-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Grocery Depot', 142.75, 'Groceries', '2026-02-02', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Target', 189.50, 'Shopping', '2026-02-04', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Coffee Shop', 28.40, 'Dining', '2026-02-06', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Electric Bill', 145.00, 'Utilities', '2026-02-08', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Gas Station', 58.30, 'Transportation', '2026-02-10', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Netflix', 15.99, 'Subscriptions', '2026-02-12', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Freelance Gig', 400.00, 'Income', '2026-02-18', 'income');

-- March transactions for user2
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Salary', 3000.00, 'Income', '2026-03-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Whole Foods', 124.60, 'Groceries', '2026-03-03', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Amazon', 267.89, 'Shopping', '2026-03-05', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Dinner Date', 98.50, 'Dining', '2026-03-07', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Gas', 54.20, 'Transportation', '2026-03-09', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Gym Membership', 50.00, 'Health', '2026-03-11', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Water Bill', 68.00, 'Utilities', '2026-03-14', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Freelance Gig', 500.00, 'Income', '2026-03-20', 'income');

-- April transactions for user2
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Salary', 3000.00, 'Income', '2026-04-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Costco', 156.30, 'Groceries', '2026-04-02', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Amazon Shopping', 125.75, 'Shopping', '2026-04-04', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Gas', 55.30, 'Transportation', '2026-04-06', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Coffee', 6.50, 'Dining', '2026-04-07', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Restaurant', 74.25, 'Dining', '2026-04-10', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Electric Bill', 138.00, 'Utilities', '2026-04-12', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Freelance Gig', 450.00, 'Income', '2026-04-18', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Shopping', 98.70, 'Shopping', '2026-04-25', 'expense');

-- May transactions for user2
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Salary', 3000.00, 'Income', '2026-05-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Grocery Store', 138.50, 'Groceries', '2026-05-02', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Target', 104.30, 'Shopping', '2026-05-03', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Gas', 51.75, 'Transportation', '2026-05-04', 'expense');
