import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '../store/slices/uiSlice';
import Modal from '../components/ui/Modal';

const initCategories = [
  { id: 1, name: 'Hot Coffee',     emoji: '☕', count: 4, color: '#D4621A', desc: 'Cappuccino, Latte, Espresso, Filter Coffee' },
  { id: 2, name: 'Cold Beverages', emoji: '🧋', count: 3, color: '#1a6cb5', desc: 'Cold Coffee, Cold Brew, Iced Mocha'         },
  { id: 3, name: 'Desserts',       emoji: '🍰', count: 2, color: '#b55a1a', desc: 'Brownie Cake, Waffle'                        },
  { id: 4, name: 'Snacks',         emoji: '🥪', count: 1, color: '#1a8a4e', desc: 'Sandwich'                                   },
  { id: 5, name: 'Bakery',         emoji: '🥐', count: 2, color: '#8a6a1a', desc: 'Croissant, Muffin'                          },
];

const EMOJIS = ['☕','🧋','🍰','🥪','🥐','🫖','🍵','🧁','🥤','🧊','🍩','🥗'];

const EMPTY = { name: '', emoji: '☕', desc: '' };

export default function Categories() {
  const dispatch = useDispatch();
  const [cats, setCats] = useState(initCategories);
  const [nextId, setNextId] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [form, setForm] = useState({ ...EMPTY });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openAdd = () => { setForm({ ...EMPTY }); setEditItem(null); setShowModal(true); };
  const openEdit = (c) => { setForm({ name: c.name, emoji: c.emoji, desc: c.desc }); setEditItem(c); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditItem(null); };

  const handleSave = () => {
    if (!form.name.trim()) { dispatch(showToast({ type: 'error', title: 'Required', message: 'Category name is required' })); return; }
    if (editItem) {
      setCats(cats.map(c => c.id === editItem.id ? { ...c, name: form.name, emoji: form.emoji, desc: form.desc } : c));
      dispatch(showToast({ type: 'success', title: 'Updated', message: `${form.name} updated` }));
    } else {
      const colors = ['#D4621A','#1a6cb5','#b55a1a','#1a8a4e','#8a6a1a','#6a1ab5'];
      setCats([...cats, { id: nextId, name: form.name, emoji: form.emoji, desc: form.desc, count: 0, color: colors[nextId % colors.length] }]);
      setNextId(n => n + 1);
      dispatch(showToast({ type: 'success', title: 'Added', message: `${form.name} category created` }));
    }
    closeModal();
  };

  const confirmDelete = () => {
    setCats(cats.filter(c => c.id !== deleteItem.id));
    dispatch(showToast({ type: 'success', title: 'Deleted', message: `${deleteItem.name} removed` }));
    setDeleteItem(null);
  };

  const inputStyle = { border: '1.5px solid var(--beige)', borderRadius: 10, padding: '9px 14px', fontFamily: 'DM Sans,sans-serif', fontSize: '0.88rem', color: 'var(--brown-dark)', background: '#fff', width: '100%', outline: 'none', transition: 'border-color 0.2s' };
  const labelStyle = { fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5, display: 'block' };

  return (
    <div>
      {/* Header */}
      <div className="page-header d-flex justify-content-between align-items-start">
        <div>
          <h2>Categories</h2>
          <p>Organize your menu into categories — {cats.length} categories</p>
        </div>
        <button className="btn-orange" onClick={openAdd}>
          <i className="bi bi-plus-lg me-2"></i>Add Category
        </button>
      </div>

      {/* Summary Row */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Categories', val: cats.length,                           icon: 'bi-grid-1x2',    color: '#D4621A' },
          { label: 'Total Products',   val: cats.reduce((s, c) => s + c.count, 0), icon: 'bi-cup-hot',     color: '#8B4513' },
          { label: 'Most Items',       val: [...cats].sort((a,b) => b.count-a.count)[0]?.name || '—', icon: 'bi-star',  color: '#9a6a00' },
        ].map(s => (
          <div className="col-md-4" key={s.label}>
            <div className="stat-card d-flex align-items-center gap-3">
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`bi ${s.icon}`} style={{ fontSize: '1.2rem', color: s.color }}></i>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontFamily: 'Playfair Display', fontWeight: 700, color: 'var(--brown-dark)' }}>{s.val}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Cards — NO blue active tab, clean style */}
      <div className="row g-3">
        {cats.map(cat => (
          <div className="col-md-6 col-xl-4" key={cat.id}>
            <div className="cafe-card h-100" style={{ borderLeft: `4px solid ${cat.color}`, borderTop: 'none', borderRight: 'none', borderBottom: 'none', outline: '1px solid rgba(92,51,23,0.07)', borderRadius: 16 }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{ width: 52, height: 52, borderRadius: 14, background: cat.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem', flexShrink: 0 }}>
                  {cat.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--brown-dark)' }}>{cat.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ background: cat.color + '15', color: cat.color, padding: '2px 8px', borderRadius: 20, fontWeight: 600, fontSize: '0.72rem' }}>
                      {cat.count} items
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-1" style={{ flexShrink: 0 }}>
                  <button onClick={() => openEdit(cat)}
                    style={{ background: 'rgba(92,51,23,0.07)', border: 'none', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', color: 'var(--brown-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-pencil" style={{ fontSize: '0.8rem' }}></i>
                  </button>
                  <button onClick={() => setDeleteItem(cat)}
                    style={{ background: 'rgba(192,57,43,0.07)', border: 'none', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', color: '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-trash3" style={{ fontSize: '0.8rem' }}></i>
                  </button>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, paddingLeft: 4 }}>{cat.desc || 'No items added yet'}</p>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div className="col-md-6 col-xl-4">
          <div className="cafe-card h-100 d-flex align-items-center justify-content-center"
            style={{ border: '2px dashed var(--beige)', cursor: 'pointer', minHeight: 120 }}
            onClick={openAdd}>
            <div className="text-center" style={{ color: 'var(--text-muted)' }}>
              <i className="bi bi-plus-circle" style={{ fontSize: '1.8rem', opacity: 0.5 }}></i>
              <div style={{ fontSize: '0.88rem', marginTop: 8, fontWeight: 500 }}>Add New Category</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal show={showModal} onClose={closeModal}
        title={editItem ? `Edit — ${editItem.name}` : 'Add New Category'}
        footer={
          <>
            <button className="btn-cafe-outline" onClick={closeModal}>Cancel</button>
            <button className="btn-orange" onClick={handleSave}>
              <i className={`bi ${editItem ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
              {editItem ? 'Save Changes' : 'Add Category'}
            </button>
          </>
        }>
        <div>
          {/* Emoji Picker */}
          <div className="mb-3">
            <label style={labelStyle}>Category Icon</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {EMOJIS.map(e => (
                <button key={e} onClick={() => set('emoji', e)}
                  style={{ width: 40, height: 40, borderRadius: 10, border: form.emoji === e ? '2px solid var(--orange-main)' : '1.5px solid var(--beige)', background: form.emoji === e ? 'rgba(212,98,26,0.1)' : '#fff', fontSize: '1.3rem', cursor: 'pointer' }}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label style={labelStyle}>Category Name *</label>
            <input style={inputStyle} placeholder="e.g. Hot Coffee" value={form.name} onChange={e => set('name', e.target.value)}
              onFocus={e => e.target.style.borderColor = 'var(--orange-main)'} onBlur={e => e.target.style.borderColor = 'var(--beige)'} />
          </div>
          <div>
            <label style={labelStyle}>Description (Optional)</label>
            <input style={inputStyle} placeholder="e.g. Cappuccino, Latte, Espresso" value={form.desc} onChange={e => set('desc', e.target.value)}
              onFocus={e => e.target.style.borderColor = 'var(--orange-main)'} onBlur={e => e.target.style.borderColor = 'var(--beige)'} />
          </div>
          {/* Preview */}
          {form.name && (
            <div style={{ marginTop: 16, background: 'var(--cream-light)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.8rem' }}>{form.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--brown-dark)' }}>{form.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{form.desc || 'No description'}</div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal show={!!deleteItem} onClose={() => setDeleteItem(null)} title="Delete Category" size="sm"
        footer={
          <>
            <button className="btn-cafe-outline" onClick={() => setDeleteItem(null)}>Cancel</button>
            <button style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 20px', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans' }} onClick={confirmDelete}>Delete</button>
          </>
        }>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          Are you sure you want to delete <strong style={{ color: 'var(--brown-dark)' }}>{deleteItem?.name}</strong>? This cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
