'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMsg('Registrazione completata! Controlla la tua email per confermare l\'account (se richiesto) o effettua il login.');
        // Se l'autenticazione è immediata senza conferma email
        if (data?.user) {
          onAuthSuccess(data.user);
          setTimeout(() => onClose(), 1500);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data?.user) {
          onAuthSuccess(data.user);
          onClose();
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Si è verificato un errore.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '400px', borderRadius: 'var(--radius-2xl)' }}>
        <div className="modal-handle">
          <div className="modal-handle-bar" />
        </div>
        <div className="modal-body" style={{ padding: '16px 24px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', margin: 0 }}>
              {isSignUp ? 'Registrati' : 'Accedi'}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'var(--surface)',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                color: 'var(--text-primary)',
              }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email</label>
              <input
                type="email"
                required
                className="search-input"
                placeholder="latua@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '12px 16px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Password</label>
              <input
                type="password"
                required
                className="search-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '12px 16px' }}
              />
            </div>

            {errorMsg && (
              <div style={{ fontSize: '0.8rem', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-light)', background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
                {successMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="find-button"
              style={{ width: '100%', padding: '14px', marginTop: '6px' }}
            >
              {loading ? 'Attendere...' : isSignUp ? 'Crea Account' : 'Accedi'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {isSignUp ? 'Hai già un account?' : 'Nuovo su Frullator?'}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-light)',
                fontWeight: 600,
                marginLeft: '6px',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {isSignUp ? 'Accedi' : 'Registrati'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
