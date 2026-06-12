import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode, deleteBill, updateBillStatus } from '../../store/slices/billingSlice';
import { showToast } from '../../store/slices/uiSlice';

const STATUS_STYLE = {
  Paid:    { bg: 'rgba(45,138,78,0.1)',   color: '#2d8a4e' },
  Pending: { bg: 'rgba(154,106,0,0.1)',   color: '#9a6a00' },
  Overdue: { bg: 'rgba(192,57,43,0.1)',   color: '#c0392b' },
};

export default function BillView() {
  const dispatch = useDispatch();
  const bill = useSelector(s => s.billing.selectedBill);
  if (!bill) return null;
  const s = STATUS_STYLE[bill.status] || STATUS_STYLE.Paid;

  const handleDelete = () => {
    if (window.confirm(`Delete bill ${bill.id}?`)) {
      dispatch(deleteBill(bill.id));
      dispatch(showToast({ type: 'success', title: 'Deleted', message: `Bill ${bill.id} deleted` }));
    }
  };

  const handleStatusChange = (status) => {
    dispatch(updateBillStatus({ id: bill.id, status }));
    dispatch(showToast({ type: 'success', title: 'Status Updated', message: `Bill marked as ${status}` }));
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
        <button onClick={() => dispatch(setViewMode('list'))} style={{ background: 'rgba(92,51,23,0.08)', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: 'var(--brown-dark)', fontSize: '0.85rem', fontWeight: 500 }}>
          <i className="bi bi-arrow-left me-2"></i>Back to Bills
        </button>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: 0, fontFamily: 'Playfair Display', fontWeight: 700 }}>Bill Details — {bill.id}</h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>{bill.date} at {bill.time}</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn-cafe-outline" style={{ fontSize: '0.82rem' }} onClick={() => dispatch(setViewMode('edit'))}>
            <i className="bi bi-pencil me-2"></i>Edit
          </button>
          <button className="btn-orange" style={{ fontSize: '0.82rem' }} onClick={() => dispatch(setViewMode('invoice'))}>
            <i className="bi bi-file-earmark-text me-2"></i>Invoice
          </button>
          <button onClick={handleDelete} style={{ background: 'rgba(192,57,43,0.08)', border: '1.5px solid rgba(192,57,43,0.2)', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: '#c0392b', fontSize: '0.82rem', fontWeight: 500 }}>
            <i className="bi bi-trash3 me-1"></i>Delete
          </button>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-8">
          {/* Customer Info */}
          <div className="cafe-card mb-3">
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 14, color: 'var(--brown-dark)' }}>
              <i className="bi bi-person-circle me-2" style={{ color: 'var(--orange-main)' }}></i>Customer Details
            </div>
            <div className="row g-2">
              {[
                ['Customer', bill.customer],
                ['Phone', bill.phone || '—'],
                ['Order Type', bill.type],
                ['Payment', bill.payment],
              ].map(([k, v]) => (
                <div className="col-6" key={k}>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>{k}</div>
                  <div style={{ fontWeight: 600, color: 'var(--brown-dark)', fontSize: '0.9rem' }}>{v}</div>
                </div>
              ))}
            </div>
            {bill.notes && (
              <div style={{ marginTop: 12, background: 'var(--cream-light)', borderRadius: 10, padding: '10px 12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <i className="bi bi-chat-text me-2"></i>{bill.notes}
              </div>
            )}
          </div>

          {/* Items */}
          <div className="cafe-card">
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 14, color: 'var(--brown-dark)' }}>
              <i className="bi bi-cup-hot me-2" style={{ color: 'var(--orange-main)' }}></i>Ordered Items
            </div>
            <table style={{ width: '100%' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--beige)' }}>
                  {['Item', 'Qty', 'Unit Price', 'Amount'].map(h => (
                    <th key={h} style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '6px 8px', textAlign: h === 'Amount' ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(232,213,176,0.4)' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 500, fontSize: '0.88rem' }}>{item.emoji} {item.name}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>×{item.qty}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>₹{item.price}</td>
                    <td style={{ padding: '10px 8px', fontWeight: 700, color: 'var(--brown-dark)', textAlign: 'right', fontSize: '0.9rem' }}>₹{item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ background: 'var(--cream-light)', borderRadius: 12, padding: '14px 16px', marginTop: 14 }}>
              {[
                ['Subtotal', `₹${bill.subtotal}`],
                bill.discount > 0 && [`Discount (${bill.discount}%)`, `-₹${bill.discountAmt}`],
                [`GST (${bill.taxRate}%)`, `₹${bill.taxAmt}`],
              ].filter(Boolean).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span>{k}</span><span style={{ color: 'var(--brown-dark)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--beige)', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.15rem' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--orange-main)' }}>₹{bill.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Status */}
          <div className="cafe-card mb-3">
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 14, color: 'var(--brown-dark)' }}>Payment Status</div>
            <div style={{ background: s.bg, borderRadius: 12, padding: '14px 16px', textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: '1.4rem', color: s.color, fontWeight: 700 }}>{bill.status}</div>
              <div style={{ fontSize: '0.78rem', color: s.color, opacity: 0.8 }}>{bill.payment} · {bill.type}</div>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>Change Status:</div>
            <div className="d-flex gap-2">
              {['Paid', 'Pending', 'Overdue'].filter(st => st !== bill.status).map(st => (
                <button key={st} onClick={() => handleStatusChange(st)} className="btn-cafe-outline flex-fill" style={{ fontSize: '0.78rem', padding: '7px 0', color: st === 'Overdue' ? '#c0392b' : st === 'Paid' ? '#2d8a4e' : '#9a6a00', borderColor: st === 'Overdue' ? '#c0392b' : st === 'Paid' ? '#2d8a4e' : '#9a6a00' }}>
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="cafe-card">
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 14, color: 'var(--brown-dark)' }}>Bill Summary</div>
            {[
              ['Bill ID', bill.id],
              ['Date', bill.date],
              ['Time', bill.time],
              ['Items Count', bill.items.reduce((s, i) => s + i.qty, 0)],
              ['Net Payable', `₹${bill.total}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(232,213,176,0.35)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: 600, color: 'var(--brown-dark)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
