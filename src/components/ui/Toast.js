import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast } from '../../store/slices/uiSlice';

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector(s => s.ui.toast);

  useEffect(() => {
    if (toast) { const t = setTimeout(() => dispatch(clearToast()), 3000); return () => clearTimeout(t); }
  }, [toast, dispatch]);

  if (!toast) return null;

  const colors = { success: '#2d8a4e', error: '#c0392b', info: '#1a6cb5', warning: '#9a6a00' };
  const icons  = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', info: 'bi-info-circle-fill', warning: 'bi-exclamation-triangle-fill' };
  const type = toast.type || 'success';

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, minWidth: 280, maxWidth: 380, background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.15)', borderLeft: `4px solid ${colors[type]}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, animation: 'slideIn 0.3s ease' }}>
      <i className={`bi ${icons[type]}`} style={{ color: colors[type], fontSize: '1.2rem', flexShrink: 0 }}></i>
      <div style={{ flex: 1 }}>
        {toast.title && <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--brown-dark)' }}>{toast.title}</div>}
        <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>{toast.message}</div>
      </div>
      <button onClick={() => dispatch(clearToast())} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1rem', padding: 0 }}>×</button>
    </div>
  );
}
