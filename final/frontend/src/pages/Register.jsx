import React, { useState } from 'react';

export default function Register() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [result,setResult]=useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const resp = await fetch('http://localhost:4000/api/auth/register', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await resp.json();
    setResult({ status: resp.status, body: data });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Cadastro</h2>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha" className="w-full border p-2 rounded" />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Cadastrar</button>

      {result && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          Status: {result.status}
          <br/>
          {JSON.stringify(result.body,null,2)}
        </pre>
      )}
    </form>
  )
}
