/*
  FillForm.jsx — License Application Form

  WHY one state object for all fields?
  Instead of const [name, setName] = useState('') for every field,
  we use one object: const [form, setForm] = useState({ name: '', ... })
  The generic handleChange function updates any field by its `name` attribute.
  This scales cleanly from 3 fields to 20 fields.
*/

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon } from '../components/Icons'
import client from '../api/client'

export default function FillForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '', company: '', phone: '', email: '', address: '', services: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleContinue = async () => {
    try {
      setLoading(true)
      await client.post('/licenses/apply', form)
      navigate('/license-checkpoint')
    } catch {
      navigate('/license-checkpoint') // proceed anyway for demo
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'fullName',  label: 'Your full name', placeholder: 'Enter your name',                    type: 'text' },
    { name: 'company',   label: 'Your Company',   placeholder: 'Enter your Company name',             type: 'text' },
    { name: 'phone',     label: 'Your Phone no',  placeholder: 'Enter your Phone no',                 type: 'tel'  },
    { name: 'email',     label: 'Enter your mail id', placeholder: 'Enter your mail id',              type: 'email'},
    { name: 'address',   label: 'Address',         placeholder: 'Unit no, Street address, City, Pincode', type: 'text' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 pt-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-600 text-sm mb-6">
        <ChevronLeftIcon /> Back
      </button>

      <h1 className="text-2xl font-bold text-black mb-6">Fill in the form</h1>

      <div className="flex-1 space-y-3">
        {fields.map((f) => (
          <div key={f.name} className="relative border border-gray-300 rounded-xl px-3 pt-5 pb-3">
            {/* Floating label — sits at top of input border */}
            <label className="absolute top-1.5 left-3 text-xs text-gray-400">{f.label}</label>
            <input
              name={f.name}
              type={f.type}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              className="w-full text-sm outline-none text-gray-700 placeholder-gray-300"
            />
          </div>
        ))}

        {/* Services selector */}
        <button className="w-full border border-gray-300 rounded-xl px-4 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-700">Services</span>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex gap-3 pb-10 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-4 border border-gray-300 rounded-full text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          disabled={loading}
          className="flex-1 py-4 bg-black text-white rounded-full text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
