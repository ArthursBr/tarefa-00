import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
          <nav className="mb-4 flex gap-4">
            <Link to="/register" className="text-blue-600">Cadastro</Link>
            <Link to="/login" className="text-blue-600">Login</Link>
          </nav>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
