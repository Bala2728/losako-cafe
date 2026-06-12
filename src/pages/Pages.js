import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/* ---- PRODUCTS ---- */
const products = [
  { name: 'Cappuccino',    emoji: '☕', price: 120, stock: 'In Stock',  cat: 'Hot Coffee', sold: 892, tag: 'bestseller' },
  { name: 'Cold Coffee',   emoji: '🧊', price: 150, stock: 'In Stock',  cat: 'Cold Bev',   sold: 742, tag: 'popular' },
  { name: 'Latte',         emoji: '🥛', price: 130, stock: 'In Stock',  cat: 'Hot Coffee', sold: 589, tag: null },
  { name: 'Espresso',      emoji: '⚡', price: 90,  stock: 'In Stock',  cat: 'Hot Coffee', sold: 430, tag: null },
  { name: 'Frappe',        emoji: '🥤', price: 160, stock: 'In Stock',  cat: 'Cold Bev',   sold: 380, tag: null },
  { name: 'Croissant',     emoji: '🥐', price: 80,  stock: 'Low Stock', cat: 'Bakery',     sold: 621, tag: 'popular' },
  { name: 'Sandwich',      emoji: '🥪', price: 110, stock: 'In Stock',  cat: 'Snacks',     sold: 290, tag: null },
  { name: 'Chocolate Cake',emoji: '🎂', price: 140, stock: 'In Stock',  cat: 'Desserts',   sold: 210, tag: null },
  { name: 'Brownie',       emoji: '🍫', price: 95,  stock: 'In Stock',  cat: 'Desserts',   sold: 178, tag: null },
  { name: 'Muffin',        emoji: '🧁', price: 70,  stock: 'Out',       cat: 'Bakery',     sold: 145, tag: null },
];

