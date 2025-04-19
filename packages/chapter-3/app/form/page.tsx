'use client'

import { useState } from 'react'

export default function FormPage() {
  const [name, setName] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    const data = await res.json()
    setResult(data.message)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>フォーム送信のサンプル</h1>
      <form onSubmit={handleSubmit}>
        <label>
          名前：
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: '0 1rem' }}
          />
        </label>
        <button type="submit">送信</button>
      </form>
      {result && <p>結果: {result}</p>}
    </div>
  )
}
