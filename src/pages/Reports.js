import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';

const monthlyData = [
  { month: 'Jan', sales: 42000, customers: 310 },
  { month: 'Feb', sales: 58000, customers: 420 },
  { month: 'Mar', sales: 51000, customers: 380 },
  { month: 'Apr', sales: 67000, customers: 490 },
  { month: 'May', sales: 73000, customers: 540 },
  { month: 'Jun', sales: 88000, customers: 630 },
  { month: 'Jul', sales: 95000, customers: 700 },
  { month: 'Aug', sales: 102000, customers: 750 },
  { month: 'Sep', sales: 118000, customers: 860 },
  { month: 'Oct', sales: 134000, customers: 980 },
  { month: 'Nov', sales: 149000, customers: 1090 },
  { month: 'Dec', sales: 168000, customers: 1240 },
];

const weekdayData = [
  { day: 'Mon', sales: 12000 }, { day: 'Tue', sales: 13500 }, { day: 'Wed', sales: 14200 },
  { day: 'Thu', sales: 13000 }, { day: 'Fri', sales: 16800 }, { day: 'Sat', sales: 22400 }, { day: 'Sun', sales: 24100 },
];

export default function Reports() {
  return (
    <div>
      <div className="page-header">
        <h2>Reports</h2>
        <p>One year business growth analytics — LOSAKO CAFE 2026</p>
      </div>

      {/* KPIs */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Annual Revenue',   val: '₹16.8L',  sub: '+300% vs target',   color: '#D4621A' },
          { label: 'Total Orders',     val: '8,390',   sub: '∼23 per day',        color: '#8B4513' },
          { label: 'Avg Order Value',  val: '₹200',    sub: 'per transaction',    color: '#5C3317' },
          { label: 'Peak Day',         val: 'Sunday',  sub: '₹24,100 best day',  color: '#E8844A' },
        ].map(s => (
          <div className="col-6 col-md-3" key={s.label}>
            <div className="stat-card">
              <div style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display', fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--brown-dark)', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Sales + Customers */}
      <div className="cafe-card mb-3">
        <div className="section-title">Monthly Sales & Customer Growth — 2026</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(92,51,23,0.07)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8B7355' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="sales" tick={{ fontSize: 11, fill: '#8B7355' }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${v/1000}k`} />
            <YAxis yAxisId="cust" orientation="right" tick={{ fontSize: 11, fill: '#8B7355' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E8D5B0', fontFamily: 'DM Sans' }} />
            <Legend iconType="circle" iconSize={8} />
            <Line yAxisId="sales" type="monotone" dataKey="sales" stroke="#D4621A" strokeWidth={2.5} dot={false} name="Sales (₹)" />
            <Line yAxisId="cust"  type="monotone" dataKey="customers" stroke="#8B4513" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Customers" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Weekday Sales */}
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="cafe-card">
            <div className="section-title">Peak Sales by Day of Week</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekdayData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(92,51,23,0.07)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#8B7355' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Sales']} contentStyle={{ borderRadius: 10, border: '1px solid #E8D5B0' }} />
                <Bar dataKey="sales" fill="#D4621A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8, marginBottom: 0 }}>
              🏖️ Weekend sales are <strong>62% higher</strong> — Pondicherry tourists & locals drive Sunday peaks.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="cafe-card h-100">
            <div className="section-title">Pondicherry Local Insights</div>
            {[
              { label: 'Local Pondicherry customers', val: '68%' },
              { label: 'Tourist visitors',             val: '22%' },
              { label: 'Expat / French Quarter',       val: '10%' },
              { label: 'Avg session time in café',     val: '42 min' },
              { label: 'UPI payment preference',       val: '74%' },
              { label: 'Repeat customer rate',         val: '55%' },
            ].map(item => (
              <div key={item.label} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid rgba(232,213,176,0.4)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.label}</span>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--brown-dark)' }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
