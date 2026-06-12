export default function Topbar({ page }) {
  const titles = {
    dashboard: 'Dashboard', newbill: 'New Bill', orders: 'Orders',
    products: 'Products', categories: 'Categories', customers: 'Customers',
    reports: 'Reports', expenses: 'Expenses', staff: 'Staff', settings: 'Settings',
  };
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="topbar">
      <div>
        <div className="section-title" style={{ fontSize: '1.15rem' }}>{titles[page]}</div>
        <div style={{ fontSize: '0.72rem', color: '#999', marginTop: 1 }}>{dateStr}</div>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div style={{ position: 'relative' }}>
          <i className="bi bi-bell" style={{ fontSize: '1.2rem', color: '#888', cursor: 'pointer' }}></i>
          <span style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: '#c8581a', borderRadius: '50%' }}></span>
        </div>
        <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #c8581a, #e8842a)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
            A
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#3e1f00' }}>Admin</div>
            <div style={{ fontSize: '0.65rem', color: '#999' }}>Owner</div>
          </div>
        </div>
      </div>
    </div>
  );
}
