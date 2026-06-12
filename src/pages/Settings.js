import React, { useState } from 'react';

export default function Settings() {
  const [gst, setGst] = useState('5');
  const [cafeName, setCafeName] = useState('LOSAKO CAFE');
  const [address, setAddress] = useState('12, Rue Bussy, White Town, Pondicherry – 605001');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [gstin, setGstin] = useState('33AABCL1234B1ZX');
  const [printer, setPrinter] = useState('Thermal 80mm');
  const [currency, setCurrency] = useState('INR (₹)');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const Section = ({ title, children }) => (
    <div className="cafe-card mb-3">
      <div className="section-title">{title}</div>
      {children}
    </div>
  );

  const Field = ({ label, value, onChange, type = 'text' }) => (
    <div className="mb-3">
      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: 6, display: 'block' }}>{label}</label>
      {type === 'select' ? (
        <select className="cafe-input" value={value} onChange={e => onChange(e.target.value)}>
          {label === 'Printer Type' && ['Thermal 80mm', 'Thermal 58mm', 'Network Printer', 'USB Printer'].map(o => <option key={o}>{o}</option>)}
          {label === 'Currency' && ['INR (₹)', 'USD ($)', 'EUR (€)'].map(o => <option key={o}>{o}</option>)}
          {label === 'GST Rate (%)' && ['0', '5', '12', '18'].map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input className="cafe-input" value={value} onChange={e => onChange(e.target.value)} />
      )}
    </div>
  );

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-start">
        <div><h2>Settings</h2><p>Configure your cafe profile, billing, and system preferences</p></div>
        <button className="btn-orange" onClick={handleSave}>
          {saved ? <><i className="bi bi-check-lg me-2"></i>Saved!</> : <><i className="bi bi-floppy me-2"></i>Save Changes</>}
        </button>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <Section title="☕ Cafe Profile">
            <Field label="Cafe Name" value={cafeName} onChange={setCafeName} />
            <Field label="Address" value={address} onChange={setAddress} />
            <Field label="Phone Number" value={phone} onChange={setPhone} />
          </Section>

          <Section title="💰 GST & Tax Settings">
            <Field label="GSTIN Number" value={gstin} onChange={setGstin} />
            <Field label="GST Rate (%)" value={gst} onChange={setGst} type="select" />
            <div style={{ background: 'rgba(212,98,26,0.07)', borderRadius: 10, padding: '10px 14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <i className="bi bi-info-circle me-2" style={{ color: 'var(--orange-main)' }}></i>
              Current GST: <strong style={{ color: 'var(--brown-dark)' }}>{gst}%</strong> applied on all taxable items
            </div>
          </Section>
        </div>

        <div className="col-lg-6">
          <Section title="🖨️ Printer Settings">
            <Field label="Printer Type" value={printer} onChange={setPrinter} type="select" />
            <Field label="Currency" value={currency} onChange={setCurrency} type="select" />
            <div className="d-flex gap-2">
              <button className="btn-cafe-outline flex-fill" style={{ fontSize: '0.82rem' }}>
                <i className="bi bi-printer me-2"></i>Test Print
              </button>
              <button className="btn-cafe-outline flex-fill" style={{ fontSize: '0.82rem' }}>
                <i className="bi bi-wifi me-2"></i>Detect Printer
              </button>
            </div>
          </Section>

          <Section title="💳 Payment Methods">
            {[
              { name: 'UPI (PhonePe / GPay / Paytm)', icon: '📱', enabled: true  },
              { name: 'Cash',                          icon: '💵', enabled: true  },
              { name: 'Debit / Credit Card',           icon: '💳', enabled: true  },
              { name: 'QR Code Payment',               icon: '▪️', enabled: true  },
              { name: 'Net Banking',                   icon: '🏦', enabled: false },
            ].map(p => (
              <div key={p.name} className="d-flex justify-content-between align-items-center py-2"
                style={{ borderBottom: '1px solid rgba(232,213,176,0.4)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--brown-dark)' }}>{p.icon} {p.name}</span>
                <span className={p.enabled ? 'badge-green' : 'badge-red'} style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
                  {p.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </Section>
        </div>
      </div>

      <div className="cafe-card" style={{ borderTop: '3px solid var(--orange-main)' }}>
        <div className="d-flex align-items-center gap-3">
          <div style={{ width: 48, height: 48, background: 'var(--orange-main)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#fff' }}>☕</div>
          <div>
            <div style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1.1rem', color: 'var(--brown-dark)' }}>LOSAKO CAFE</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Startup Cafe • Pondicherry • Since 2026 • POS v1.0</div>
          </div>
          <div className="ms-auto text-end">
            <div className="badge-green px-3 py-1 rounded-pill" style={{ fontSize: '0.78rem', fontWeight: 600 }}>● System Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
