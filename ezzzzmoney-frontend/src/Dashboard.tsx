import React, { useState, useEffect, useMemo } from 'react';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { expenseService } from './Api';

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

const DEFAULT_BUDGET_CATEGORIES: BudgetCategory[] = [
  { name: 'Groceries', spent: 220, limit: 300, color: '#34d399' },
  { name: 'Dining', spent: 180, limit: 200, color: '#fbbf24' },
  { name: 'Shopping', spent: 310, limit: 250, color: '#f87171' },
  { name: 'Utilities', spent: 110, limit: 150, color: '#34d399' },
];

interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'alerts'>('overview');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [newEntry, setNewEntry] = useState({ description: '', amount: '', category: '', type: 'expense' as 'income' | 'expense' });
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [alertSettings, setAlertSettings] = useState({
    budgetWarnings: true,
    budgetWarningPct: 80,
    largeTransactionAlerts: true,
    largeTransactionAmount: 500,
    lowBalanceAlerts: true,
  });
  const [thresholdDraft, setThresholdDraft] = useState({
    budgetWarningPct: '80',
    largeTransactionAmount: '500',
  });

  // Budget state
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(DEFAULT_BUDGET_CATEGORIES);
  const [editingBudget, setEditingBudget] = useState<string | null>(null);
  const [editLimitValue, setEditLimitValue] = useState<string>('');
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({ name: '', limit: '' });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await expenseService.getExpensesByUser(parseInt(userId!));
      const expenses = response.data.map((exp: any) => ({
        id: exp.id,
        description: exp.description,
        amount: exp.amount,
        category: exp.category,
        date: exp.date,
        type: exp.type,
      }));
      setTransactions(expenses.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const healthScore = 72;
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const scoreColor = healthScore >= 70 ? '#34d399' : healthScore >= 40 ? '#fbbf24' : '#f87171';
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (healthScore / 100) * circumference;

  const getChartData = () => {
    const monthlyData: { [key: string]: { income: number; expenses: number } } = {
      'Jan': { income: 0, expenses: 0 },
      'Feb': { income: 0, expenses: 0 },
      'Mar': { income: 0, expenses: 0 },
      'Apr': { income: 0, expenses: 0 },
      'May': { income: 0, expenses: 0 },
    };

    transactions.forEach(t => {
      const date = new Date(t.date);
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
      if (monthlyData[month]) {
        if (t.type === 'income') {
          monthlyData[month].income += t.amount;
        } else {
          monthlyData[month].expenses += t.amount;
        }
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: Math.round(data.income * 100) / 100,
      expenses: Math.round(data.expenses * 100) / 100,
    }));
  };

  const CHART_DATA = getChartData();

  const getBudgetColor = (spent: number, limit: number) => {
    const pct = spent / limit;
    if (pct >= 1) return '#f87171';
    if (pct >= 0.8) return '#fbbf24';
    return '#34d399';
  };

  const formatRelativeTime = (dateStr: string): string => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return '1d ago';
    return `${diffDays}d ago`;
  };

  const alerts = useMemo<AlertItem[]>(() => {
    const generated: AlertItem[] = [];

    if (alertSettings.budgetWarnings) {
      budgetCategories.forEach(cat => {
        const pct = (cat.spent / cat.limit) * 100;
        if (pct >= 100) {
          generated.push({
            id: `budget-exceeded-${cat.name}`,
            severity: 'critical',
            message: `${cat.name} budget exceeded by $${(cat.spent - cat.limit).toFixed(0)}`,
            timestamp: 'Now',
          });
        } else if (pct >= alertSettings.budgetWarningPct) {
          generated.push({
            id: `budget-warning-${cat.name}`,
            severity: 'warning',
            message: `${cat.name} at ${Math.round(pct)}% — approaching limit`,
            timestamp: 'Now',
          });
        }
      });
    }

    if (alertSettings.largeTransactionAlerts && alertSettings.largeTransactionAmount > 0) {
      transactions
        .filter(t => t.type === 'expense' && t.amount >= alertSettings.largeTransactionAmount)
        .forEach(t => {
          generated.push({
            id: `large-txn-${t.id}`,
            severity: 'warning',
            message: `Large expense: ${t.description} — $${t.amount.toFixed(0)}`,
            timestamp: formatRelativeTime(t.date),
          });
        });
    }

    if (alertSettings.lowBalanceAlerts && totalExpenses > totalIncome && totalIncome > 0) {
      generated.push({
        id: 'low-balance',
        severity: 'warning',
        message: `Expenses exceed income by $${(totalExpenses - totalIncome).toFixed(0)} this month`,
        timestamp: 'Now',
      });
    }

    transactions
      .filter(t => t.type === 'income')
      .slice(0, 3)
      .forEach(t => {
        generated.push({
          id: `income-${t.id}`,
          severity: 'info',
          message: `${t.description} — $${t.amount.toFixed(0)} received`,
          timestamp: formatRelativeTime(t.date),
        });
      });

    return generated.filter(a => !dismissedAlerts.has(a.id));
  }, [transactions, alertSettings, dismissedAlerts, totalIncome, totalExpenses, budgetCategories]);

  const newAlertCount = alerts.filter(a => a.severity !== 'info').length;

  const dismissAlert = (id: string) => {
    setDismissedAlerts(prev => new Set(prev).add(id));
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.description || !newEntry.amount || !userId) return;
    
    try {
      const newExpense = {
        description: newEntry.description,
        amount: parseFloat(newEntry.amount),
        category: newEntry.type === 'income' ? 'Income' : (newEntry.category || 'Other'),
        date: new Date().toISOString().split('T')[0],
        type: newEntry.type,
      };
      
      await expenseService.createExpense(parseInt(userId), newExpense);
      setNewEntry({ description: '', amount: '', category: '', type: 'expense' });
      setShowAddForm(false);
      fetchExpenses();
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const handleDeleteExpense = async (expenseId: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(expenseId);
        fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  // Budget handlers
  const handleEditBudget = (catName: string, currentLimit: number) => {
    setEditingBudget(catName);
    setEditLimitValue(String(currentLimit));
  };

  const handleSaveBudgetLimit = (catName: string) => {
    const parsed = parseFloat(editLimitValue);
    if (isNaN(parsed) || parsed <= 0) return;
    setBudgetCategories(prev =>
      prev.map(cat =>
        cat.name === catName ? { ...cat, limit: parsed } : cat
      )
    );
    setEditingBudget(null);
    setEditLimitValue('');
  };

  const handleDeleteBudget = (catName: string) => {
    setBudgetCategories(prev => prev.filter(cat => cat.name !== catName));
  };

  const handleAddBudgetCategory = () => {
    if (!newBudget.name.trim() || !newBudget.limit) return;
    const parsed = parseFloat(newBudget.limit);
    if (isNaN(parsed) || parsed <= 0) return;
    const newCat: BudgetCategory = {
      name: newBudget.name.trim(),
      spent: 0,
      limit: parsed,
      color: '#34d399',
    };
    setBudgetCategories(prev => [...prev, newCat]);
    setNewBudget({ name: '', limit: '' });
    setShowAddBudget(false);
  };

  return (
    <div className="dash-page">
      <aside className="dash-sidebar">
        <div className="dash-logo">
          <span>💸</span>
          <span className="dash-logo-text">EzzzMoney</span>
        </div>
        <nav className="dash-nav">
          <button className={`dash-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <span className="dash-nav-icon">📊</span> Overview
          </button>
          <button className={`dash-nav-item ${activeTab === 'records' ? 'active' : ''}`} onClick={() => setActiveTab('records')}>
            <span className="dash-nav-icon">📋</span> Records
          </button>
          <button className="dash-nav-item placeholder">
            <span className="dash-nav-icon">📅</span> Bills
          </button>
          <button className="dash-nav-item placeholder">
            <span className="dash-nav-icon">📈</span> Investments
          </button>
          <button
            className={`dash-nav-item ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            <span className="dash-nav-icon">🔔</span> Alerts
            {newAlertCount > 0 && <span className="dash-nav-badge">{newAlertCount}</span>}
          </button>
        </nav>
        <button className="dash-logout" onClick={onLogout}>Sign Out</button>
      </aside>

      <main className="dash-main">
        {activeTab === 'overview' && (
          <>
            <div className="dash-header">
              <h2 className="dash-title">Good morning 👋</h2>
              <p className="dash-subtitle">Here's your financial snapshot for May 2026</p>
            </div>

            <div className="dash-grid">
              <div className="dash-card score-card">
                <h3 className="dash-card-title">Financial Health Score</h3>
                <div className="score-ring-wrap">
                  <svg className="score-ring" viewBox="0 0 120 120">[[[]]]
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#1f2937" strokeWidth="10" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke={scoreColor} strokeWidth="10"
                      strokeDasharray={circumference} strokeDashoffset={dashOffset}
                      strokeLinecap="round" transform="rotate(-90 60 60)" />
                  </svg>
                  <div className="score-number" style={{ color: scoreColor }}>{healthScore}</div>
                </div>
                <p className="score-label" style={{ color: scoreColor }}>
                  {healthScore >= 70 ? '✅ Healthy' : healthScore >= 40 ? '⚠️ Caution' : '🚨 At Risk'}
                </p>
              </div>

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

              {/* BUDGET TRACKER - updated with edit/add functionality */}
              <div className="dash-card budget-card">
                <div className="budget-header">
                  <h3 className="dash-card-title" style={{ margin: 0 }}>Budget Tracker</h3>
                  <button className="budget-add-btn" onClick={() => setShowAddBudget(!showAddBudget)}>+ Add</button>
                </div>

                {showAddBudget && (
                  <div className="budget-add-form">
                    <input
                      className="budget-edit-input"
                      placeholder="Category name"
                      value={newBudget.name}
                      onChange={e => setNewBudget({ ...newBudget, name: e.target.value })}
                    />
                    <input
                      className="budget-edit-input"
                      type="number"
                      placeholder="Limit ($)"
                      value={newBudget.limit}
                      onChange={e => setNewBudget({ ...newBudget, limit: e.target.value })}
                    />
                    <div className="budget-edit-actions">
                      <button className="budget-save-btn" onClick={handleAddBudgetCategory}>Add</button>
                      <button className="budget-cancel-btn" onClick={() => { setShowAddBudget(false); setNewBudget({ name: '', limit: '' }); }}>Cancel</button>
                    </div>
                  </div>
                )}

                <div className="budget-list">
                  {budgetCategories.map(cat => {
                    const pct = Math.min((cat.spent / cat.limit) * 100, 100);
                    const col = getBudgetColor(cat.spent, cat.limit);
                    const isEditing = editingBudget === cat.name;
                    return (
                      <div className="budget-item" key={cat.name}>
                        <div className="budget-meta">
                          <span className="budget-name">{cat.name}</span>
                          <div className="budget-actions">
                            {isEditing ? (
                              <div className="budget-edit-row">
                                <span className="budget-spent-label">${cat.spent} / </span>
                                <input
                                  className="budget-edit-input small"
                                  type="number"
                                  value={editLimitValue}
                                  onChange={e => setEditLimitValue(e.target.value)}
                                  autoFocus
                                />
                                <button className="budget-save-btn" onClick={() => handleSaveBudgetLimit(cat.name)}>✓</button>
                                <button className="budget-cancel-btn" onClick={() => setEditingBudget(null)}>✕</button>
                              </div>
                            ) : (
                              <div className="budget-right">
                                <span className="budget-amounts">${cat.spent} / ${cat.limit}</span>
                                <button className="budget-icon-btn" onClick={() => handleEditBudget(cat.name, cat.limit)} title="Edit limit">✏️</button>
                                <button className="budget-icon-btn delete" onClick={() => handleDeleteBudget(cat.name)} title="Delete">🗑️</button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="budget-bar-bg">
                          <div className="budget-bar-fill" style={{ width: `${pct}%`, background: col }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

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

              <div className="dash-card chart-card">
                <h3 className="dash-card-title">Income vs Expenses</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={CHART_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb' }} />
                    <Legend wrapperStyle={{ color: '#9ca3af', fontSize: 13 }} />
                    <Bar dataKey="income" fill="#34d399" radius={[4, 4, 0, 0]} name="Income" />
                    <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
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
              <select className="add-input" value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ marginRight: '10px' }}>
                <option value="All">All Categories</option>
                {budgetCategories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>+ Add Entry</button>
            </div>

            {showAddForm && (
              <div className="dash-card add-form-card">
                <h3 className="dash-card-title">New Entry</h3>
                <form className="add-form" onSubmit={handleAddEntry}>
                  <div className="add-form-row">
                    <div className="add-field">
                      <label className="add-label">Type</label>
                      <select className="add-input" value={newEntry.type} onChange={e => setNewEntry({ ...newEntry, type: e.target.value as 'income' | 'expense' })}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                    <div className="add-field">
                      <label className="add-label">Description</label>
                      <input className="add-input" placeholder="e.g. Grocery Store" value={newEntry.description} onChange={e => setNewEntry({ ...newEntry, description: e.target.value })} required />
                    </div>
                    <div className="add-field">
                      <label className="add-label">Amount ($)</label>
                      <input className="add-input" type="number" placeholder="0.00" value={newEntry.amount} onChange={e => setNewEntry({ ...newEntry, amount: e.target.value })} required />
                    </div>
                    <div className="add-field">
                      <label className="add-label">Category</label>
                      {newEntry.type === 'income' ? (
                        <input className="add-input" value="Income" disabled style={{ opacity: 0.5 }} />
                      ) : (
                        <select className="add-input" value={newEntry.category} onChange={e => setNewEntry({ ...newEntry, category: e.target.value })}>
                          <option value="">Select a category</option>
                          {budgetCategories.map(cat => (
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
                  <span>Action</span>
                </div>
                {transactions.filter(t => filterCategory === 'All' || t.category === filterCategory).map(t => (
                  <div className="records-row" key={t.id}>
                    <span className="records-desc">{t.description}</span>
                    <span className="records-cat-badge">{t.category}</span>
                    <span className="records-date">{t.date}</span>
                    <span className={`records-amount ${t.type}`}>
                      {t.type === 'income' ? '+' : '−'}${t.amount.toFixed(2)}
                    </span>
                    <button 
                      className="records-delete-btn"
                      onClick={() => handleDeleteExpense(t.id)}
                      title="Delete expense"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {activeTab === 'alerts' && (
          <>
            <div className="dash-header">
              <h2 className="dash-title">Alerts 🔔</h2>
              <p className="dash-subtitle">
                {newAlertCount > 0 ? `${newAlertCount} new alert${newAlertCount > 1 ? 's' : ''}` : 'All caught up'}
              </p>
            </div>

            <div className="alerts-layout">
              <div className="dash-card alerts-feed-card">
                {alerts.length === 0 ? (
                  <div className="alerts-empty">
                    <span className="alerts-empty-icon">✅</span>
                    <p>No active alerts</p>
                    <span className="alerts-empty-sub">Your finances are looking good!</span>
                  </div>
                ) : (
                  <div className="alerts-feed">
                    {alerts.map(alert => (
                      <div key={alert.id} className={`alert-item alert-${alert.severity}`}>
                        <span className={`alert-dot dot-${alert.severity}`} />
                        <div className="alert-content">
                          <span className="alert-message">{alert.message}</span>
                          <span className="alert-time">{alert.timestamp}</span>
                        </div>
                        <button
                          className="alert-dismiss"
                          onClick={() => dismissAlert(alert.id)}
                          title="Dismiss"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="dash-card alerts-settings-card">
                <h3 className="dash-card-title">Alert Thresholds</h3>
                <div className="alerts-settings-list">

                  {/* Budget warnings */}
                  <div className="alert-setting-row">
                    <div className="alert-setting-info">
                      <span className="alert-setting-label">Budget warnings</span>
                      {alertSettings.budgetWarnings && (
                        <span className="alert-setting-sub">
                          Warn at&nbsp;
                          <input
                            className="alert-threshold-input"
                            type="number"
                            min={1}
                            max={99}
                            value={thresholdDraft.budgetWarningPct}
                            onChange={e => setThresholdDraft(d => ({ ...d, budgetWarningPct: e.target.value }))}
                            onBlur={() => {
                              const v = Math.min(99, Math.max(1, parseInt(thresholdDraft.budgetWarningPct) || 80));
                              setThresholdDraft(d => ({ ...d, budgetWarningPct: String(v) }));
                              setAlertSettings(s => ({ ...s, budgetWarningPct: v }));
                            }}
                          />
                          % of limit
                        </span>
                      )}
                    </div>
                    <button
                      className={`alert-toggle ${alertSettings.budgetWarnings ? 'on' : 'off'}`}
                      onClick={() => setAlertSettings(s => ({ ...s, budgetWarnings: !s.budgetWarnings }))}
                      aria-pressed={alertSettings.budgetWarnings}
                    >
                      <span className="alert-toggle-thumb" />
                    </button>
                  </div>

                  {/* Large transaction */}
                  <div className="alert-setting-row">
                    <div className="alert-setting-info">
                      <span className="alert-setting-label">Large transaction alerts</span>
                      {alertSettings.largeTransactionAlerts && (
                        <span className="alert-setting-sub">
                          Alert for expenses over&nbsp;$
                          <input
                            className="alert-threshold-input alert-threshold-wide"
                            type="number"
                            min={1}
                            value={thresholdDraft.largeTransactionAmount}
                            onChange={e => setThresholdDraft(d => ({ ...d, largeTransactionAmount: e.target.value }))}
                            onBlur={() => {
                              const v = Math.max(1, parseInt(thresholdDraft.largeTransactionAmount) || 500);
                              setThresholdDraft(d => ({ ...d, largeTransactionAmount: String(v) }));
                              setAlertSettings(s => ({ ...s, largeTransactionAmount: v }));
                            }}
                          />
                        </span>
                      )}
                    </div>
                    <button
                      className={`alert-toggle ${alertSettings.largeTransactionAlerts ? 'on' : 'off'}`}
                      onClick={() => setAlertSettings(s => ({ ...s, largeTransactionAlerts: !s.largeTransactionAlerts }))}
                      aria-pressed={alertSettings.largeTransactionAlerts}
                    >
                      <span className="alert-toggle-thumb" />
                    </button>
                  </div>

                  {/* Low balance */}
                  <div className="alert-setting-row">
                    <div className="alert-setting-info">
                      <span className="alert-setting-label">Low balance alerts</span>
                      {alertSettings.lowBalanceAlerts && (
                        <span className="alert-setting-sub">Fires when expenses exceed income</span>
                      )}
                    </div>
                    <button
                      className={`alert-toggle ${alertSettings.lowBalanceAlerts ? 'on' : 'off'}`}
                      onClick={() => setAlertSettings(s => ({ ...s, lowBalanceAlerts: !s.lowBalanceAlerts }))}
                      aria-pressed={alertSettings.lowBalanceAlerts}
                    >
                      <span className="alert-toggle-thumb" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
