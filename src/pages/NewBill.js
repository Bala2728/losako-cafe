import React, { useState } from 'react';

const menuItems = [
  { id: 1,  name: 'Cappuccino',   price: 120, emoji: '☕', cat: 'Hot Coffee'      },
  { id: 2,  name: 'Latte',        price: 130, emoji: '🥛', cat: 'Hot Coffee'      },
  { id: 3,  name: 'Espresso',     price: 90,  emoji: '☕', cat: 'Hot Coffee'      },
  { id: 4,  name: 'Cold Coffee',  price: 150, emoji: '🧋', cat: 'Cold Beverages'  },
  { id: 5,  name: 'Cold Brew',    price: 160, emoji: '🥤', cat: 'Cold Beverages'  },
  { id: 6,  name: 'Croissant',    price: 80,  emoji: '🥐', cat: 'Bakery'          },
  { id: 7,  name: 'Sandwich',     price: 110, emoji: '🥪', cat: 'Snacks'          },
  { id: 8,  name: 'Brownie Cake', price: 100, emoji: '🍰', cat: 'Desserts'        },
  { id: 9,  name: 'Muffin',       price: 70,  emoji: '🧁', cat: 'Bakery'          },
  { id: 10, name: 'Iced Mocha',   price: 160, emoji: '🧊', cat: 'Cold Beverages'  },
  { id: 11, name: 'Waffle',       price: 120, emoji: '🧇', cat: 'Desserts'        },
  { id: 12, name: 'Filter Coffee',price: 60,  emoji: '☕', cat: 'Hot Coffee'      },
];

const cats = ['All', 'Hot Coffee', 'Cold Beverages', 'Bakery', 'Snacks', 'Desserts'];
const GST_RATE = 5;

