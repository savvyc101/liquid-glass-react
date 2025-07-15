import React, { useState } from 'react'

// Simple glass card component without complex dependencies
function SimpleGlassCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`
      backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6
      shadow-lg hover:shadow-xl transition-all duration-300
      ${className}
    `}>
      {children}
    </div>
  )
}

// Simple glass button
function SimpleGlassButton({ children, onClick, className = '' }: { 
  children: React.ReactNode, 
  onClick?: () => void,
  className?: string 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        backdrop-blur-md bg-white/10 border border-white/20 rounded-lg px-6 py-3
        text-white font-medium hover:bg-white/20 transition-all duration-200
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default function SimpleGlass() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 space-y-8">
        
        {/* Hero */}
        <section className="text-center py-16">
          <SimpleGlassCard className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Simple Glass UI Test</h1>
            <p className="text-xl text-white/80 mb-8">
              Testing basic glass morphism components
            </p>
            <div className="flex justify-center gap-4">
              <SimpleGlassButton onClick={() => setCount(count + 1)}>
                Click me ({count})
              </SimpleGlassButton>
              <SimpleGlassButton>
                Another Button
              </SimpleGlassButton>
            </div>
          </SimpleGlassCard>
        </section>

        {/* Cards Grid */}
        <section className="grid md:grid-cols-3 gap-6">
          <SimpleGlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Card 1</h3>
            <p className="text-white/70">This is a simple glass card with backdrop blur.</p>
          </SimpleGlassCard>

          <SimpleGlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Card 2</h3>
            <p className="text-white/70">Another card to test the grid layout.</p>
          </SimpleGlassCard>

          <SimpleGlassCard>
            <h3 className="text-lg font-semibold text-white mb-2">Card 3</h3>
            <p className="text-white/70">Third card with glass morphism effect.</p>
          </SimpleGlassCard>
        </section>

        {/* Form Example */}
        <section className="max-w-md mx-auto">
          <SimpleGlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Simple Form</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <textarea
                placeholder="Your message"
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
              />
              <SimpleGlassButton className="w-full">
                Send Message
              </SimpleGlassButton>
            </div>
          </SimpleGlassCard>
        </section>

      </div>
    </div>
  )
}