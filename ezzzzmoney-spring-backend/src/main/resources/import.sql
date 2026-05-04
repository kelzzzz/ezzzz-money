-- Insert sample users
INSERT INTO users (email, password) VALUES ('user1@example.com', 'password123');
INSERT INTO users (email, password) VALUES ('user2@example.com', 'password456');

-- Insert sample expenses for user1
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Paycheck', 2400.00, 'Income', '2026-05-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Grocery Store', 87.50, 'Groceries', '2026-05-01', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Netflix', 15.99, 'Subscriptions', '2026-04-30', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Restaurant', 42.00, 'Dining', '2026-04-29', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Freelance Payment', 500.00, 'Income', '2026-04-28', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (1, 'Electric Bill', 110.00, 'Utilities', '2026-04-28', 'expense');

-- Insert sample expenses for user2
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Salary', 3000.00, 'Income', '2026-05-01', 'income');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Amazon Shopping', 125.75, 'Shopping', '2026-05-01', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Gas', 55.30, 'Transportation', '2026-04-30', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Coffee', 6.50, 'Dining', '2026-04-30', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Gym Membership', 50.00, 'Health', '2026-04-28', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Water Bill', 65.00, 'Utilities', '2026-04-27', 'expense');
INSERT INTO expenses (user_id, description, amount, category, date, type) VALUES (2, 'Bonus', 750.00, 'Income', '2026-04-25', 'income');
