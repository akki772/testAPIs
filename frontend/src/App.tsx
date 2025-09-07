import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export default function App() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [token, setToken] = useState<string>('');
  const [payload, setPayload] = useState<string>('{"hello":"world"}');
  const [response, setResponse] = useState<string>('');

  async function register() {
    await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    alert('Registered (demo). Now login.');
  }

  async function login() {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setToken(data.token || '');
  }

  async function sendEcho() {
    const res = await fetch(`${API_BASE}/api/echo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: payload
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ maxWidth: 920, margin: '40px auto', fontFamily: 'ui-sans-serif, system-ui' }}>
      <h1>TestAPI – Echo & Utilities</h1>
      <p>
        Use this tool to test your frontend contracts quickly. Login to get a Bearer token,
        then hit the protected <code>POST /api/echo</code> with any JSON payload and you'll get the same payload back.
      </p>

      <h2>1) Login for Bearer Token</h2>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr auto auto' }}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
      </div>
      <div style={{ marginTop: 8 }}>
        <strong>Token:</strong>
        <textarea readOnly value={token} style={{ width: '100%', height: 80 }} />
      </div>

      <h2>2) Send Protected Echo</h2>
      <textarea value={payload} onChange={e => setPayload(e.target.value)} style={{ width: '100%', height: 140 }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={sendEcho} disabled={!token}>POST /api/echo</button>
      </div>

      <h3>Response</h3>
      <pre style={{ background: '#111', color: '#eee', padding: 12, borderRadius: 8, overflowX: 'auto' }}>{response}</pre>

      <hr style={{ margin: '32px 0' }} />
      <h2>Quick API Reference</h2>
      <ul>
        <li><code>POST /auth/register</code> → create demo user</li>
        <li><code>POST /auth/login</code> → get token</li>
        <li><code>POST /api/echo</code> (Bearer) → echoes JSON body</li>
        <li><code>GET /api/health</code> → service check</li>
      </ul>
      <p>Configure backend URL with <code>VITE_API_BASE</code>.</p>
    </div>
  )
}
