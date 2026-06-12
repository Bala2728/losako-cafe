import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBill, updateBill, setViewMode } from '../../store/slices/billingSlice';
import { showToast } from '../../store/slices/uiSlice';

const EMPTY_FORM = { customer: '', phone: '', email: '', items: [], discount: 0, taxRate: 5, payment: 'UPI', type: 'Walk-in', status: 'Paid', notes: '' };

export default function BillForm({ editBill = null }) {
  const dispatch = useDispatch();
  const products = useSelector(s => s.products.list);
  const [form, setForm] = useState(editBill ? { ...editBill } : { ...EMPTY_FORM });
  const [itemSearch, setItemSearch] = useState('');
  const [showItemPicker, setShowItemPicker] = useState(false);

  useEffect(() => { if (editBill) setForm({ ...editBill }); }, [editBill]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addItem = (prod) => {
    const exists = form.items.findIndex(i => i.name === prod.name);
    if (exists !== -1) {
      const items = [...form.items];
      items[exists] = { ...items[exists], qty: items[exists].qty + 1 };
      set('items', items);
    } else {
      set('items', [...form.items, { name: prod.name, emoji: prod.emoji, qty: 1, price: prod.price }]);
    }
    setShowItemPicker(false);
    setItemSearch('');
  };

  const updateQty = (idx, qty) => {
    if (qty < 1) { removeItem(idx); return; }
    const items = [...form.items];
    items[idx] = { ...items[idx], qty };
    set('items', items);
  };

  const removeItem = (idx) => set('items', form.items.filter((_, i) => i !== idx));

  const subtotal    = form.items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = Math.round((subtotal * form.discount) / 100);
  const taxable     = subtotal - discountAmt;
  const taxAmt      = Math.round((taxable * form.taxRate) / 100);
  const total       = taxable + taxAmt;

  const filteredProds = products.filter(p =>
    p.name.toLowerCase().includes(itemSearch.toLowerCase()) &&
    !form.items.find(i => i.name === p.name)
  );

  const handleSubmit = () => {
    if (!form.customer.trim()) { dispatch(showToast({ type: 'error', title: 'Validation', message: 'Customer name is required' })); return; }
    if (form.items.length === 0) { dispatch(showToast({ type: 'error', title: 'Validation', message: 'Add at least one item' })); return; }
    const billData = { ...form, subtotal, discountAmt, taxAmt, total };
    if (editBill) {
      dispatch(updateBill(billData));
      dispatch(showToast({ type: 'success', title: 'Bill Updated', message: `Bill ${editBill.id} updated successfully` }));
    } else {
      dispatch(createBill(billData));
      dispatch(showToast({ type: 'success', title: 'Bill Created', message: 'New bill generated!' }));
    }
  };

  const inputStyle = { border: '1.5px solid var(--beige)', borderRadius: 10, padding: '9px 14px', fontFamily: 'DM Sans,sans-serif', fontSize: '0.88rem', color: 'var(--brown-dark)', background: '#fff', width: '100%', outline: 'none', transition: 'border-color 0.2s' };
  const labelStyle = { fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5, display: 'block' };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <button onClick={() => dispatch(setViewMode('list'))} style={{ background: 'rgba(92,51,23,0.08)', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: 'var(--brown-dark)', fontSize: '0.85rem', fontWeight: 500 }}>
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>
        <div>
          <h4 style={{ margin: 0, fontFamily: 'Playfair Display', fontWeight: 700 }}>{editBill ? `Edit Bill — ${editBill.id}` : 'Create New Bill'}</h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>{editBill ? 'Modify bill details below' : 'Fill in customer details and add items'}</p>
        </div>
      </div>

      <div className="row g-3">
        {/* Left: Form */}
        <div className="col-lg-7">
          {/* Customer Info */}
          <div className="cafe-card mb-3">
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--brown-dark)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="bi bi-person-circle" style={{ color: 'var(--orange-main)' }}></i> Customer Information
            </div>
            <div className="row g-2">
              <div className="col-md-6">
                <label style={labelStyle}>Customer Name *</label>
                <input style={inputStyle} placeholder="e.g. Priya Krishnamurthy" value={form.customer} onChange={e => set('customer', e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'var(--orange-main)'} onBlur={e => e.target.style.borderColor = 'var(--beige)'} />
              </div>
              <div className="col-md-6">
                <label style={labelStyle}>Phone Number</label>
                <input style={inputStyle} placeholder="98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'var(--orange-main)'} onBlur={e => e.target.style.borderColor = 'var(--beige)'} />
              </div>
              <div className="col-md-6">
                <label style={labelStyle}>Order Type</label>
                <select style={inputStyle} value={form.type} onChange={e => set('type', e.target.value)}>
                  <option>Walk-in</option><option>Online</option><option>Takeaway</option>
                </select>
              </div>
              <div className="col-md-6">
                <label style={labelStyle}>Payment Method</label>
                <select style={inputStyle} value={form.payment} onChange={e => set('payment', e.target.value)}>
                  <option>UPI</option><option>Cash</option><option>Card</option>
                </select>
              </div>
              {editBill && (
                <div className="col-12">
                  <label style={labelStyle}>Bill Status</label>
                  <div className="d-flex gap-2">
                    {['Paid', 'Pending', 'Overdue'].map(s => (
                      <button key={s} onClick={() => set('status', s)}
                        style={{ flex: 1, padding: '8px 0', borderRadius: 10, fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', border: 'none',
                          background: form.status === s ? (s === 'Paid' ? '#2d8a4e' : s === 'Pending' ? '#9a6a00' : '#c0392b') : 'var(--cream-light)',
                          color: form.status === s ? '#fff' : 'var(--text-muted)' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="cafe-card mb-3">
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--brown-dark)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span><i className="bi bi-cup-hot me-2" style={{ color: 'var(--orange-main)' }}></i>Order Items</span>
              <button onClick={() => setShowItemPicker(true)}
                style={{ background: 'var(--orange-main)', border: 'none', borderRadius: 8, padding: '6px 14px', color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                <i className="bi bi-plus-lg me-1"></i>Add Item
              </button>
            </div>

            {/* Item Picker Dropdown */}
            {showItemPicker && (
              <div style={{ background: 'var(--cream-light)', borderRadius: 12, padding: 14, marginBottom: 14, border: '1.5px solid var(--beige)' }}>
                <input style={{ ...inputStyle, marginBottom: 10 }} placeholder="🔍 Search products..." autoFocus
                  value={itemSearch} onChange={e => setItemSearch(e.target.value)} />
                <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {filteredProds.map(p => (
                    <button key={p.id} onClick={() => addItem(p)}
                      style={{ background: '#fff', border: '1.5px solid var(--beige)', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500, color: 'var(--brown-dark)', display: 'flex', alignItems: 'center', gap: 6, transition: 'border-color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--orange-main)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--beige)'}>
                      <span>{p.emoji}</span> {p.name} <span style={{ color: 'var(--orange-main)', fontWeight: 700 }}>₹{p.price}</span>
                    </button>
                  ))}
                  {filteredProds.length === 0 && <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No products found</p>}
                </div>
                <button onClick={() => setShowItemPicker(false)} style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            )}

            {form.items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
                <i className="bi bi-bag" style={{ fontSize: '2rem', opacity: 0.25 }}></i>
                <p style={{ fontSize: '0.85rem', marginTop: 8 }}>No items added — click "Add Item" to begin</p>
              </div>
            ) : (
              form.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(232,213,176,0.4)' }}>
                  <span style={{ fontSize: '1.3rem' }}>{item.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--brown-dark)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>₹{item.price} each</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => updateQty(idx, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'var(--beige)', cursor: 'pointer', fontWeight: 700 }}>−</button>
                    <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(idx, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'var(--orange-main)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>+</button>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--orange-main)', minWidth: 60, textAlign: 'right', fontSize: '0.9rem' }}>₹{item.price * item.qty}</div>
                  <button onClick={() => removeItem(idx)} style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: '1rem', padding: '0 4px' }}>
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Notes */}
          <div className="cafe-card">
            <label style={labelStyle}>Notes (Optional)</label>
            <textarea style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} placeholder="Special instructions, allergies, etc."
              value={form.notes} onChange={e => set('notes', e.target.value)} />
          </div>
        </div>

        {/* Right: Summary */}
        <div className="col-lg-5">
          <div className="cafe-card" style={{ position: 'sticky', top: 20 }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--brown-dark)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="bi bi-receipt" style={{ color: 'var(--orange-main)' }}></i> Bill Summary
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <label style={labelStyle}>Discount (%)</label>
                <input type="number" style={inputStyle} min="0" max="50" value={form.discount}
                  onChange={e => set('discount', Math.min(50, +e.target.value || 0))} />
              </div>
              <div className="col-6">
                <label style={labelStyle}>GST Rate (%)</label>
                <select style={inputStyle} value={form.taxRate} onChange={e => set('taxRate', +e.target.value)}>
                  <option value={0}>0%</option><option value={5}>5%</option><option value={12}>12%</option><option value={18}>18%</option>
                </select>
              </div>
            </div>

            <div style={{ background: 'var(--cream-light)', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
              {[
                ['Items', `${form.items.reduce((s, i) => s + i.qty, 0)} (${form.items.length} types)`],
                ['Subtotal', `₹${subtotal}`],
                form.discount > 0 && [`Discount (${form.discount}%)`, `-₹${discountAmt}`],
                [`GST (${form.taxRate}%)`, `₹${taxAmt}`],
              ].filter(Boolean).map(([k, v]) => (
                <div key={k} className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>{k}</span><span style={{ color: 'var(--brown-dark)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--beige)', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.15rem' }}>
                <span style={{ color: 'var(--brown-dark)' }}>Total</span>
                <span style={{ color: 'var(--orange-main)' }}>₹{total}</span>
              </div>
            </div>

            <button className="btn-orange w-100" style={{ padding: 14, fontSize: '1rem', borderRadius: 12 }} onClick={handleSubmit}>
              <i className={`bi ${editBill ? 'bi-check-lg' : 'bi-receipt-cutoff'} me-2`}></i>
              {editBill ? 'Update Bill' : `Generate Bill — ₹${total}`}
            </button>

            {editBill && (
              <button className="btn-cafe-outline w-100 mt-2" style={{ padding: 10 }} onClick={() => dispatch(setViewMode('list'))}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
