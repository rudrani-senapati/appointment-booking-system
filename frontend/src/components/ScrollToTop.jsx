import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export const ScrollToTop = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return null
}

export const LiveChatWidget = () => {
  const { userData } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Hello! I am your CarePulse Clinical AI Assistant. How can I help you today?' },
    { sender: 'bot', text: 'You can ask about doctor availability, booking steps, or emergency hotlines!' }
  ])
  const [inputMsg, setInputMsg] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputMsg.trim()) return

    const userText = inputMsg.trim()
    setMessages(prev => [...prev, { sender: 'user', text: userText }])
    setInputMsg('')

    // Intelligent auto-reply logic
    setTimeout(() => {
      let botReply = "Thank you for reaching out to CarePulse. A clinical assistant or doctor will respond shortly!"
      const query = userText.toLowerCase()

      if (query.includes('emergency') || query.includes('ambulance') || query.includes('108')) {
        botReply = "🚨 EMERGENCY NOTICE: For immediate life-threatening medical emergencies or ambulance dispatch, please dial 108 immediately!"
      } else if (query.includes('book') || query.includes('appointment')) {
        botReply = "📅 To book an appointment, go to 'All Doctors', select your specialist, pick your date & slot, and confirm!"
      } else if (query.includes('prescription') || query.includes('rx') || query.includes('record')) {
        botReply = "📂 You can view and download your digital prescriptions anytime under 'Health Vault & Rx' in your profile menu!"
      } else if (query.includes('fee') || query.includes('payment') || query.includes('price')) {
        botReply = "💳 Consultation fees vary by doctor (starting at ₹500). We accept Razorpay Online Payment & Pay at Clinic!"
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }])
    }, 600)
  }

  return (
    <div className='fixed bottom-6 right-6 z-[9999] select-none'>
      {/* Floating Chat Window */}
      {isOpen && (
        <div className='mb-4 w-80 sm:w-96 bg-white border-2 border-indigo-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[420px] animate-in slide-in-from-bottom-5 duration-200'>
          
          {/* Header */}
          <div className='bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between shadow-md'>
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg font-bold border border-white/30'>
                💬
              </div>
              <div>
                <h3 className='font-black text-sm text-white leading-none'>CarePulse Live Support</h3>
                <p className='text-[10px] text-indigo-100 font-extrabold mt-0.5 flex items-center gap-1'>
                  <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
                  Medical Assistant Active
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className='w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center cursor-pointer transition-all'
            >
              ✕
            </button>
          </div>

          {/* Message List */}
          <div className='flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/80 text-xs font-bold'>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl leading-relaxed shadow-2xs ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none font-semibold' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Query Pill Bar */}
          <div className='px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[10px] font-extrabold text-indigo-700'>
            <span 
              onClick={() => setInputMsg('How do I book an appointment?')}
              className='px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 cursor-pointer whitespace-nowrap'
            >
              📅 Booking Help
            </span>
            <span 
              onClick={() => setInputMsg('Where is my prescription?')}
              className='px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 cursor-pointer whitespace-nowrap'
            >
              📂 Rx Vault
            </span>
            <span 
              onClick={() => setInputMsg('Emergency hotline number')}
              className='px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 cursor-pointer whitespace-nowrap'
            >
              🚨 Emergency
            </span>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className='p-3 bg-white border-t border-slate-100 flex items-center gap-2'>
            <input 
              type="text" 
              placeholder="Ask a medical query..." 
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className='flex-1 px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all'
            />
            <button 
              type="submit" 
              className='px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all shrink-0'
            >
              Send
            </button>
          </form>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(prev => !prev)}
        className='w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-2xl border-2 border-white ring-4 ring-indigo-500/20 cursor-pointer'
        title="CarePulse Live Chat Support"
      >
        {isOpen ? '✕' : '💬'}
      </button>

    </div>
  )
}

export default ScrollToTop
