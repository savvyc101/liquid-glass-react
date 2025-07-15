import React, { useState, useRef } from 'react'
import LiquidGlass from 'liquid-glass-react'

export default function WorkingGlass() {
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [toggleChecked, setToggleChecked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center opacity-30" />
      
      {/* Content */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-6 py-12 space-y-16">
        
        {/* Hero */}
        <section className="text-center py-16">
          <LiquidGlass
            displacementScale={80}
            blurAmount={0.3}
            saturation={150}
            aberrationIntensity={2}
            elasticity={0.2}
            cornerRadius={24}
            mouseContainer={containerRef}
            padding="32px"
            style={{
              position: 'relative',
              top: 'auto',
              left: 'auto',
              transform: 'none',
              display: 'block',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Working Liquid Glass UI</h1>
              <p className="text-xl text-white/80 mb-8">
                Using the original liquid-glass-react library with proper effects
              </p>
            </div>
          </LiquidGlass>
        </section>

        {/* Buttons Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Interactive Buttons</h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            <LiquidGlass
              displacementScale={64}
              blurAmount={0.1}
              saturation={130}
              aberrationIntensity={2}
              elasticity={0.35}
              cornerRadius={12}
              mouseContainer={containerRef}
              padding="12px 24px"
              onClick={() => alert('Primary button clicked!')}
              style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
            >
              <span className="text-white font-medium">Primary Action</span>
            </LiquidGlass>

            <LiquidGlass
              displacementScale={50}
              blurAmount={0.15}
              saturation={120}
              aberrationIntensity={1.5}
              elasticity={0.25}
              cornerRadius={12}
              mouseContainer={containerRef}
              padding="12px 24px"
              onClick={() => setModalOpen(true)}
              style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
            >
              <span className="text-white font-medium">Open Modal</span>
            </LiquidGlass>

            <LiquidGlass
              displacementScale={40}
              blurAmount={0.08}
              saturation={110}
              aberrationIntensity={1}
              elasticity={0.15}
              cornerRadius={12}
              mouseContainer={containerRef}
              padding="12px 24px"
              style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
            >
              <span className="text-white font-medium">Secondary</span>
            </LiquidGlass>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Glass Cards</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <LiquidGlass
              displacementScale={50}
              blurAmount={0.2}
              saturation={140}
              aberrationIntensity={1}
              elasticity={0.1}
              cornerRadius={16}
              mouseContainer={containerRef}
              padding="24px"
              style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
            >
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Feature Card</h3>
                <p className="text-white/70">Beautiful glass morphism effect with mouse tracking and chromatic aberration.</p>
              </div>
            </LiquidGlass>

            <LiquidGlass
              displacementScale={60}
              blurAmount={0.25}
              saturation={150}
              aberrationIntensity={1.5}
              elasticity={0.15}
              cornerRadius={16}
              mouseContainer={containerRef}
              padding="24px"
              style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
            >
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Enhanced Card</h3>
                <p className="text-white/70">More pronounced effects with higher displacement and saturation values.</p>
              </div>
            </LiquidGlass>

            <LiquidGlass
              displacementScale={40}
              blurAmount={0.15}
              saturation={130}
              aberrationIntensity={0.8}
              elasticity={0.08}
              cornerRadius={16}
              mouseContainer={containerRef}
              padding="24px"
              style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
            >
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Subtle Card</h3>
                <p className="text-white/70">Gentler glass effect for more understated design elements.</p>
              </div>
            </LiquidGlass>
          </div>
        </section>

        {/* Form Section */}
        <section className="space-y-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center">Glass Form Elements</h2>
          
          <LiquidGlass
            displacementScale={30}
            blurAmount={0.18}
            saturation={125}
            aberrationIntensity={1}
            elasticity={0.05}
            cornerRadius={16}
            mouseContainer={containerRef}
            padding="32px"
            style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                <input
                  type="email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Message</label>
                <textarea
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={toggleChecked}
                  onChange={(e) => setToggleChecked(e.target.checked)}
                  className="w-4 h-4 accent-white"
                />
                <label className="text-sm text-white/90">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
          </LiquidGlass>
        </section>

        {/* Avatar Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Glass Avatars & Badges</h2>
          
          <div className="flex justify-center items-center gap-8">
            <LiquidGlass
              displacementScale={25}
              blurAmount={0.1}
              saturation={120}
              aberrationIntensity={1}
              elasticity={0.05}
              cornerRadius={999}
              mouseContainer={containerRef}
              padding="0"
              style={{ 
                position: 'relative', 
                top: 'auto', 
                left: 'auto', 
                transform: 'none',
                width: '80px',
                height: '80px'
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">JD</span>
              </div>
            </LiquidGlass>

            <LiquidGlass
              displacementScale={20}
              blurAmount={0.05}
              saturation={110}
              aberrationIntensity={0.5}
              elasticity={0.02}
              cornerRadius={12}
              mouseContainer={containerRef}
              padding="6px 12px"
              style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
            >
              <span className="text-sm font-medium text-white">Badge</span>
            </LiquidGlass>

            <LiquidGlass
              displacementScale={15}
              blurAmount={0.08}
              saturation={115}
              aberrationIntensity={0.8}
              elasticity={0.03}
              cornerRadius={20}
              mouseContainer={containerRef}
              padding="8px 16px"
              style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
            >
              <span className="text-sm font-medium text-white">Status: Online</span>
            </LiquidGlass>
          </div>
        </section>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <LiquidGlass
            displacementScale={70}
            blurAmount={0.3}
            saturation={150}
            aberrationIntensity={2.5}
            elasticity={0.15}
            cornerRadius={20}
            padding="32px"
            style={{ 
              position: 'relative', 
              top: 'auto', 
              left: 'auto', 
              transform: 'none',
              maxWidth: '500px',
              margin: '20px'
            }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Glass Modal</h3>
              <p className="text-white/80 mb-6">
                This is a beautiful modal with the full liquid glass effect including 
                displacement mapping, chromatic aberration, and mouse tracking.
              </p>
              <LiquidGlass
                displacementScale={50}
                blurAmount={0.1}
                saturation={120}
                aberrationIntensity={1.5}
                elasticity={0.25}
                cornerRadius={10}
                padding="10px 20px"
                onClick={() => setModalOpen(false)}
                style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}
              >
                <span className="text-white font-medium">Close Modal</span>
              </LiquidGlass>
            </div>
          </LiquidGlass>
        </div>
      )}
    </div>
  )
}