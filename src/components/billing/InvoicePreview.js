import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../../store/slices/billingSlice';

export default function InvoicePreview() {
  const dispatch = useDispatch();
  const bill = useSelector(s => s.billing.selectedBill);
  if (!bill) return null;

  const STATUS_COLOR = { Paid: '#2d8a4e', Pending: '#9a6a00', Overdue: '#c0392b' };
  const color = STATUS_COLOR[bill.status] || '#2d8a4e';

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
        <button onClick={() => dispatch(setViewMode(bill.customer ? 'view' : 'list'))}
          style={{ background: 'rgba(92,51,23,0.08)', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: 'var(--brown-dark)', fontSize: '0.85rem', fontWeight: 500 }}>
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: 0, fontFamily: 'Playfair Display', fontWeight: 700 }}>Invoice Preview</h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Bill {bill.id} · {bill.date}</p>
        </div>
        <button className="btn-orange" onClick={() => window.print()}>
          <i className="bi bi-printer me-2"></i>Print Invoice
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-7 col-xl-6">
          <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 8px 40px rgba(92,51,23,0.12)', overflow: 'hidden', fontFamily: 'DM Sans, sans-serif' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, var(--brown-dark) 0%, var(--brown-mid) 100%)', padding: '28px 32px', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 42, height: 42, background: 'var(--orange-main)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>☕</div>
                    <div>
                      <div style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.05em' }}>LOSAKO CAFE</div>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em' }}>STARTUP CAFE • PONDICHERRY</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    12, Rue Bussy, White Town<br />
                    Pondicherry – 605001<br />
                    📞 +91 98765 43210<br />
                    GSTIN: 33AABCL1234B1ZX
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Invoice</div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: '1.1rem', fontWeight: 700, color: 'var(--orange-light)' }}>{bill.id}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{bill.date}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>{bill.time}</div>
                  <div style={{ marginTop: 10, background: color + '30', border: `1px solid ${color}60`, borderRadius: 20, padding: '4px 12px', display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>
                    ● {bill.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div style={{ padding: '20px 32px', background: 'var(--cream-light)', borderBottom: '1px solid var(--beige)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Bill To</div>
              <div style={{ fontWeight: 700, color: 'var(--brown-dark)', fontSize: '1rem' }}>{bill.customer}</div>
              {bill.phone && <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>{bill.phone}</div>}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(92,51,23,0.08)', color: 'var(--brown-mid)', padding: '3px 10px', borderRadius: 20 }}>{bill.type}</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(212,98,26,0.1)', color: 'var(--orange-main)', padding: '3px 10px', borderRadius: 20 }}>{bill.payment}</span>
              </div>
            </div>

            {/* Items */}
            <div style={{ padding: '20px 32px' }}>
              <table style={{ width: '100%', marginBottom: 20 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--beige)' }}>
                    {['Item', 'Qty', 'Rate', 'Amount'].map(h => (
                      <th key={h} style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 6px', textAlign: h === 'Amount' ? 'right' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bill.items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(232,213,176,0.5)' }}>
                      <td style={{ padding: '10px 6px', fontWeight: 500, fontSize: '0.88rem', color: 'var(--brown-dark)' }}>{item.emoji} {item.name}</td>
                      <td style={{ padding: '10px 6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.qty}</td>
                      <td style={{ padding: '10px 6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>₹{item.price}</td>
                      <td style={{ padding: '10px 6px', fontWeight: 600, textAlign: 'right', fontSize: '0.9rem' }}>₹{item.price * item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ background: 'var(--cream-light)', borderRadius: 14, padding: '16px 20px' }}>
                {[
                  ['Subtotal', `₹${bill.subtotal}`, false],
                  bill.discount > 0 ? [`Discount (${bill.discount}%)`, `-₹${bill.discountAmt}`, false] : null,
                  [`GST @ ${bill.taxRate}%`, `₹${bill.taxAmt}`, false],
                ].filter(Boolean).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>{k}</span><span style={{ color: 'var(--brown-dark)', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ borderTop: '2px solid var(--beige)', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800 }}>
                  <span style={{ color: 'var(--brown-dark)' }}>TOTAL AMOUNT</span>
                  <span style={{ color: 'var(--orange-main)' }}>₹{bill.total}</span>
                </div>
              </div>

              {/* QR + Footer */}
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ textAlign: 'center', border: '1px solid var(--beige)', borderRadius: 12, padding: '12px 16px' }}>
                  <div style={{ fontSize: '2.2rem', lineHeight: 1, color: 'var(--brown-dark)', marginBottom: 4 }}>▪▪▪▪<br />▪▪▪▪<br />▪▪▪▪</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Scan to Pay</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: '1rem', fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 4 }}>Thank You!</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"Every cup tells a story"</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 6 }}>losako.cafe | Since 2026</div>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div style={{ background: 'var(--brown-dark)', padding: '12px 32px', display: 'flex', justifyContent: 'center', gap: 24 }}>
              {['Thank you for your visit', 'Please visit again', 'Pondicherry'].map(t => (
                <span key={t} style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
