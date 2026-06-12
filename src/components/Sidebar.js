import React from 'react';
import { useSelector } from 'react-redux';
import './Sidebar.css';

const menuItems = [
  { key: 'dashboard',  icon: 'bi-speedometer2',      label: 'Dashboard'   },
  { key: 'billing',    icon: 'bi-receipt-cutoff',     label: 'Billing'     },
  { key: 'orders',     icon: 'bi-bag-check',          label: 'Orders'      },
  { key: 'products',   icon: 'bi-cup-hot',            label: 'Products'    },
  // { key: 'categories', icon: 'bi-grid-1x2',           label: 'Categories'  },
  { key: 'customers',  icon: 'bi-people',             label: 'Customers'   },
  { key: 'reports',    icon: 'bi-bar-chart-line',     label: 'Reports'     },
  { key: 'expenses',   icon: 'bi-wallet2',            label: 'Expenses'    },
  { key: 'staff',      icon: 'bi-person-badge',       label: 'Staff'       },
  { key: 'settings',   icon: 'bi-gear',               label: 'Settings'    },
];

export default function Sidebar({ activePage, setActivePage }) {
  const sidebarOpen = useSelector(s => s.ui.sidebarOpen);

  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo"><i className="bi bi-cup-hot-fill"></i></div>
        <div>
          <div className="brand-name">LOSAKO</div>
          <div className="brand-sub">CAFE</div>
        </div>
      </div>
      <div className="sidebar-tagline">Smart Billing &amp; POS System</div>
      <div className="sidebar-divider" />

      {/* Nav */}
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button key={item.key}
            className={`sidebar-item ${activePage === item.key ? 'active' : ''}`}
            onClick={() => setActivePage(item.key)}>
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-divider" />
      <button className="sidebar-item sidebar-logout">
        <i className="bi bi-box-arrow-left"></i><span>Logout</span>
      </button>

      <div className="sidebar-footer">
        <div className="sidebar-footer-dot"></div>
        <span>Pondicherry • Since 2026</span>
      </div>
    </aside>
  );
}
