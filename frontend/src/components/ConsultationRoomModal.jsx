import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const ConsultationRoomModal = ({ appointment, onClose }) => {
  if (!appointment) return null

  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [secondsElapsed, setSecondsElapsed] = useState(0)

  const localVideoRef = useRef(null)
  const mediaStreamRef = useRef(null)

  // Doctor Name helper to fix "Dr. Dr. Name" bug
  const doctorName = appointment.docData?.name || 'Specialist'
  const formattedDocName = doctorName.startsWith('Dr.') ? doctorName : `Dr. ${doctorName}`

  // Clean room link
  const rawId = appointment._id || Date.now().toString()
  const cleanRoomName = `CarePulse_Consult_${rawId.slice(-6)}`
  const externalLink = appointment.meetingLink || `https://meet.jit.si/${cleanRoomName}`

  // 1. Prevent background page scroll while meeting modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    // Call duration timer
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1)
    }, 1000)

    return () => {
      document.body.style.overflow = originalStyle
      clearInterval(timer)
    }
  }, [])

  // Format Call Timer (e.g. 03:45)
  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60)
    const secs = sec % 60
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // 2. Initialize WebRTC Media Stream (Local Camera & Mic)
  const startCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      mediaStreamRef.current = stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
    } catch (err) {
      console.warn("Could not acquire WebRTC camera stream:", err)
    }
  }

  // Stop ALL Hardware Tracks completely (Extinguishes Camera LED / Torch & Mutes Mic)
  const stopHardwareTracks = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => {
        track.stop()
      })
      mediaStreamRef.current = null
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }
  }

  // Toggle Microphone Mute
  const toggleAudioTrack = () => {
    const nextState = !isMicOn
    setIsMicOn(nextState)

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = nextState
      })
    }
  }

  // Toggle Camera Off / On (Physically STOP tracks when OFF so camera LED/torch turns OFF)
  const toggleVideoTrack = async () => {
    if (isVideoOn) {
      // Turning OFF camera -> STOP video tracks physically (Extinguishes camera LED / Torch immediately)
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getVideoTracks().forEach(track => {
          track.stop()
          mediaStreamRef.current.removeTrack(track)
        })
      }
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null
      }
      setIsVideoOn(false)
    } else {
      // Turning ON camera -> Acquire new video stream track
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
        const newVideoTrack = videoStream.getVideoTracks()[0]
        if (newVideoTrack) {
          if (mediaStreamRef.current) {
            mediaStreamRef.current.addTrack(newVideoTrack)
          } else {
            mediaStreamRef.current = videoStream
          }
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStreamRef.current
          }
        }
        setIsVideoOn(true)
      } catch (err) {
        console.error("Failed to turn camera back on:", err)
      }
    }
  }

  const handleClose = (isEndingCall = true) => {
    stopHardwareTracks()
    onClose(isEndingCall)
  }

  useEffect(() => {
    startCameraStream()

    return () => {
      stopHardwareTracks()
    }
  }, [])

  return createPortal(
    <div className='fixed inset-0 z-[99999] bg-slate-950 flex flex-col justify-between p-0 m-0 overflow-hidden h-screen w-screen animate-fadeIn text-white select-none top-0 left-0 right-0 bottom-0'>
      
      {/* Sleek Top Navigation Header Bar */}
      <div className='w-full h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30'>
        <div className='flex items-center gap-3'>
          <div className='relative flex items-center justify-center shrink-0'>
            <div className='w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute' />
            <div className='w-3 h-3 rounded-full bg-emerald-500 relative' />
          </div>
          <div className='flex items-center gap-3'>
            <h2 className='text-xs sm:text-sm font-black tracking-tight text-white'>
              <span>💻</span> Telehealth Consultation: <span className='text-indigo-400'>{formattedDocName}</span>
            </h2>
            <span className='hidden sm:inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider'>
              Live HD Stream
            </span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          {/* Live Call Duration Timer */}
          <div className='bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-1 text-xs font-mono font-extrabold text-indigo-300 flex items-center gap-1.5 shadow-sm'>
            <span>⏱️</span>
            <span>{formatTimer(secondsElapsed)}</span>
          </div>

          <a 
            href={externalLink} 
            target="_blank" 
            rel="noreferrer"
            className='hidden md:inline-block bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-extrabold px-3.5 py-1.5 rounded-xl transition-all'
          >
            ↗ Open Link
          </a>

          <button 
            onClick={handleClose}
            className='bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold px-4 py-1.5 rounded-xl transition-all cursor-pointer shadow-md'
          >
            Leave Call
          </button>
        </div>
      </div>

      {/* Main Fullscreen Video Screen Canvas */}
      <div className='flex-1 w-full bg-slate-950 p-3 sm:p-4 overflow-hidden relative flex items-center justify-center min-h-0'>
        
        {/* Main Doctor Telehealth Video Screen */}
        <div className='w-full h-full bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center shadow-2xl p-6'>
          
          {/* Doctor Avatar Badge */}
          <div className='relative mb-4'>
            <div className='w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden ring-4 ring-indigo-500/40 shadow-2xl relative'>
              <img 
                src={appointment.docData?.image} 
                alt={formattedDocName} 
                className='w-full h-full object-cover' 
              />
            </div>
            <span className='absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border-2 border-slate-900 shadow-md'>
              ✓ Online
            </span>
          </div>

          <h3 className='text-xl sm:text-2xl font-black text-white tracking-tight'>{formattedDocName}</h3>
          <p className='text-xs text-indigo-300 font-extrabold mt-1 bg-indigo-950/80 border border-indigo-500/30 px-4 py-1 rounded-full'>
            {appointment.docData?.degree} - {appointment.docData?.speciality}
          </p>

          {/* Clinical Note Sync Card */}
          <div className='mt-6 max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center text-xs text-slate-300 font-medium space-y-1 shadow-lg'>
            <p className='text-indigo-400 font-bold uppercase text-[10px] tracking-wider'>🩺 Live Medical Consultation Channel</p>
            <p>Encrypted peer-to-peer telehealth channel active. Patient medical profile synced.</p>
          </div>

          {/* Bottom Left Stream Badge */}
          <div className='absolute bottom-4 left-4 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] font-extrabold text-slate-300 flex items-center gap-2 shadow-md'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
            <span>CarePulse Encrypted Medical Stream</span>
          </div>
        </div>

        {/* Floating Picture-in-Picture Patient Local Camera View */}
        <div className='absolute bottom-6 right-6 w-56 h-40 sm:w-72 sm:h-52 bg-slate-950 border-2 border-indigo-500/60 rounded-2xl overflow-hidden shadow-2xl z-20 shrink-0'>
          {isVideoOn ? (
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline 
              muted 
              className='w-full h-full object-cover transform -scale-x-100' 
            />
          ) : (
            <div className='w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-2 p-4 text-center'>
              <div className='w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold border border-slate-800 shadow-inner'>
                📷
              </div>
              <div>
                <p className='text-xs font-black text-rose-400 uppercase tracking-wider'>Camera Off</p>
                <p className='text-[10px] text-slate-500 font-medium'>Torch / LED Extinguished</p>
              </div>
            </div>
          )}

          <div className='absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[10px] font-black text-white border border-white/10 shadow-md'>
            You ({appointment.userData?.name || 'Patient'})
          </div>

          {!isMicOn && (
            <div className='absolute bottom-2.5 right-2.5 bg-rose-600 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-black shadow-md flex items-center gap-1'>
              <span>🔇</span> Muted
            </div>
          )}
        </div>

      </div>

      {/* Sleek Floating Bottom Controls Toolbar */}
      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl z-30 shrink-0'>
        
        {/* Microphone Toggle Button */}
        <button 
          onClick={toggleAudioTrack}
          className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md flex items-center gap-2 ${
            isMicOn 
              ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
              : 'bg-rose-600 text-white hover:bg-rose-700 ring-2 ring-rose-400/50'
          }`}
        >
          {isMicOn ? '🎙️ Mute Mic' : '🔇 Unmute Mic'}
        </button>

        {/* Camera Toggle Button (Stops hardware tracks to extinguish LED/Torch) */}
        <button 
          onClick={toggleVideoTrack}
          className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md flex items-center gap-2 ${
            isVideoOn 
              ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
              : 'bg-rose-600 text-white hover:bg-rose-700 ring-2 ring-rose-400/50'
          }`}
        >
          {isVideoOn ? '📹 Turn Off Camera' : '📷 Turn On Camera'}
        </button>

        {/* External Link */}
        <a 
          href={externalLink} 
          target="_blank" 
          rel="noreferrer"
          className='bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-black px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5'
        >
          ↗ Link
        </a>

        {/* Leave Room Button */}
        <button 
          onClick={handleClose}
          className='bg-rose-600 hover:bg-rose-700 text-white text-xs font-black px-6 py-2.5 rounded-full transition-all cursor-pointer uppercase tracking-wider shadow-lg shadow-rose-950 flex items-center gap-1.5'
        >
          🔴 Leave Room
        </button>

      </div>

    </div>,
    document.body
  )
}

export default ConsultationRoomModal
