// ═══════════════════════════════════════════════════════
//  LOSAKO CAFE — Axios API Service
//  Connects React frontend → Node.js + MySQL backend
// ═══════════════════════════════════════════════════════

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ── Generic fetch wrapper ──────────────────────────────
const request = async (method, endpoint, body = null) => {
  const token = localStorage.getItem('losakoToken');
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  const res  = await fetch(`${BASE_URL}${endpoint}`, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

const get    = (url)         => request('GET',    url);
const post   = (url, body)   => request('POST',   url, body);
const put    = (url, body)   => request('PUT',    url, body);
const patch  = (url, body)   => request('PATCH',  url, body);
const del    = (url)         => request('DELETE', url);

// ── Auth ──────────────────────────────────────────────
export const authAPI = {
  login:          (creds)  => post('/auth/login', creds),
  changePassword: (data)   => post('/auth/change-password', data),
};

// ── Dashboard ─────────────────────────────────────────
export const dashboardAPI = {
  getStats: () => get('/dashboard/stats'),
};

// ── Bills ─────────────────────────────────────────────
export const billsAPI = {
  list:         (params = {}) => get(`/bills?${new URLSearchParams(params)}`),
  get:          (id)          => get(`/bills/${id}`),
  create:       (data)        => post('/bills', data),
  update:       (id, data)    => put(`/bills/${id}`, data),
  updateStatus: (id, status)  => patch(`/bills/${id}/status`, { status }),
  delete:       (id)          => del(`/bills/${id}`),
  stats:        ()            => get('/bills/stats/summary'),
};

// ── Products ──────────────────────────────────────────
export const productsAPI = {
  list:   (params = {}) => get(`/products?${new URLSearchParams(params)}`),
  create: (data)        => post('/products', data),
  update: (id, data)    => put(`/products/${id}`, data),
  delete: (id)          => del(`/products/${id}`),
};

// ── Categories ────────────────────────────────────────
export const categoriesAPI = {
  list:   ()       => get('/categories'),
  create: (data)   => post('/categories', data),
  update: (id, d)  => put(`/categories/${id}`, d),
  delete: (id)     => del(`/categories/${id}`),
};

// ── Customers ─────────────────────────────────────────
export const customersAPI = {
  list:  (params = {}) => get(`/customers?${new URLSearchParams(params)}`),
  bills: (id)          => get(`/customers/${id}/bills`),
};

// ── Expenses ──────────────────────────────────────────
export const expensesAPI = {
  list:    (month) => get(`/expenses${month ? `?month=${month}` : ''}`),
  create:  (data)  => post('/expenses', data),
  update:  (id, d) => put(`/expenses/${id}`, d),
  delete:  (id)    => del(`/expenses/${id}`),
  monthly: ()      => get('/expenses/summary/monthly'),
};

// ── Staff ─────────────────────────────────────────────
export const staffAPI = {
  list:   ()       => get('/staff'),
  create: (data)   => post('/staff', data),
  update: (id, d)  => put(`/staff/${id}`, d),
  delete: (id)     => del(`/staff/${id}`),
};
