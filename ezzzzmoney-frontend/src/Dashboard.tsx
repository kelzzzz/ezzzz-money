import React, { useState } from 'react';
import './Dashboard.css';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface BudgetCategory {
  name: string;
  spent: number;
  limit: number;
  color: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 1, description: 'Paycheck', amount: 2400, category: 'Income', date: 'May 1', type: 'income' },
  { id: 2, description: 'Grocery Store', amount: 87.5, category: 'Groceries', date: 'May 1', type: 'expense' },
  { id: 3, description: 'Netflix', amount: 15.99, category: 'Subscriptions', date: 'Apr 30', type: 'expense' },
  { id: 4, description: 'Restaurant', amount: 42.0, category: 'Dining', date: 'Apr 29', type: 'expense' },
  { id: 5, description: 'Freelance Payment', amount: 500, category: 'Income', date: 'Apr 28', type: 'income' },
  { id: 6, description: 'Electric Bill', amount: 110, category: 'Utilities', date: 'Apr 28', type: 'expense' },
];

const BUDGET_CATEGORIES: BudgetCategory[] = [
  { name: 'Groceries', spent: 220, limit: 300, color: '#34d399' },
  { name: 'Dining', spent: 180, limit: 200, color: '#fbbf24' },
  { name: 'Shopping', spent: 310, limit: 250, color: '#f87171' },
  { name: 'Utilities', spent: 110, limit: 150, color: '#34d399' },
];

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'records'>('overview');
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [newEntry, setNewEntry] = useState({ description: '', amount: '', category: '', type: 'expense' as 'income' | 'expense' });

  const healthScore = 72;
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const scoreColor = healthScore >= 70 ? '#34d399' : healthScore >= 40 ? '#fbbf24' : '#f87171';
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (healthScore / 100) * circumference;

  const getBudgetColor = (spent: number, limit: number) => {
    const pct = spent / limit;
    if (pct >= 1) return '#f87171';
    if (pct >= 0.8) return '#fbbf24';
    return '#34d399';
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.description || !newEntry.amount) return;
    const entry: Transaction = {
      id: Date.now(),
      description: newEntry.description,
      amount: parseFloat(newEntry.amount),
      category: newEntry.category || 'Other',
      date: 'Today',
      type: newEntry.type,
    };
    setTransactions([entry, ...transactions]);
    setNewEntry({ description: '', amount: '', category: '', type: 'expense' });
    setShowAddForm(false);
  };

  return (
    <div className="dash-page">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-logo">
          <span>💸</span>
          <span className="dash-logo-text">EzzzMoney</span>
        </div>
        <nav className="dash-nav">
          <button
            className={`dash-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="dash-nav-icon">📊</span> Overview
          </button>
          <button
            className={`dash-nav-item ${activeTab === 'records' ? 'active' : ''}`}
            onClick={() => setActiveTab('records')}
          >
            <span className="dash-nav-icon">📋</span> Records
          </button>
          <button className="dash-nav-item placeholder">
            <span className="dash-nav-icon">📅</span> Bills
          </button>
          <button className="dash-nav-item placeholder">
            <span className="dash-nav-icon">📈</span> Investments
          </button>
          <button className="dash-nav-item placeholder">
            <span className="dash-nav-icon">🔔</span> Alerts
          </button>
        </nav>
        <button className="dash-logout" onClick={onLogout}>Sign Out</button>
      </aside>

      {/* Main Content */}
      <main className="dash-main">
        {activeTab === 'overview' && (
          <>
            <div className="dash-header">
              <h2 className="dash-title">Good morning 👋</h2>
              <p className="dash-subtitle">Here's your financial snapshot for May 2026</p>
            </div>

            <div className="dash-grid">
              {/* Health Score */}
              <div className="dash-card score-card">
                <h3 className="dash-card-title">Financial Health Score</h3>
                <div className="score-ring-wrap">
                  <svg className="score-ring" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#1f2937" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="54" fill="none"
                      stroke={scoreColor} strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="score-number" style={{ color: scoreColor }}>{healthScore}</div>
                </div>
                <p className="score-label" style={{ color: scoreColor }}>
                  {healthScore >= 70 ? '✅ Healthy' : healthScore >= 40 ? '⚠️ Caution' : '🚨 At Risk'}
                </p>
              </div>

              {/* Cash Flow */}
              <div className="dash-card cashflow-card">
                <h3 className="dash-card-title">Cash Flow — May</h3>
                <div className="cashflow-row">
                  <div className="cashflow-item income">
                    <span className="cashflow-label">Income</span>
                    <span className="cashflow-amount">+${totalIncome.toLocaleString()}</span>
                  </div>
                  <div className="cashflow-divider" />
                  <div className="cashflow-item expense">
                    <span className="cashflow-label">Expenses</span>
                    <span className="cashflow-amount">−${totalExpenses.toLocaleString()}</span>
                  </div>
                </div>
                <div className="cashflow-net">
                  <span>Net</span>
                  <span className={totalIncome - totalExpenses >= 0 ? 'positive' : 'negative'}>
                    ${(totalIncome - totalExpenses).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Budget */}
              <div className="dash-card budget-card">
                <h3 className="dash-card-title">Budget Tracker</h3>
                <div className="budget-list">
                  {BUDGET_CATEGORIES.map(cat => {
                    const pct = Math.min((cat.spent / cat.limit) * 100, 100);
                    const col = getBudgetColor(cat.spent, cat.limit);
                    return (
                      <div className="budget-item" key={cat.name}>
                        <div className="budget-meta">
                          <span className="budget-name">{cat.name}</span>
                          <span className="budget-amounts">${cat.spent} / ${cat.limit}</span>
                        </div>
                        <div className="budget-bar-bg">
                          <div className="budget-bar-fill" style={{ width: `${pct}%`, background: col }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="dash-card recent-card">
                <h3 className="dash-card-title">Recent Transactions</h3>
                <div className="recent-list">
                  {transactions.slice(0, 5).map(t => (
                    <div className="recent-item" key={t.id}>
                      <div className="recent-info">
                        <span className="recent-desc">{t.description}</span>
                        <span className="recent-cat">{t.category} · {t.date}</span>
                      </div>
                      <span className={`recent-amount ${t.type}`}>
                        {t.type === 'income' ? '+' : '−'}${t.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'records' && (
          <>
            <div className="dash-header records-header">
              <div>
                <h2 className="dash-title">Financial Records</h2>
                <p className="dash-subtitle">Track your income and expenses</p>
              </div>
              <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
                + Add Entry
              </button>
              <select
                className="add-input"
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                style={{ marginRight: '10px' }}
              >
                <option value="All">All Categories</option>
                {BUDGET_CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            {showAddForm && (
              <div className="dash-card add-form-card">
                <h3 className="dash-card-title">New Entry</h3>
                <form className="add-form" onSubmit={handleAddEntry}>
                  <div className="add-form-row">
                    <div className="add-field">
                      <label className="add-label">Type</label>
                      <select
                        className="add-input"
                        value={newEntry.type}
                        onChange={e => setNewEntry({ ...newEntry, type: e.target.value as 'income' | 'expense' })}
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                    <div className="add-field">
                      <label className="add-label">Description</label>
                      <input
                        className="add-input"
                        placeholder="e.g. Grocery Store"
                        value={newEntry.description}
                        onChange={e => setNewEntry({ ...newEntry, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="add-field">
                      <label className="add-label">Amount ($)</label>
                      <input
                        className="add-input"
                        type="number"
                        placeholder="0.00"
                        value={newEntry.amount}
                        onChange={e => setNewEntry({ ...newEntry, amount: e.target.value })}
                        required
                      />
                    </div>
                    <div className="add-field">
                      <label className="add-label">Category</label>
                      {newEntry.type === 'income' ? (
                        <input
                          className="add-input"
                          value="Income"
                          disabled
                          style={{ opacity: 0.5 }}
                        />
                      ) : (
                        <select
                          className="add-input"
                          value={newEntry.category}
                          onChange={e => setNewEntry({ ...newEntry, category: e.target.value })}
                        >
                          <option value="">Select a category</option>
                          {BUDGET_CATEGORIES.map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="add-form-actions">
                    <button type="submit" className="add-submit-btn">Save Entry</button>
                    <button type="button" className="add-cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="dash-card records-card">
              <div className="records-table">
                <div className="records-thead">
                  <span>Description</span>
                  <span>Category</span>
                  <span>Date</span>
                  <span>Amount</span>
                </div>
                {transactions.filter(t => filterCategory === 'All' || t.category === filterCategory).map(t => (
                  <div className="records-row" key={t.id}>
                    <span className="records-desc">{t.description}</span>
                    <span className="records-cat-badge">{t.category}</span>
                    <span className="records-date">{t.date}</span>
                    <span className={`records-amount ${t.type}`}>
                      {t.type === 'income' ? '+' : '−'}${t.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
