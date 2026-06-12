import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from '../store/slices/productSlice';
import { showToast } from '../store/slices/uiSlice';
import Modal from '../components/ui/Modal';

const CATEGORIES = ['Hot Coffee', 'Cold Beverages', 'Bakery', 'Snacks', 'Desserts'];
const TAGS       = ['', 'Bestseller', 'Trending', 'Popular', 'New'];
const STOCKS     = ['Available', 'Low Stock', 'Out of Stock'];
const EMOJIS     = ['☕', '🥛', '🧋', '🥤', '🧊', '🥐', '🥪', '🍰', '🧁', '🧇', '🍵', '🫖'];

const tagColor  = { Bestseller: 'badge-orange', Trending: 'badge-green', Popular: 'badge-brown', New: 'badge-amber' };
const stockColor= { Available: 'badge-green', 'Low Stock': 'badge-amber', 'Out of Stock': 'badge-red' };

const EMPTY = { name: '', cat: 'Hot Coffee', price: '', stock: 'Available', tag: '', emoji: '☕' };

export default function Products() {
  const dispatch   = useDispatch();
  const products   = useSelector(s => s.products.list);
  const [search, setSearch]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem]   = useState(null);
  const [form, setForm]           = useState({ ...EMPTY });
  const [deleteId, setDeleteId]   = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openAdd = () => { setForm({ ...EMPTY }); setEditItem(null); setShowModal(true); };
  const openEdit = (p) => { setForm({ ...p }); setEditItem(p); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditItem(null); };

  const handleSave = () => {
    if (!form.name.trim()) { dispatch(showToast({ type: 'error', title: 'Required', message: 'Product name is required' })); return; }
    if (!form.price || isNaN(form.price) || +form.price <= 0) { dispatch(showToast({ type: 'error', title: 'Required', message: 'Enter a valid price' })); return; }
    if (editItem) {
      dispatch(updateProduct({ ...form, price: +form.price }));
      dispatch(showToast({ type: 'success', title: 'Updated', message: `${form.name} updated successfully` }));
    } else {
      dispatch(addProduct({ ...form, price: +form.price }));
      dispatch(showToast({ type: 'success', title: 'Added', message: `${form.name} added to menu` }));
    }
    closeModal();
  };

  const handleDelete = (id, name) => {
    setDeleteId({ id, name });
  };
  const confirmDelete = () => {
    dispatch(deleteProduct(deleteId.id));
    dispatch(showToast({ type: 'success', title: 'Deleted', message: `${deleteId.name} removed` }));
    setDeleteId(null);
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase()));
  const inputStyle = { border: '1.5px solid var(--beige)', borderRadius: 10, padding: '9px 14px', fontFamily: 'DM Sans,sans-serif', fontSize: '0.88rem', color: 'var(--brown-dark)', background: '#fff', width: '100%', outline: 'none', transition: 'border-color 0.2s' };
  const labelStyle = { fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5, display: 'block' };

  return (
    <div>
      {/* Header */}
      <div className="page-header d-flex justify-content-between align-items-start">
        <div>
          <h2>Products</h2>
          <p>Manage your cafe menu — {products.length} items</p>
        </div>
        <button className="btn-orange" onClick={openAdd}>
          <i className="bi bi-plus-lg me-2"></i>Add Product
        </button>
      </div>

      {/* Search + Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <div className="cafe-card" style={{ padding: '12px 16px' }}>
            <div style={{ position: 'relative' }}>
              <i className="bi bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.88rem' }}></i>
              <input className="cafe-input" style={{ paddingLeft: 36 }} placeholder="Search products or category..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        {[
          { label: 'Total Products',  val: products.length },
          { label: 'Available',       val: products.filter(p => p.stock === 'Available').length },
          { label: 'Low Stock',       val: products.filter(p => p.stock === 'Low Stock').length },
        ].map(s => (
          <div className="col" key={s.label}>
            <div className="stat-card" style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: '1.3rem', fontFamily: 'Playfair Display', fontWeight: 700 }}>{s.val}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="cafe-card">
        <div style={{ overflowX: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
              <i className="bi bi-cup" style={{ fontSize: '2.5rem', opacity: 0.2 }}></i>
              <p style={{ marginTop: 12 }}>No products found</p>
              <button className="btn-cafe-outline" onClick={openAdd}>Add First Product</button>
            </div>
          ) : (
            <table className="cafe-table">
              <thead>
                <tr>{['Product', 'Category', 'Price', 'Stock', 'Tag', 'Actions'].map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ fontSize: '1.4rem' }}>{p.emoji}</span>
                        <span style={{ fontWeight: 600, color: 'var(--brown-dark)', fontSize: '0.9rem' }}>{p.name}</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p.cat}</span></td>
                    <td><span style={{ fontWeight: 700, color: 'var(--orange-main)', fontSize: '0.9rem' }}>₹{p.price}</span></td>
                    <td><span className={`${stockColor[p.stock]} px-2 py-1 rounded-2`} style={{ fontSize: '0.75rem', fontWeight: 600 }}>{p.stock}</span></td>
                    <td>{p.tag ? <span className={`${tagColor[p.tag]} px-2 py-1 rounded-2`} style={{ fontSize: '0.75rem', fontWeight: 600 }}>{p.tag}</span> : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <button onClick={() => openEdit(p)} title="Edit"
                          style={{ background: 'rgba(92,51,23,0.08)', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: 'var(--brown-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-pencil" style={{ fontSize: '0.85rem' }}></i>
                        </button>
                        <button onClick={() => handleDelete(p.id, p.name)} title="Delete"
                          style={{ background: 'rgba(192,57,43,0.08)', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-trash3" style={{ fontSize: '0.85rem' }}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal show={showModal} onClose={closeModal} title={editItem ? `Edit — ${editItem.name}` : 'Add New Product'}
        footer={
          <>
            <button className="btn-cafe-outline" onClick={closeModal}>Cancel</button>
            <button className="btn-orange" onClick={handleSave}>
              <i className={`bi ${editItem ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
              {editItem ? 'Save Changes' : 'Add Product'}
            </button>
          </>
        }>
        {/* Emoji Picker */}
        <div className="mb-3">
          <label style={labelStyle}>Icon / Emoji</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => set('emoji', e)}
                style={{ width: 40, height: 40, borderRadius: 10, border: form.emoji === e ? '2px solid var(--orange-main)' : '1.5px solid var(--beige)', background: form.emoji === e ? 'rgba(212,98,26,0.1)' : '#fff', fontSize: '1.3rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div className="row g-2">
          <div className="col-8">
            <label style={labelStyle}>Product Name *</label>
            <input style={inputStyle} placeholder="e.g. Iced Cappuccino" value={form.name} onChange={e => set('name', e.target.value)}
              onFocus={e => e.target.style.borderColor = 'var(--orange-main)'} onBlur={e => e.target.style.borderColor = 'var(--beige)'} />
          </div>
          <div className="col-4">
            <label style={labelStyle}>Price (₹) *</label>
            <input type="number" style={inputStyle} placeholder="120" value={form.price} onChange={e => set('price', e.target.value)}
              onFocus={e => e.target.style.borderColor = 'var(--orange-main)'} onBlur={e => e.target.style.borderColor = 'var(--beige)'} />
          </div>
          <div className="col-6">
            <label style={labelStyle}>Category</label>
            <select style={inputStyle} value={form.cat} onChange={e => set('cat', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-6">
            <label style={labelStyle}>Stock Status</label>
            <select style={inputStyle} value={form.stock} onChange={e => set('stock', e.target.value)}>
              {STOCKS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-12">
            <label style={labelStyle}>Tag (Optional)</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TAGS.map(t => (
                <button key={t} onClick={() => set('tag', t)}
                  style={{ padding: '6px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', border: 'none',
                    background: form.tag === t ? 'var(--orange-main)' : 'var(--cream-light)',
                    color: form.tag === t ? '#fff' : 'var(--text-muted)' }}>
                  {t || 'None'}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Preview */}
        {form.name && (
          <div style={{ marginTop: 16, background: 'var(--cream-light)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, border: '1.5px solid var(--beige)' }}>
            <span style={{ fontSize: '1.8rem' }}>{form.emoji}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--brown-dark)' }}>{form.name || 'Product Name'}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{form.cat} · {form.stock}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontWeight: 800, fontSize: '1rem', color: 'var(--orange-main)' }}>₹{form.price || '—'}</div>
            {form.tag && <span className={`${tagColor[form.tag]} px-2 py-1 rounded-2`} style={{ fontSize: '0.72rem', fontWeight: 600 }}>{form.tag}</span>}
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal show={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete" size="sm"
        footer={
          <>
            <button className="btn-cafe-outline" onClick={() => setDeleteId(null)}>Cancel</button>
            <button style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 20px', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans' }} onClick={confirmDelete}>
              Delete
            </button>
          </>
        }>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          Are you sure you want to delete <strong style={{ color: 'var(--brown-dark)' }}>{deleteId?.name}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
