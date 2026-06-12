import React from 'react';

const staff = [
  { name: 'Prakash',    role: 'Admin',    status: 'Active',  shift: 'Morning',   phone: '98765 00001', joined: 'Jan 2024', attendance: 90 },
  { name: 'Sakthivel',    role: 'Admin',  status: 'Active',  shift: 'Evening',   phone: '98765 00002', joined: 'Jan 2024', attendance: 90 },
  { name: 'Ranga',      role: 'Admin',  status: 'Active',  shift: 'Morning',   phone: '98765 00003', joined: 'Feb 2024', attendance: 90 },
  { name: 'Kolanchiappan',    role: 'Admin',  status: 'Active',  shift: 'Evening',   phone: '98765 00004', joined: 'Feb 2024', attendance: 90 },
];

const roleColor = { Admin: 'badge-orange', Cashier: 'badge-brown', Barista: 'badge-amber' };
const statusColor = { Active: 'badge-green', Leave: 'badge-red' };
const roleColors = { Admin: '#D4621A', Cashier: '#8B4513', Barista: '#9a6a00' };

function StaffAvatar({ name, role }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('');
  const color = roleColors[role] || '#5C3317';
  return (
    <div style={{ width: 38, height: 38, borderRadius: '50%', background: color + '20', border: `2px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export default function Staff() {
  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-start">
        <div><h2>Staff</h2><p>Manage your cafe team and attendance</p></div>
        <button className="btn-orange"><i className="bi bi-person-plus me-2"></i>Add Staff</button>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: 'Total Staff',   val: staff.length,                               icon: 'bi-people' },
          { label: 'Active Today',  val: staff.filter(s => s.status === 'Active').length, icon: 'bi-person-check' },
          { label: 'On Leave',      val: staff.filter(s => s.status === 'Leave').length,  icon: 'bi-person-x'     },
          { label: 'Avg Attendance',val: `${Math.round(staff.reduce((s, e) => s + e.attendance, 0) / staff.length)}%`, icon: 'bi-calendar-check' },
        ].map(s => (
          <div className="col-6 col-md-3" key={s.label}>
            <div className="stat-card">
              <i className={`bi ${s.icon}`} style={{ fontSize: '1.3rem', color: 'var(--orange-main)' }}></i>
              <div style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display', fontWeight: 700, margin: '6px 0 2px' }}>{s.val}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cafe-card">
        <div className="section-title">Team Members</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="cafe-table">
            <thead>
              <tr>{['Staff Member', 'Role', 'Shift', 'Phone', 'Joined', 'Attendance', 'Status'].map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {staff.map(s => (
                <tr key={s.name}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <StaffAvatar name={s.name} role={s.role} />
                      <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{s.name}</span>
                    </div>
                  </td>
                  <td><span className={`${roleColor[s.role]} px-2 py-1 rounded-2`} style={{ fontSize: '0.75rem', fontWeight: 600 }}>{s.role}</span></td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.shift}</td>
                  <td style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>{s.phone}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{s.joined}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: 60, height: 6, background: 'var(--beige)', borderRadius: 10 }}>
                        <div style={{ height: '100%', width: `${s.attendance}%`, background: s.attendance >= 95 ? '#2d8a4e' : s.attendance >= 90 ? '#9a6a00' : '#c0392b', borderRadius: 10 }} />
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{s.attendance}%</span>
                    </div>
                  </td>
                  <td><span className={`${statusColor[s.status]} px-2 py-1 rounded-2`} style={{ fontSize: '0.75rem', fontWeight: 600 }}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