export default function NewBill() {
  const [cart, setCart] = useState({});
  const [selectedCat, setSelectedCat] = useState('All');
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState('upi');
  const [showReceipt, setShowReceipt] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');

  const filtered = selectedCat === 'All' ? menuItems : menuItems.filter(m => m.cat === selectedCat);

  const addItem = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeItem = (id) => setCart(prev => {
    const n = { ...prev };
    if (n[id] > 1) n[id]--;
    else delete n[id];
    return n;
  });

  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find(m => m.id === +id);
    return sum + (item ? item.price * qty : 0);
  }, 0);
  const discountAmt = (subtotal * discount) / 100;
  const taxableAmt = subtotal - discountAmt;
  const gst = (taxableAmt * GST_RATE) / 100;
  const total = taxableAmt + gst;
  const cartItems = Object.entries(cart).map(([id, qty]) => ({ ...menuItems.find(m => m.id === +id), qty }));
  const billNo = `LC-${Date.now().toString().slice(-6)}`;

  if (showReceipt) {
    return (
      <div>
        <div className="page-header">
          <h2>Bill Receipt</h2>
          <p>Print or share the bill with your customer</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="cafe-card text-center" style={{ fontFamily: 'monospace', borderTop: '4px solid var(--orange-main)' }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>STARTUP CAFE • PONDICHERRY</div>
              <div style={{ fontSize: '1.8rem', fontFamily: 'Playfair Display', fontWeight: 700, color: 'var(--brown-dark)', marginTop: 4 }}>LOSAKO CAFE</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>12, Rue Bussy, White Town, Pondicherry – 605001</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>GSTIN: 33AABCL1234B1ZX | Ph: +91 98765 43210</div>
              <hr style={{ borderColor: 'var(--beige)', borderStyle: 'dashed', margin: '12px 0' }} />
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>Bill No: <b style={{ color: 'var(--brown-dark)' }}>{billNo}</b></span>
                <span>{new Date().toLocaleDateString('en-IN')}</span>
              </div>
              {customerName && <div className="small text-start text-muted mb-2">Customer: <b style={{ color: 'var(--brown-dark)' }}>{customerName}</b></div>}
              <hr style={{ borderColor: 'var(--beige)', borderStyle: 'dashed', margin: '10px 0' }} />
              <table style={{ width: '100%', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ color: 'var(--text-muted)', borderBottom: '1px dashed var(--beige)' }}>
                    <th style={{ textAlign: 'left', paddingBottom: 6, fontWeight: 600 }}>Item</th>
                    <th style={{ textAlign: 'center', paddingBottom: 6, fontWeight: 600 }}>Qty</th>
                    <th style={{ textAlign: 'right', paddingBottom: 6, fontWeight: 600 }}>Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td style={{ textAlign: 'left', padding: '4px 0', color: 'var(--brown-dark)' }}>{item.emoji} {item.name}</td>
                      <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>x{item.qty}</td>
                      <td style={{ textAlign: 'right', color: 'var(--brown-dark)' }}>₹{item.price * item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr style={{ borderColor: 'var(--beige)', borderStyle: 'dashed', margin: '10px 0' }} />
              {[
                ['Subtotal', `₹${subtotal}`],
                discount > 0 ? [`Discount (${discount}%)`, `-₹${discountAmt.toFixed(0)}`] : null,
                [`GST (${GST_RATE}%)`, `₹${gst.toFixed(0)}`],
              ].filter(Boolean).map(([k, v]) => (
                <div key={k} className="d-flex justify-content-between small mb-1" style={{ color: 'var(--text-muted)' }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              <div className="d-flex justify-content-between mt-2" style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--brown-dark)' }}>
                <span>TOTAL</span><span>₹{total.toFixed(0)}</span>
              </div>
              <div className="small mt-1" style={{ color: 'var(--text-muted)' }}>Payment: <b style={{ color: 'var(--orange-main)', textTransform: 'uppercase' }}>{payment}</b></div>
              <hr style={{ borderColor: 'var(--beige)', borderStyle: 'dashed', margin: '12px 0' }} />
              <div style={{ fontSize: '2.5rem' }}>▪ ▪ ▪ ▪<br /><span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Scan QR to Pay</span></div>
              <div style={{ marginTop: 10, fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Thank you for visiting LOSAKO CAFE!<br />
                ☕ "Every cup tells a story"
              </div>
            </div>
            <div className="d-flex gap-2 mt-3">
              <button className="btn-cafe flex-fill" onClick={() => window.print()}>
                <i className="bi bi-printer me-2"></i>Print Bill
              </button>
              <button className="btn-cafe-outline flex-fill" onClick={() => { setCart({}); setDiscount(0); setShowReceipt(false); setCustomerName(''); setPhone(''); }}>
                New Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>New Bill</h2>
        <p>Select items and generate a bill for your customer</p>
      </div>
      <div className="row g-3">
        {/* Menu */}
        <div className="col-lg-7">
          {/* Category Filter */}
          <div className="d-flex gap-2 flex-wrap mb-3">
            {cats.map(c => (
              <button key={c} onClick={() => setSelectedCat(c)}
                className={selectedCat === c ? 'btn-orange' : 'btn-cafe-outline'}
                style={{ padding: '6px 14px', fontSize: '0.82rem', borderRadius: 20 }}>
                {c}
              </button>
            ))}
          </div>
          <div className="row g-2">
            {filtered.map(item => (
              <div className="col-6 col-md-4" key={item.id}>
                <div className="cafe-card text-center" style={{ padding: '16px 12px', cursor: 'pointer', border: cart[item.id] ? '2px solid var(--orange-main)' : '1px solid rgba(92,51,23,0.08)' }}
                  onClick={() => addItem(item.id)}>
                  <div style={{ fontSize: '2rem', marginBottom: 6 }}>{item.emoji}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--brown-dark)' }}>{item.name}</div>
                  <div style={{ color: 'var(--orange-main)', fontWeight: 700, fontSize: '0.9rem', marginTop: 4 }}>₹{item.price}</div>
                  {cart[item.id] && (
                    <div style={{ marginTop: 8 }}>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                          style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: 'var(--beige)', color: 'var(--brown-dark)', fontWeight: 700, cursor: 'pointer' }}>−</button>
                        <span style={{ fontWeight: 700, color: 'var(--orange-main)', minWidth: 20, textAlign: 'center' }}>{cart[item.id]}</span>
                        <button onClick={(e) => { e.stopPropagation(); addItem(item.id); }}
                          style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: 'var(--orange-main)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Summary */}
        <div className="col-lg-5">
          <div className="cafe-card" style={{ position: 'sticky', top: 20 }}>
            <div className="section-title">Bill Summary</div>

            {/* Customer */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Customer Name</label>
                <input className="cafe-input" placeholder="Optional" value={customerName} onChange={e => setCustomerName(e.target.value)} />
              </div>
              <div className="col-6">
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Phone Number</label>
                <input className="cafe-input" placeholder="Optional" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            {/* Items */}
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
                <i className="bi bi-cup" style={{ fontSize: '2rem', opacity: 0.3 }}></i>
                <p style={{ fontSize: '0.85rem', marginTop: 8 }}>No items selected yet</p>
              </div>
            ) : (
              <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 12 }}>
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2"
                    style={{ background: 'var(--cream-light)', padding: '8px 12px', borderRadius: 10 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.emoji} {item.name}</span>
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>x{item.qty}</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--orange-main)', minWidth: 55, textAlign: 'right' }}>₹{item.price * item.qty}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Discount */}
            <div className="mb-3">
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>Discount (%)</label>
              <input type="number" className="cafe-input" min="0" max="50" value={discount}
                onChange={e => setDiscount(Math.min(50, +e.target.value))} />
            </div>

            {/* Totals */}
            <div style={{ background: 'var(--cream-light)', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
              {[
                ['Subtotal', `₹${subtotal}`],
                discount > 0 && [`Discount (${discount}%)`, `-₹${discountAmt.toFixed(0)}`],
                [`GST (${GST_RATE}%)`, `₹${gst.toFixed(0)}`],
              ].filter(Boolean).map(([k, v]) => (
                <div key={k} className="d-flex justify-content-between mb-1" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              <hr style={{ borderColor: 'var(--beige)', margin: '8px 0' }} />
              <div className="d-flex justify-content-between" style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--brown-dark)' }}>
                <span>Total</span><span style={{ color: 'var(--orange-main)' }}>₹{total.toFixed(0)}</span>
              </div>
            </div>

            {/* Payment */}
            <div className="mb-3">
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>Payment Method</label>
              <div className="d-flex gap-2">
                {['upi', 'cash', 'card'].map(p => (
                  <button key={p} onClick={() => setPayment(p)}
                    style={{
                      flex: 1, padding: '9px 0', borderRadius: 10, fontWeight: 600, fontSize: '0.82rem',
                      border: payment === p ? 'none' : '1.5px solid var(--beige)',
                      background: payment === p ? 'var(--orange-main)' : '#fff',
                      color: payment === p ? '#fff' : 'var(--brown-dark)',
                      cursor: 'pointer', textTransform: 'uppercase'
                    }}>
                    {p === 'upi' ? '📱' : p === 'cash' ? '💵' : '💳'} {p}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-orange w-100" style={{ padding: 14, fontSize: '1rem' }}
              disabled={cartItems.length === 0}
              onClick={() => setShowReceipt(true)}>
              <i className="bi bi-receipt me-2"></i>Generate Bill — ₹{total.toFixed(0)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
