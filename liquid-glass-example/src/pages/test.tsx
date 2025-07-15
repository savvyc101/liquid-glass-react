import React from 'react'

export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-xl">If you can see this, React is working!</p>
        <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <h2 className="text-2xl font-semibold mb-2">Simple Glass Effect</h2>
          <p>This is a basic glass morphism effect using pure CSS.</p>
        </div>
      </div>
    </div>
  )
}