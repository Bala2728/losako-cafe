import React, { useState } from 'react';

const orders = [
  { id: 'LC-001240', items: 'Cappuccino x2, Croissant x1', total: 320, status: 'Completed', type: 'Walk-in',  time: '10:14 AM', payment: 'UPI'  },
  { id: 'LC-001239', items: 'Cold Coffee x1, Sandwich x1', total: 260, status: 'Completed', type: 'Walk-in',  time: '10:02 AM', payment: 'Cash' },
  { id: 'LC-001238', items: 'Latte x3',                    total: 390, status: 'Pending',   type: 'Online',   time: '9:55 AM',  payment: 'UPI'  },
  { id: 'LC-001237', items: 'Espresso x1, Waffle x1',      total: 210, status: 'Completed', type: 'Walk-in',  time: '9:41 AM',  payment: 'Card' },
  { id: 'LC-001236', items: 'Filter Coffee x2, Muffin x2', total: 260, status: 'Pending',   type: 'Online',   time: '9:30 AM',  payment: 'UPI'  },
  { id: 'LC-001235', items: 'Cold Brew x1, Brownie x1',    total: 260, status: 'Completed', type: 'Walk-in',  time: '9:15 AM',  payment: 'Cash' },
  { id: 'LC-001234', items: 'Cappuccino x1',               total: 120, status: 'Completed', type: 'Walk-in',  time: '9:00 AM',  payment: 'UPI'  },
];

const statusColor = { Completed: 'badge-green', Pending: 'badge-amber' };
const typeColor   = { 'Walk-in': 'badge-brown', 'Online': 'badge-orange' };

export default function Orders() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? orders
    : filter === 'Completed' ? orders.filter(o => o.status === 'Completed')
    : filter === 'Pending'   ? orders.filter(o => o.status === 'Pending')
    : orders.filter(o => o.type === filter);

  const total = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <div className="page-header">
        <h2>Orders</h2>
        <p>Track today's orders — online and offline</p>
      </div>

      {/* Summary */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Orders',     val: orders.length,                                icon: 'bi-bag',         color: '#D4621A' },
          { label: 'Completed',        val: orders.filter(o => o.status === 'Completed').length, icon: 'bi-check-circle', color: '#2d8a4e' },
          { label: 'Pending',          val: orders.filter(o => o.status === 'Pending').length,   icon: 'bi-hourglass-split', color: '#9a6a00' },
          { label: "Today's Revenue",  val: `₹${total}`,                                 icon: 'bi-cash',        color: '#8B4513' },
        ].map(s => (
          <div className="col-6 col-md-3" key={s.label}>
            <div className="stat-card">
              <i className={`bi ${s.icon}`} style={{ fontSize: '1.4rem', color: s.color }}></i>
              <div style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display', fontWeight: 700, margin: '6px 0 2px' }}>{s.val}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cafe-card">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div className="section-title mb-0">Recent Orders</div>
          <div className="d-flex gap-2 flex-wrap">
            {['All', 'Completed', 'Pending', 'Walk-in', 'Online'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{
                  padding: '5px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                  background: filter === f ? 'var(--orange-main)' : 'transparent',
                  color: filter === f ? '#fff' : 'var(--text-muted)',
                  border: filter === f ? 'none' : '1px solid var(--beige)',
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="cafe-table">
            <thead>
              <tr>
                {['Order ID', 'Items', 'Total', 'Payment', 'Type', 'Time', 'Status'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td><span style={{ fontWeight: 600, color: 'var(--brown-dark)' }}>{o.id}</span></td>
                  <td style={{ maxWidth: 180 }}><span style={{ color: 'var(--text-muted)' }}>{o.items}</span></td>
                  <td><span style={{ fontWeight: 600, color: 'var(--orange-main)' }}>₹{o.total}</span></td>
                  <td>{o.payment}</td>
                  <td><span className={`${typeColor[o.type]} px-2 py-1 rounded-2`} style={{ fontSize: '0.76rem', fontWeight: 600 }}>{o.type}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{o.time}</td>
                  <td><span className={`${statusColor[o.status]} px-2 py-1 rounded-2`} style={{ fontSize: '0.76rem', fontWeight: 600 }}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
