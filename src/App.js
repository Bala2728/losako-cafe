import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from './store/slices/uiSlice';
import Sidebar from './components/Sidebar';
import Toast   from './components/ui/Toast';
import Dashboard  from './pages/Dashboard';
import Billing    from './pages/Billing';
import Orders     from './pages/Orders';
import Products   from './pages/Products';
import Categories from './pages/Categories';
import Customers  from './pages/Customers';
import Reports    from './pages/Reports';
import Expenses   from './pages/Expenses';
import Staff      from './pages/Staff';
import Settings   from './pages/Settings';
import './App.css';

const PAGES = {
  dashboard:  <Dashboard />,
  billing:    <Billing />,
  orders:     <Orders />,
  products:   <Products />,
  // categories: <Categories />,
  customers:  <Customers />,
  reports:    <Reports />,
  expenses:   <Expenses />,
  staff:      <Staff />,
  settings:   <Settings />,
};

const PAGE_LABELS = {
  dashboard: 'Dashboard', billing: 'Billing Management', orders: 'Orders',
  products: 'Products', categories: 'Categories', customers: 'Customers',
  reports: 'Reports', expenses: 'Expenses', staff: 'Staff', settings: 'Settings',
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(s => s.ui);
  const { user } = useSelector(s => s.auth);

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div className="sidebar-overlay" onClick={() => dispatch(toggleSidebar())} />
      )}

      <Sidebar activePage={activePage} setActivePage={(p) => {
        setActivePage(p);
        if (window.innerWidth < 768) dispatch(toggleSidebar());
      }} />

      <main className={`app-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Topbar */}
        <div className="topbar">
          <div className="d-flex align-items-center gap-3">
            <button className="topbar-hamburger" onClick={() => dispatch(toggleSidebar())}>
              <i className={`bi ${sidebarOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
            <div>
              <div style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1rem', color: 'var(--brown-dark)' }}>
                {PAGE_LABELS[activePage]}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>LOSAKO CAFE • POS System</div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-md-flex align-items-center gap-2" style={{ background: 'rgba(45,138,78,0.08)', borderRadius: 20, padding: '4px 12px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2d8a4e' }}></div>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#2d8a4e' }}>System Active</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--orange-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>
                {user?.avatar || 'RK'}
              </div>
              <div className="d-none d-sm-block">
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--brown-dark)' }}>{user?.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user?.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {PAGES[activePage] || <Dashboard />}
        </div>
      </main>

      <Toast />
    </div>
  );
}
