import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode, setSelectedBill, deleteBill, setSearchQuery, setStatusFilter } from '../../store/slices/billingSlice';
import { showToast } from '../../store/slices/uiSlice';

const STATUS_STYLE = {
  Paid:    { bg: 'rgba(45,138,78,0.1)',   color: '#2d8a4e', icon: 'bi-check-circle-fill' },
  Pending: { bg: 'rgba(154,106,0,0.1)',   color: '#9a6a00', icon: 'bi-hourglass-split'   },
  Overdue: { bg: 'rgba(192,57,43,0.1)',   color: '#c0392b', icon: 'bi-exclamation-circle-fill' },
};

export default function BillList() {
  const dispatch = useDispatch();
  const { bills, searchQuery, statusFilter } = useSelector(s => s.billing);

  const filtered = bills.filter(b => {
    const matchSearch = !searchQuery || b.id.toLowerCase().includes(searchQuery.toLowerCase()) || b.customer.toLowerCase().includes(searchQuery.toLowerCase()) || b.phone?.includes(searchQuery);
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totals = { all: bills.length, Paid: bills.filter(b => b.status === 'Paid').length, Pending: bills.filter(b => b.status === 'Pending').length, Overdue: bills.filter(b => b.status === 'Overdue').length };
  const revenue = bills.filter(b => b.status === 'Paid').reduce((s, b) => s + b.total, 0);

  const handleDelete = (id) => {
    if (window.confirm(`Delete bill ${id}? This cannot be undone.`)) {
      dispatch(deleteBill(id));
      dispatch(showToast({ type: 'success', title: 'Deleted', message: `Bill ${id} deleted` }));
    }
  };

  const handleView = (bill) => { dispatch(setSelectedBill(bill)); dispatch(setViewMode('view')); };
  const handleEdit = (bill) => { dispatch(setSelectedBill(bill)); dispatch(setViewMode('edit')); };
  const handleInvoice = (bill) => { dispatch(setSelectedBill(bill)); dispatch(setViewMode('invoice')); };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-2">
        <div>
          <h4 style={{ margin: 0, fontFamily: 'Playfair Display', fontWeight: 700 }}>Billing Management</h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Manage all bills — create, edit, view and track payments</p>
        </div>
        <button className="btn-orange" onClick={() => dispatch(setViewMode('create'))}>
          <i className="bi bi-plus-lg me-2"></i>New Bill
        </button>
      </div>

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Bills',    val: totals.all,         color: '#D4621A', icon: 'bi-receipt'          },
          { label: 'Paid',           val: totals.Paid,        color: '#2d8a4e', icon: 'bi-check-circle'     },
          { label: 'Pending',        val: totals.Pending,     color: '#9a6a00', icon: 'bi-hourglass-split'  },
          { label: 'Overdue',        val: totals.Overdue,     color: '#c0392b', icon: 'bi-exclamation-circle'},
          { label: 'Total Revenue',  val: `₹${revenue.toLocaleString()}`, color: '#8B4513', icon: 'bi-cash-coin' },
        ].map(s => (
          <div className="col-6 col-lg" key={s.label}>
            <div className="stat-card">
              <i className={`bi ${s.icon}`} style={{ fontSize: '1.2rem', color: s.color }}></i>
              <div style={{ fontSize: '1.35rem', fontFamily: 'Playfair Display', fontWeight: 700, margin: '6px 0 2px' }}>{s.val}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="cafe-card mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-md-5">
            <div style={{ position: 'relative' }}>
              <i className="bi bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
              <input className="cafe-input" style={{ paddingLeft: 36 }} placeholder="Search by bill ID, customer name, phone..."
                value={searchQuery} onChange={e => dispatch(setSearchQuery(e.target.value))} />
            </div>
          </div>
          <div className="col-md-7">
            <div className="d-flex gap-2 flex-wrap">
              {['All', 'Paid', 'Pending', 'Overdue'].map(s => (
                <button key={s} onClick={() => dispatch(setStatusFilter(s))}
                  style={{ padding: '7px 16px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                    background: statusFilter === s ? (s === 'Paid' ? '#2d8a4e' : s === 'Pending' ? '#9a6a00' : s === 'Overdue' ? '#c0392b' : 'var(--orange-main)') : 'var(--cream-light)',
                    color: statusFilter === s ? '#fff' : 'var(--text-muted)' }}>
                  {s} {s !== 'All' && <span style={{ opacity: 0.8, fontSize: '0.75rem' }}>({totals[s] || 0})</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="cafe-card">
        <div style={{ overflowX: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
              <i className="bi bi-receipt" style={{ fontSize: '2.5rem', opacity: 0.2 }}></i>
              <p style={{ marginTop: 12, fontSize: '0.9rem' }}>No bills found matching your filters</p>
              <button className="btn-cafe-outline" onClick={() => { dispatch(setSearchQuery('')); dispatch(setStatusFilter('All')); }}>Clear Filters</button>
            </div>
          ) : (
            <table className="cafe-table">
              <thead>
                <tr>{['Bill ID', 'Customer', 'Items', 'Subtotal', 'Tax', 'Discount', 'Total', 'Payment', 'Date', 'Status', 'Actions'].map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.map(bill => {
                  const s = STATUS_STYLE[bill.status] || STATUS_STYLE.Paid;
                  return (
                    <tr key={bill.id}>
                      <td><span style={{ fontWeight: 700, color: 'var(--orange-main)', fontSize: '0.82rem' }}>{bill.id}</span></td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{bill.customer}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{bill.phone}</div>
                      </td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 140 }}>
                        {bill.items.map(i => `${i.emoji}${i.name}×${i.qty}`).join(', ')}
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>₹{bill.subtotal}</td>
                      <td style={{ fontSize: '0.85rem', color: '#9a6a00' }}>₹{bill.taxAmt}</td>
                      <td style={{ fontSize: '0.85rem', color: '#2d8a4e' }}>{bill.discount > 0 ? `-${bill.discount}%` : '—'}</td>
                      <td><span style={{ fontWeight: 700, color: 'var(--brown-dark)' }}>₹{bill.total}</span></td>
                      <td><span style={{ fontSize: '0.78rem', fontWeight: 600, background: 'rgba(92,51,23,0.08)', color: 'var(--brown-mid)', padding: '3px 8px', borderRadius: 6 }}>{bill.payment}</span></td>
                      <td><div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{bill.date}</div><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{bill.time}</div></td>
                      <td>
                        <span style={{ background: s.bg, color: s.color, padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <i className={`bi ${s.icon}`}></i> {bill.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button title="View" onClick={() => handleView(bill)} style={{ background: 'rgba(212,98,26,0.1)', border: 'none', borderRadius: 7, width: 30, height: 30, cursor: 'pointer', color: 'var(--orange-main)', fontSize: '0.85rem', display:'flex',alignItems:'center',justifyContent:'center' }}>
                            <i className="bi bi-eye"></i>
                          </button>
                          <button title="Edit" onClick={() => handleEdit(bill)} style={{ background: 'rgba(92,51,23,0.08)', border: 'none', borderRadius: 7, width: 30, height: 30, cursor: 'pointer', color: 'var(--brown-mid)', fontSize: '0.85rem', display:'flex',alignItems:'center',justifyContent:'center' }}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button title="Invoice" onClick={() => handleInvoice(bill)} style={{ background: 'rgba(26,108,181,0.08)', border: 'none', borderRadius: 7, width: 30, height: 30, cursor: 'pointer', color: '#1a6cb5', fontSize: '0.85rem', display:'flex',alignItems:'center',justifyContent:'center' }}>
                            <i className="bi bi-file-earmark-text"></i>
                          </button>
                          <button title="Delete" onClick={() => handleDelete(bill.id)} style={{ background: 'rgba(192,57,43,0.08)', border: 'none', borderRadius: 7, width: 30, height: 30, cursor: 'pointer', color: '#c0392b', fontSize: '0.85rem', display:'flex',alignItems:'center',justifyContent:'center' }}>
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {filtered.length > 0 && (
          <div style={{ marginTop: 14, padding: '10px 0 0', borderTop: '1px solid var(--beige)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Showing {filtered.length} of {bills.length} bills</span>
            <span>Total filtered: <strong style={{ color: 'var(--orange-main)' }}>₹{filtered.reduce((s, b) => s + b.total, 0).toLocaleString()}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}
