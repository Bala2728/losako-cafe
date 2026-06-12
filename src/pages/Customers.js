import React from 'react';

const customers = [
  { name: 'Priya Krishnamurthy', phone: '98765 43210', visits: 42, spent: 5040, last: 'Today',      loyal: true  },
  { name: 'Arjun Mehta',         phone: '87654 32109', visits: 35, spent: 4200, last: 'Yesterday',  loyal: true  },
  { name: 'Divya Suresh',        phone: '76543 21098', visits: 28, spent: 3360, last: '2 days ago', loyal: true  },
  { name: 'Karthik Rajan',       phone: '65432 10987', visits: 20, spent: 2400, last: '3 days ago', loyal: false },
  { name: 'Meena Selvam',        phone: '54321 09876', visits: 18, spent: 2160, last: '4 days ago', loyal: false },
  { name: 'Rohit Pillai',        phone: '43210 98765', visits: 15, spent: 1800, last: '1 week ago', loyal: false },
  { name: 'Anitha Nair',         phone: '32109 87654', visits: 12, spent: 1440, last: '1 week ago', loyal: false },
];

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('');
  const colors = ['#D4621A', '#8B4513', '#5C3317', '#E8844A', '#c0392b'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: color + '22', border: `2px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color }}>
      {initials}
    </div>
  );
}

export default function Customers() {
  return (
    <div>
      <div className="page-header">
        <h2>Customers</h2>
        <p>Track your loyal customer base and visit history</p>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: 'Total Customers',  val: '1,240', icon: 'bi-people',         color: '#D4621A' },
          { label: 'Repeat Customers', val: '687',   icon: 'bi-arrow-repeat',   color: '#2d8a4e' },
          { label: 'Loyal Members',    val: '143',   icon: 'bi-star-fill',       color: '#9a6a00' },
          { label: 'Avg Visits/Month', val: '3.8',   icon: 'bi-calendar-check', color: '#8B4513' },
        ].map(s => (
          <div className="col-6 col-md-3" key={s.label}>
            <div className="stat-card">
              <i className={`bi ${s.icon}`} style={{ fontSize: '1.3rem', color: s.color }}></i>
              <div style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display', fontWeight: 700, margin: '6px 0 2px' }}>{s.val}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cafe-card">
        <div className="section-title">Top Customers</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="cafe-table">
            <thead>
              <tr>{['Customer', 'Phone', 'Total Visits', 'Total Spent', 'Last Visit', 'Status'].map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.name}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Avatar name={c.name} />
                      <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--brown-dark)' }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.phone}</td>
                  <td><span style={{ fontWeight: 600 }}>{c.visits}</span></td>
                  <td><span style={{ fontWeight: 700, color: 'var(--orange-main)' }}>₹{c.spent.toLocaleString()}</span></td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{c.last}</td>
                  <td>
                    {c.loyal
                      ? <span className="badge-orange px-2 py-1 rounded-2" style={{ fontSize: '0.75rem', fontWeight: 600 }}>⭐ Loyal</span>
                      : <span className="badge-brown px-2 py-1 rounded-2" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Regular</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
