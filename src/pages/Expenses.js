import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, updateExpense, deleteExpense } from '../store/slices/expenseSlice';
import { showToast } from '../store/slices/uiSlice';
import Modal from '../components/ui/Modal';

const ICONS  = ['🥛','☕','👥','🏠','📦','⚡','🌾','🔧','🧹','💧','🚗','📱','🖥️','🎵'];
const MONTHS = ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06'];
const EMPTY  = { category: '', icon: '📦', monthly: '', month: '2026-06', note: '' };

export default function Expenses() {
  const dispatch   = useDispatch();
  const expenses   = useSelector(s => s.expenses.list);
  const [showModal,  setShowModal]  = useState(false);
  const [editItem,   setEditItem]   = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ ...EMPTY });

  const REVENUE = 168000;
  const total   = expenses.reduce((s, e) => s + e.monthly, 0);
  const profit  = REVENUE - total;
  const margin  = Math.round((profit / REVENUE) * 100);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const openAdd  = () => { setForm({ ...EMPTY }); setEditItem(null); setShowModal(true); };
  const openEdit = (e) => { setForm({ category: e.category, icon: e.icon, monthly: e.monthly, month: e.month, note: e.note || '' }); setEditItem(e); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditItem(null); };

  const handleSave = () => {
    if (!form.category.trim()) { dispatch(showToast({ type: 'error', title: 'Required', message: 'Category name is required' })); return; }
    if (!form.monthly || isNaN(form.monthly) || +form.monthly <= 0) { dispatch(showToast({ type: 'error', title: 'Required', message: 'Enter a valid amount' })); return; }
    if (editItem) {
      dispatch(updateExpense({ ...editItem, ...form, monthly: +form.monthly }));
      dispatch(showToast({ type: 'success', title: 'Updated', message: `${form.category} updated` }));
    } else {
      dispatch(addExpense({ ...form, monthly: +form.monthly }));
      dispatch(showToast({ type: 'success', title: 'Added', message: `${form.category} expense added` }));
    }
    closeModal();
  };

  const confirmDelete = () => {
    dispatch(deleteExpense(deleteItem.id));
    dispatch(showToast({ type: 'success', title: 'Deleted', message: `${deleteItem.category} removed` }));
    setDeleteItem(null);
  };

  const inputStyle  = { border: '1.5px solid var(--beige)', borderRadius: 10, padding: '9px 14px', fontFamily: 'DM Sans,sans-serif', fontSize: '0.88rem', color: 'var(--brown-dark)', background: '#fff', width: '100%', outline: 'none', transition: 'border-color 0.2s' };
  const labelStyle  = { fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5, display: 'block' };
  const focus = e => e.target.style.borderColor = 'var(--orange-main)';
  const blur  = e => e.target.style.borderColor = 'var(--beige)';

  return (
    <div>
      {/* ── Header ── */}
      <div className="page-header d-flex justify-content-between align-items-start">
        <div>
          <h2>Expenses</h2>
          <p>Monthly operational cost breakdown — June 2026</p>
        </div>
        <button className="btn-orange" onClick={openAdd}>
          <i className="bi bi-plus-lg me-2"></i>Add Expense
        </button>
      </div>

      {/* ── KPI Cards ── */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Monthly Expenses', val: `₹${total.toLocaleString()}`,    color: '#c0392b', icon: 'bi-arrow-down-circle' },
          { label: 'Monthly Revenue',  val: `₹${REVENUE.toLocaleString()}`,  color: '#2d8a4e', icon: 'bi-graph-up-arrow'    },
          { label: 'Net Profit',       val: `₹${profit.toLocaleString()}`,   color: '#D4621A', icon: 'bi-cash-coin'         },
          { label: 'Profit Margin',    val: `${margin}%`,                    color: '#8B4513', icon: 'bi-percent'           },
        ].map(s => (
          <div className="col-6 col-md-3" key={s.label}>
            <div className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`bi ${s.icon}`} style={{ fontSize: '1.1rem', color: s.color }}></i>
                </div>
              </div>
              <div style={{ fontSize: '1.4rem', fontFamily: 'Playfair Display', fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 3 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        {/* ── Expense Breakdown ── */}
        <div className="col-lg-8">
          <div className="cafe-card">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="section-title mb-0">Expense Breakdown</div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{expenses.length} categories</span>
            </div>

            {expenses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                <i className="bi bi-wallet2" style={{ fontSize: '2.5rem', opacity: 0.2 }}></i>
                <p style={{ marginTop: 12, fontSize: '0.9rem' }}>No expenses added yet</p>
                <button className="btn-cafe-outline" onClick={openAdd}>Add First Expense</button>
              </div>
            ) : (
              expenses.map(e => (
                <div key={e.id} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <div className="d-flex align-items-center gap-2" style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{e.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--brown-dark)' }}>{e.category}</span>
                        {e.note && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.note}</div>}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3" style={{ flexShrink: 0 }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: 32, textAlign: 'right' }}>{e.pct}%</span>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--brown-dark)', minWidth: 72, textAlign: 'right' }}>
                        ₹{e.monthly.toLocaleString()}
                      </span>
                      {/* Action buttons */}
                      <div className="d-flex gap-1">
                        <button onClick={() => openEdit(e)}
                          style={{ background: 'rgba(92,51,23,0.07)', border: 'none', borderRadius: 7, width: 28, height: 28, cursor: 'pointer', color: 'var(--brown-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-pencil" style={{ fontSize: '0.75rem' }}></i>
                        </button>
                        <button onClick={() => setDeleteItem(e)}
                          style={{ background: 'rgba(192,57,43,0.07)', border: 'none', borderRadius: 7, width: 28, height: 28, cursor: 'pointer', color: '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-trash3" style={{ fontSize: '0.75rem' }}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div style={{ height: 8, background: 'var(--beige)', borderRadius: 10, marginTop: 6 }}>
                    <div style={{ height: '100%', width: `${Math.min(e.pct * 2.5, 100)}%`, background: 'linear-gradient(90deg, var(--orange-main), var(--orange-light))', borderRadius: 10, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Profit Summary ── */}
        <div className="col-lg-4">
          <div className="cafe-card mb-3">
            <div className="section-title">Profit Summary</div>
            <div style={{ background: 'var(--cream-light)', borderRadius: 14, padding: '16px', marginBottom: 16 }}>
              {[
                { label: 'Gross Revenue',   val: `₹${REVENUE.toLocaleString()}`,  color: '#2d8a4e' },
                { label: 'Total Expenses',  val: `-₹${total.toLocaleString()}`,    color: '#c0392b' },
              ].map(r => (
                <div key={r.label} className="d-flex justify-content-between mb-2" style={{ fontSize: '0.87rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                  <span style={{ fontWeight: 700, color: r.color }}>{r.val}</span>
                </div>
              ))}
              <div style={{ borderTop: '1.5px solid var(--beige)', paddingTop: 12, marginTop: 6, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem' }}>
                <span style={{ color: 'var(--brown-dark)' }}>Net Profit</span>
                <span style={{ color: profit >= 0 ? '#2d8a4e' : '#c0392b' }}>₹{profit.toLocaleString()}</span>
              </div>
            </div>
            {/* Margin Circle */}
            <div style={{ textAlign: 'center', background: profit >= 0 ? 'rgba(45,138,78,0.07)' : 'rgba(192,57,43,0.07)', borderRadius: 14, padding: '20px 0' }}>
              <div style={{ fontSize: '2.2rem', fontFamily: 'Playfair Display', fontWeight: 800, color: profit >= 0 ? '#2d8a4e' : '#c0392b' }}>{margin}%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>Net Profit Margin</div>
            </div>
          </div>

          {/* Top 3 Expenses */}
          <div className="cafe-card">
            <div className="section-title">Top Expenses</div>
            {[...expenses].sort((a, b) => b.monthly - a.monthly).slice(0, 3).map((e, i) => (
              <div key={e.id} className="d-flex align-items-center gap-3 mb-3">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: ['rgba(212,98,26,0.12)','rgba(92,51,23,0.1)','rgba(154,106,0,0.1)'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700, color: ['var(--orange-main)','var(--brown-mid)','#9a6a00'][i], flexShrink: 0 }}>
                  #{i + 1}
                </div>
                <span style={{ fontSize: '1.1rem' }}>{e.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--brown-dark)' }}>{e.category}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{e.pct}% of total</div>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--orange-main)', fontSize: '0.88rem', flexShrink: 0 }}>₹{e.monthly.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ADD / EDIT EXPENSE MODAL ══ */}
      <Modal
        show={showModal}
        onClose={closeModal}
        title={editItem ? `Edit — ${editItem.category}` : 'Add New Expense'}
        size="md"
        footer={
          <>
            <button className="btn-cafe-outline" onClick={closeModal}>Cancel</button>
            <button className="btn-orange" onClick={handleSave}>
              <i className={`bi ${editItem ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
              {editItem ? 'Save Changes' : 'Add Expense'}
            </button>
          </>
        }
      >
        {/* Icon Picker */}
        <div className="mb-3">
          <label style={labelStyle}>Icon</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {ICONS.map(ic => (
              <button key={ic} onClick={() => set('icon', ic)}
                style={{ width: 38, height: 38, borderRadius: 9, border: form.icon === ic ? '2px solid var(--orange-main)' : '1.5px solid var(--beige)', background: form.icon === ic ? 'rgba(212,98,26,0.1)' : '#fff', fontSize: '1.2rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                {ic}
              </button>
            ))}
          </div>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-7">
            <label style={labelStyle}>Expense Category *</label>
            <input style={inputStyle} placeholder="e.g. Coffee Beans" value={form.category}
              onChange={e => set('category', e.target.value)} onFocus={focus} onBlur={blur} />
          </div>
          <div className="col-5">
            <label style={labelStyle}>Amount (₹) *</label>
            <input type="number" style={inputStyle} placeholder="e.g. 14000" value={form.monthly}
              onChange={e => set('monthly', e.target.value)} onFocus={focus} onBlur={blur} />
          </div>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <label style={labelStyle}>Month</label>
            <select style={inputStyle} value={form.month} onChange={e => set('month', e.target.value)}>
              {MONTHS.map(m => <option key={m} value={m}>{new Date(m + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</option>)}
            </select>
          </div>
          <div className="col-6">
            <label style={labelStyle}>Note (Optional)</label>
            <input style={inputStyle} placeholder="Brief note..." value={form.note}
              onChange={e => set('note', e.target.value)} onFocus={focus} onBlur={blur} />
          </div>
        </div>

        {/* Live Preview */}
        {form.category && form.monthly && (
          <div style={{ background: 'var(--cream-light)', borderRadius: 12, padding: '14px 16px', border: '1.5px solid var(--beige)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div className="d-flex align-items-center gap-3">
              <span style={{ fontSize: '1.5rem' }}>{form.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--brown-dark)', fontSize: '0.92rem' }}>{form.category}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{form.note || 'No note'}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--orange-main)' }}>₹{(+form.monthly).toLocaleString()}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>per month</div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal show={!!deleteItem} onClose={() => setDeleteItem(null)} title="Delete Expense" size="sm"
        footer={
          <>
            <button className="btn-cafe-outline" onClick={() => setDeleteItem(null)}>Cancel</button>
            <button style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 20px', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans' }} onClick={confirmDelete}>Delete</button>
          </>
        }>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          Delete <strong style={{ color: 'var(--brown-dark)' }}>{deleteItem?.category}</strong> expense of <strong style={{ color: 'var(--orange-main)' }}>₹{deleteItem?.monthly?.toLocaleString()}</strong>? This cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
