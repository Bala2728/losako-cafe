import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const monthlyData = [
  { month: 'Jan', sales: 42000, orders: 310 },
  { month: 'Feb', sales: 58000, orders: 420 },
  { month: 'Mar', sales: 51000, orders: 380 },
  { month: 'Apr', sales: 67000, orders: 490 },
  { month: 'May', sales: 73000, orders: 540 },
  { month: 'Jun', sales: 88000, orders: 630 },
  { month: 'Jul', sales: 95000, orders: 700 },
  { month: 'Aug', sales: 102000, orders: 750 },
  { month: 'Sep', sales: 118000, orders: 860 },
  { month: 'Oct', sales: 134000, orders: 980 },
  { month: 'Nov', sales: 149000, orders: 1090 },
  { month: 'Dec', sales: 168000, orders: 1240 },
];

const stats = [
  { label: "Today's Sales", value: '₹14,820', icon: 'bi-cash-coin',      color: '#D4621A', bg: 'rgba(212,98,26,0.1)',  change: '+18%' },
  { label: 'Monthly Revenue', value: '₹1.68L',  icon: 'bi-graph-up-arrow',color: '#8B4513', bg: 'rgba(139,69,19,0.1)',  change: '+24%' },
  { label: 'Orders Today',    value: '87',      icon: 'bi-bag-check-fill', color: '#5C3317', bg: 'rgba(92,51,23,0.1)',   change: '+12%' },
  { label: 'Walk-in Customers',value: '63',     icon: 'bi-people-fill',    color: '#E8844A', bg: 'rgba(232,132,74,0.12)',change: '+9%'  },
];

const bestsellers = [
  { name: 'Cappuccino',   sales: 1240, pct: 85 },
  { name: 'Cold Coffee',  sales: 980,  pct: 67 },
  { name: 'Croissant',    sales: 760,  pct: 52 },
  { name: 'Latte',        sales: 640,  pct: 44 },
  { name: 'Sandwich',     sales: 510,  pct: 35 },
];

export default function Dashboard() {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-start">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back! Here's what's happening at LOSAKO CAFE today.</p>
        </div>
        <div className="text-end">
          <span className="badge-orange px-3 py-2 rounded-3 small fw-semibold">
            <i className="bi bi-calendar3 me-1"></i> Tuesday, 2 Jun 2026
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {stats.map(s => (
          <div className="col-6 col-xl-3" key={s.label}>
            <div className="stat-card h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
                  <i className={`bi ${s.icon}`}></i>
                </div>
                <span className="badge-green px-2 py-1 rounded-2" style={{ fontSize: '0.72rem', fontWeight: 600 }}>
                  {s.change}
                </span>
              </div>
              <div style={{ fontSize: '1.55rem', fontWeight: 700, color: 'var(--brown-dark)', fontFamily: 'Playfair Display, serif' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-4">
        {/* Revenue Chart */}
        <div className="col-lg-8">
          <div className="cafe-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="section-title mb-0">Revenue Overview</div>
                <small style={{ color: 'var(--text-muted)' }}>1 Year Growth — 2026</small>
              </div>
              <span className="badge-orange px-3 py-1 rounded-pill small fw-semibold">+300% YoY</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4621A" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#D4621A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(92,51,23,0.07)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8B7355' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#8B7355' }} axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Sales']}
                  contentStyle={{ borderRadius: 10, border: '1px solid #E8D5B0', fontFamily: 'DM Sans' }} />
                <Area type="monotone" dataKey="sales" stroke="#D4621A" strokeWidth={2.5}
                  fill="url(#salesGrad)" dot={false} activeDot={{ r: 5, fill: '#D4621A' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Sellers */}
        <div className="col-lg-4">
          <div className="cafe-card h-100">
            <div className="section-title">Best Selling Items</div>
            {bestsellers.map(item => (
              <div key={item.name} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--brown-dark)' }}>{item.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.sales}</span>
                </div>
                <div style={{ height: 6, background: 'var(--beige)', borderRadius: 10 }}>
                  <div style={{ height: '100%', width: `${item.pct}%`, background: 'var(--orange-main)', borderRadius: 10, transition: 'width 0.6s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1 Year Success Banner */}
      <div className="cafe-card" style={{ background: 'linear-gradient(135deg, var(--brown-dark) 0%, var(--brown-mid) 100%)', color: '#fff', borderColor: 'transparent' }}>
        <div className="row align-items-center">
          <div className="col-md-7">
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--orange-light)', fontWeight: 600, marginBottom: 6 }}>
              🎉 1 YEAR SUCCESS JOURNEY
            </div>
            <h4 style={{ fontFamily: 'Playfair Display', fontWeight: 700, marginBottom: 8 }}>
              LOSAKO CAFE reached strong customer growth within first year in Pondicherry
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', marginBottom: 0 }}>
              From a humble startup to Pondicherry's most-loved café — 1,240+ happy customers, ₹16.8L revenue, and growing every month.
            </p>
          </div>
          <div className="col-md-5">
            <div className="row g-2 mt-2 mt-md-0">
              {[
                { label: 'Total Customers', val: '1,240+' },
                { label: 'Revenue Generated', val: '₹16.8L' },
                { label: 'Avg Daily Orders', val: '68' },
                { label: 'Google Rating', val: '4.8 ★' },
              ].map(m => (
                <div className="col-6" key={m.label}>
                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px' }}>
                    <div style={{ fontSize: '1.25rem', fontFamily: 'Playfair Display', fontWeight: 700 }}>{m.val}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>{m.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
