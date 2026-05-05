import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const helloWorldService = {
  getHello: () => api.get('/hello'),
};

export const authService = {
  login: (email: string, password: string) => 
    api.post('/api/auth/login', { email, password }),
};

export const expenseService = {
  getExpensesByUser: (userId: number) =>
    api.get(`/api/expenses/user/${userId}`),
  
  createExpense: (userId: number, expense: any) =>
    api.post(`/api/expenses/user/${userId}`, expense),
  
  updateExpense: (expenseId: number, expense: any) =>
    api.put(`/api/expenses/${expenseId}`, expense),
  
  deleteExpense: (expenseId: number) =>
    api.delete(`/api/expenses/${expenseId}`),
};

export const billService = {
  getBillsByUser: (userId: number) =>
    api.get(`/api/bills/user/${userId}`),

  createBill: (userId: number, bill: any) =>
    api.post(`/api/bills/user/${userId}`, bill),

  updateBill: (billId: number, bill: any) =>
    api.put(`/api/bills/${billId}`, bill),

  deleteBill: (billId: number) =>
    api.delete(`/api/bills/${billId}`),
};

export default api;