export function Products() {
  return (
    <div className="page-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-title">Products</h5>
        <button className="btn-cafe btn">+ Add Product</button>
      </div>
      <div className="card-panel">
        <div className="table-responsive">
          <table className="table table-cafe align-middle mb-0">
            <thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Sold</th><th>Stock</th><th>Tag</th><th>Action</th></tr></thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td><span style={{ fontSize: '1.3rem', marginRight: 10 }}>{p.emoji}</span><strong>{p.name}</strong></td>
                  <td style={{ fontSize: '0.8rem', color: '#888' }}>{p.cat}</td>
                  <td><strong style={{ color: '#c8581a' }}>₹{p.price}</strong></td>
                  <td style={{ fontSize: '0.83rem' }}>{p.sold}</td>
                  <td>
                    <span className={p.stock === 'In Stock' ? 'badge-green' : p.stock === 'Low Stock' ? 'badge-amber' : 'badge-red'} style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem' }}>
                      {p.stock}
                    </span>
                  </td>
                  <td>{p.tag && <span className="badge-orange" style={{ borderRadius: 20 }}>⭐ {p.tag}</span>}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-1" style={{ borderRadius: 8, fontSize: '0.75rem' }}>Edit</button>
                    <button className="btn btn-sm" style={{ borderRadius: 8, fontSize: '0.75rem', background: '#ffeaea', color: '#c82828', border: 'none' }}>Del</button>
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

/* ---- CATEGORIES ---- */
const categories = [
  { name: 'Hot Coffee',     emoji: '☕', count: 5, color: '#c8581a' },
  { name: 'Cold Beverages', emoji: '🧊', count: 4, color: '#1e64c8' },
  { name: 'Desserts',       emoji: '🍰', count: 6, color: '#c82878' },
  { name: 'Snacks',         emoji: '🥪', count: 3, color: '#228B22' },
  { name: 'Bakery',         emoji: '🥐', count: 5, color: '#c8a018' },
];

export function Categories() {
  return (
    <div className="page-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-title">Categories</h5>
        <button className="btn-cafe btn">+ Add Category</button>
      </div>
      <div className="row g-3">
        {categories.map((c, i) => (
          <div className="col-6 col-md-4 col-lg-3" key={i}>
            <div className="card-panel text-center py-4" style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '2.8rem', marginBottom: 10 }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, color: '#3e1f00', marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#888', marginBottom: 10 }}>{c.count} items</div>
              <div style={{ width: '100%', height: 4, borderRadius: 4, background: `${c.color}22` }}>
                <div style={{ width: '70%', height: '100%', borderRadius: 4, background: c.color }}></div>
              </div>
            </div>
          </div>
        ))}
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card-panel text-center py-4" style={{ cursor: 'pointer', border: '2px dashed #e8d5b7' }}>
            <div style={{ fontSize: '2.8rem', marginBottom: 10 }}>➕</div>
            <div style={{ fontWeight: 500, color: '#c8581a' }}>Add New Category</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- CUSTOMERS ---- */
const customers = [
  { name: 'Priya Ramesh',   phone: '98400 12345', visits: 42, spent: 6840, loyalty: 'Gold',   last: '2 hrs ago' },
  { name: 'Arun Kumar',     phone: '97800 67890', visits: 38, spent: 5920, loyalty: 'Gold',   last: 'Yesterday' },
  { name: 'Meera Suresh',   phone: '94440 11223', visits: 29, spent: 4380, loyalty: 'Silver', last: '3 days ago' },
  { name: 'Karthik Vel',    phone: '99940 33445', visits: 24, spent: 3720, loyalty: 'Silver', last: '1 week' },
  { name: 'Divya Mohan',    phone: '98760 55667', visits: 18, spent: 2880, loyalty: 'Bronze', last: '2 weeks' },
  { name: 'Suresh Pandian', phone: '93300 77889', visits: 12, spent: 1920, loyalty: 'Bronze', last: '3 weeks' },
];
const loyaltyColor = { Gold: '#c8a018', Silver: '#888', Bronze: '#c8581a' };

export function Customers() {
  return (
    <div className="page-content">
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Customers',  value: '3,240', icon: 'bi-people' },
          { label: 'Repeat Customers', value: '1,890', icon: 'bi-arrow-repeat' },
          { label: 'Loyalty Members',  value: '428',   icon: 'bi-star' },
          { label: 'Avg. Visits',      value: '7.2',   icon: 'bi-graph-up' },
        ].map((s, i) => (
          <div className="col-6 col-md-3" key={i}>
            <div className="stat-card">
              <div className="stat-icon icon-orange"><i className={`bi ${s.icon}`}></i></div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ fontSize: '1.5rem' }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-panel">
        <h6 style={{ fontWeight: 600, color: '#3e1f00', marginBottom: 16 }}>Top Customers · Loyalty Programme</h6>
        <div className="table-responsive">
          <table className="table table-cafe align-middle mb-0">
            <thead><tr><th>Customer</th><th>Phone</th><th>Visits</th><th>Total Spent</th><th>Loyalty</th><th>Last Visit</th></tr></thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#c8581a22', color: '#c8581a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
                        {c.name[0]}
                      </div>
                      <strong style={{ fontSize: '0.85rem' }}>{c.name}</strong>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#555' }}>{c.phone}</td>
                  <td><strong>{c.visits}</strong></td>
                  <td><strong style={{ color: '#c8581a' }}>₹{c.spent.toLocaleString()}</strong></td>
                  <td><span style={{ color: loyaltyColor[c.loyalty], fontWeight: 600, fontSize: '0.82rem' }}>⭐ {c.loyalty}</span></td>
                  <td style={{ fontSize: '0.78rem', color: '#888' }}>{c.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---- REPORTS ---- */
const weekData = [
  { day: 'Mon', sales: 8200 }, { day: 'Tue', sales: 9100 }, { day: 'Wed', sales: 7800 },
  { day: 'Thu', sales: 10400 }, { day: 'Fri', sales: 13200 }, { day: 'Sat', sales: 18900 }, { day: 'Sun', sales: 16400 },
];

export function Reports() {
  return (
    <div className="page-content">
      <div className="row g-3 mb-4">
        {[
          { label: 'Annual Revenue', value: '₹11.2L',    change: '+228%' },
          { label: 'Profit Margin',  value: '34.8%',     change: 'Healthy' },
          { label: 'Peak Day',       value: 'Saturday',  change: '+65% avg' },
          { label: 'Best Month',     value: 'June 2026', change: '₹1.38L' },
        ].map((s, i) => (
          <div className="col-6 col-md-3" key={i}>
            <div className="stat-card">
              <div className="stat-value" style={{ fontSize: '1.3rem' }}>{s.value}</div>
              <div className="stat-label mt-1">{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#228B22', marginTop: 4 }}>{s.change}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="row g-3">
        <div className="col-lg-7">
          <div className="card-panel">
            <h6 style={{ fontWeight: 600, color: '#3e1f00', marginBottom: 12 }}>Weekly Sales Pattern</h6>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5ece0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Sales']} contentStyle={{ borderRadius: 10, border: '1px solid #ede6d6', fontSize: 12 }} />
                <Bar dataKey="sales" fill="#c8581a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card-panel" style={{ height: '100%' }}>
            <h6 style={{ fontWeight: 600, color: '#3e1f00', marginBottom: 12 }}>Pondicherry Insights</h6>
            {[
              { label: 'Weekend Premium', value: '+65%',      desc: 'Sat–Sun vs weekday' },
              { label: 'Tourist Traffic', value: '38%',       desc: 'of total customers' },
              { label: 'Morning Rush',    value: '8–10 AM',   desc: 'Peak hours daily' },
              { label: 'Top Product',     value: 'Cappuccino',desc: '892 cups / year' },
              { label: 'Local Regulars',  value: '62%',       desc: 'repeat customers' },
            ].map((r, i) => (
              <div key={i} className="d-flex justify-content-between align-items-start py-2" style={{ borderBottom: '1px solid #f5ece8', fontSize: '0.82rem' }}>
                <div><div style={{ fontWeight: 500 }}>{r.label}</div><div style={{ color: '#888', fontSize: '0.73rem' }}>{r.desc}</div></div>
                <span style={{ fontWeight: 700, color: '#c8581a' }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- EXPENSES ---- */
const expenses = [
  { name: 'Milk Supply',    icon: '🥛', amount: 12400, cat: 'Ingredients' },
  { name: 'Coffee Beans',   icon: '☕', amount: 18600, cat: 'Ingredients' },
  { name: 'Shop Rent',      icon: '🏠', amount: 25000, cat: 'Fixed' },
  { name: 'Staff Salaries', icon: '👷', amount: 48000, cat: 'HR' },
  { name: 'Packaging',      icon: '📦', amount: 4200,  cat: 'Operations' },
  { name: 'Electricity',    icon: '⚡', amount: 6800,  cat: 'Utilities' },
  { name: 'Water',          icon: '💧', amount: 1200,  cat: 'Utilities' },
  { name: 'Marketing',      icon: '📢', amount: 5000,  cat: 'Marketing' },
];

export function Expenses() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  return (
    <div className="page-content">
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card">
            <div className="stat-icon icon-orange"><i className="bi bi-wallet2"></i></div>
            <div className="stat-label">Monthly Expenses</div>
            <div className="stat-value">₹{total.toLocaleString()}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <div className="stat-icon icon-green"><i className="bi bi-graph-up"></i></div>
            <div className="stat-label">Monthly Revenue</div>
            <div className="stat-value">₹1,38,000</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <div className="stat-icon icon-amber"><i className="bi bi-piggy-bank"></i></div>
            <div className="stat-label">Net Profit</div>
            <div className="stat-value" style={{ color: '#228B22' }}>₹{(138000 - total).toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="card-panel">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 style={{ fontWeight: 600, color: '#3e1f00', margin: 0 }}>Monthly Expense Breakdown</h6>
          <button className="btn-cafe btn btn-sm">+ Add Expense</button>
        </div>
        <div className="row g-3">
          {expenses.map((e, i) => (
            <div className="col-md-6" key={i}>
              <div className="d-flex align-items-center justify-content-between p-3" style={{ background: '#fdf8f2', borderRadius: 10, border: '1px solid #ede6d6' }}>
                <div className="d-flex align-items-center gap-3">
                  <span style={{ fontSize: '1.6rem' }}>{e.icon}</span>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{e.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#888' }}>{e.cat} · Monthly</div>
                  </div>
                </div>
                <strong style={{ color: '#c8581a', fontSize: '0.95rem' }}>₹{e.amount.toLocaleString()}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- STAFF ---- */
const staff = [
  { name: 'Rajesh Kumar', role: 'Admin / Owner', shift: 'Full Day', status: 'active',   color: '#c8581a', attendance: 98 },
  { name: 'Anitha Devi',  role: 'Cashier',       shift: 'Morning',  status: 'active',   color: '#1e64c8', attendance: 95 },
  { name: 'Murugan S.',   role: 'Barista',        shift: 'Morning',  status: 'active',   color: '#228B22', attendance: 92 },
  { name: 'Preethi R.',   role: 'Barista',        shift: 'Evening',  status: 'active',   color: '#c82878', attendance: 90 },
  { name: 'Senthil V.',   role: 'Cashier',        shift: 'Evening',  status: 'off-day',  color: '#888',    attendance: 88 },
  { name: 'Kavitha M.',   role: 'Helper',         shift: 'Full Day', status: 'active',   color: '#783CB4', attendance: 85 },
];

export function Staff() {
  return (
    <div className="page-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-title">Staff Management</h5>
        <button className="btn-cafe btn">+ Add Staff</button>
      </div>
      <div className="row g-3">
        {staff.map((s, i) => (
          <div className="col-md-6 col-lg-4" key={i}>
            <div className="card-panel">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="staff-avatar" style={{ background: s.color }}>{s.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>{s.role}</div>
                </div>
                <span className={s.status === 'active' ? 'badge-green' : 'badge-red'} style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem' }}>
                  {s.status === 'active' ? '● Active' : '○ Off'}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.78rem', color: '#888' }}>
                <span>⏰ {s.shift} Shift</span>
                <span>Attendance: {s.attendance}%</span>
              </div>
              <div className="progress" style={{ height: 5, borderRadius: 10 }}>
                <div style={{ width: `${s.attendance}%`, height: '100%', background: s.color, borderRadius: 10 }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- SETTINGS ---- */
export function Settings() {
  return (
    <div className="page-content">
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="settings-section">
            <h6>☕ Cafe Profile</h6>
            {[
              { label: 'Cafe Name', value: 'LOSAKO CAFE' },
              { label: 'Address',   value: 'No.12 Rue de la Marine, Pondicherry - 605001' },
              { label: 'Phone',     value: '+91 98400 12345' },
              { label: 'Email',     value: 'hello@losakocafe.in' },
            ].map((f, i) => (
              <div className="mb-2" key={i}>
                <label style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</label>
                <input className="form-control form-control-sm" defaultValue={f.value} />
              </div>
            ))}
          </div>
          <div className="settings-section">
            <h6>🧾 GST Settings</h6>
            <div className="mb-2">
              <label style={{ fontSize: '0.75rem', color: '#888' }}>GSTIN Number</label>
              <input className="form-control form-control-sm" defaultValue="34AABCL1234Z1ZK" />
            </div>
            <div className="row g-2">
              <div className="col-6">
                <label style={{ fontSize: '0.75rem', color: '#888' }}>CGST %</label>
                <input className="form-control form-control-sm" defaultValue="2.5" />
              </div>
              <div className="col-6">
                <label style={{ fontSize: '0.75rem', color: '#888' }}>SGST %</label>
                <input className="form-control form-control-sm" defaultValue="2.5" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="settings-section">
            <h6>🖨️ Printer Settings</h6>
            <div className="mb-2">
              <label style={{ fontSize: '0.75rem', color: '#888' }}>Printer Name</label>
              <input className="form-control form-control-sm" defaultValue="Epson TM-T82" />
            </div>
            <div className="mb-2">
              <label style={{ fontSize: '0.75rem', color: '#888' }}>Paper Width</label>
              <select className="form-select form-select-sm"><option>80mm</option><option>58mm</option></select>
            </div>
          </div>
          <div className="settings-section">
            <h6>💳 Payment Methods</h6>
            {['UPI / QR Code', 'Cash', 'Credit / Debit Card', 'Online Wallet'].map((m, i) => (
              <div key={i} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid #f5f0e8' }}>
                <span style={{ fontSize: '0.85rem' }}>{m}</span>
                <div className="form-check form-switch mb-0">
                  <input className="form-check-input" type="checkbox" defaultChecked={i < 3} />
                </div>
              </div>
            ))}
          </div>
          <div className="settings-section">
            <h6>🏪 Store Settings</h6>
            <div className="row g-2">
              <div className="col-6">
                <label style={{ fontSize: '0.75rem', color: '#888' }}>Opening Time</label>
                <input type="time" className="form-control form-control-sm" defaultValue="07:00" />
              </div>
              <div className="col-6">
                <label style={{ fontSize: '0.75rem', color: '#888' }}>Closing Time</label>
                <input type="time" className="form-control form-control-sm" defaultValue="22:00" />
              </div>
            </div>
          </div>
          <button className="btn-cafe btn w-100">Save All Settings</button>
        </div>
      </div>
    </div>
  );
}
