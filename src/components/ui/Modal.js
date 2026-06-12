import React, { useEffect } from 'react';

export default function Modal({ show, onClose, title, children, size = 'md', footer }) {
  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  if (!show) return null;

  const maxW = { sm: 400, md: 560, lg: 720, xl: 900 }[size] || 560;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1050, background: 'rgba(20,10,4,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: maxW, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(0,0,0,0.2)', animation: 'modalIn 0.25s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px', borderBottom: '1px solid var(--beige)' }}>
          <h5 style={{ margin: 0, fontFamily: 'Playfair Display', fontWeight: 700, color: 'var(--brown-dark)', fontSize: '1.1rem' }}>{title}</h5>
          <button onClick={onClose} style={{ background: 'rgba(92,51,23,0.08)', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: 'var(--brown-dark)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && <div style={{ padding: '16px 24px', borderTop: '1px solid var(--beige)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>{footer}</div>}
      </div>
    </div>
  );
}
