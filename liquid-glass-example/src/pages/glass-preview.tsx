import React, { useState } from 'react'
import { 
  // Layout components
  GlassCard, 
  GlassSidebar, 
  GlassPanel, 
  GlassModal, 
  GlassNavbar,
  // Input components
  GlassInput,
  GlassTextarea,
  GlassSelect,
  // Button & Action components
  GlassButton,
  GlassToggle,
  GlassCheckbox,
  GlassTab,
  // Feedback & Misc components
  GlassAvatar,
  GlassBadge,
  GlassTooltip,
  GlassLoader,
  GlassDivider
} from '../liquid-glass-ui'

export default function GlassPreview() {
  // State for interactive components
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [toggleChecked, setToggleChecked] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [activeTab, setActiveTab] = useState('tab1')
  const [loading, setLoading] = useState(false)

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
  ]

  const tabItems = [
    { id: 'tab1', label: 'First Tab', content: <div className="text-white">Content for the first tab</div> },
    { id: 'tab2', label: 'Second Tab', content: <div className="text-white">Content for the second tab</div> },
    { id: 'tab3', label: 'Third Tab', content: <div className="text-white">Content for the third tab</div> },
  ]

  const handleLoadingDemo = async () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center opacity-30" />
      
      {/* Navigation */}
      <GlassNavbar
        sticky
        logo={<h1 className="text-xl font-bold text-white">Glass UI</h1>}
        actions={
          <GlassButton 
            size="sm" 
            variant="secondary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Menu
          </GlassButton>
        }
      >
        <nav className="flex space-x-6">
          <a href="#layout" className="text-white/80 hover:text-white transition-colors">Layout</a>
          <a href="#inputs" className="text-white/80 hover:text-white transition-colors">Inputs</a>
          <a href="#buttons" className="text-white/80 hover:text-white transition-colors">Buttons</a>
          <a href="#feedback" className="text-white/80 hover:text-white transition-colors">Feedback</a>
        </nav>
      </GlassNavbar>

      {/* Sidebar */}
      <GlassSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        overlay
        position="left"
        width="md"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-6">Menu</h2>
          <nav className="space-y-2">
            <a href="#layout" className="block text-white/80 hover:text-white transition-colors py-2">Layout Components</a>
            <a href="#inputs" className="block text-white/80 hover:text-white transition-colors py-2">Input Components</a>
            <a href="#buttons" className="block text-white/80 hover:text-white transition-colors py-2">Button Components</a>
            <a href="#feedback" className="block text-white/80 hover:text-white transition-colors py-2">Feedback Components</a>
          </nav>
        </div>
      </GlassSidebar>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center py-16">
          <GlassCard variant="elevated" className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Liquid Glass UI Library</h1>
            <p className="text-xl text-white/80 mb-8">
              A comprehensive collection of beautiful glass morphism components for React
            </p>
            <div className="flex justify-center gap-4">
              <GlassButton variant="primary" size="lg">
                Get Started
              </GlassButton>
              <GlassButton variant="secondary" size="lg">
                View Docs
              </GlassButton>
            </div>
          </GlassCard>
        </section>

        {/* Layout Components */}
        <section id="layout" className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Layout Components</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-2">Glass Card</h3>
              <p className="text-white/70">A versatile container with glass morphism effects.</p>
            </GlassCard>

            <GlassCard variant="elevated" hover>
              <h3 className="text-lg font-semibold text-white mb-2">Elevated Card</h3>
              <p className="text-white/70">Enhanced glass effect with hover animations.</p>
            </GlassCard>

            <GlassCard variant="subtle">
              <h3 className="text-lg font-semibold text-white mb-2">Subtle Card</h3>
              <p className="text-white/70">Minimal glass effect for understated design.</p>
            </GlassCard>
          </div>

          <div className="flex gap-4 justify-center">
            <GlassButton onClick={() => setPanelOpen(true)}>
              Open Panel
            </GlassButton>
            <GlassButton onClick={() => setModalOpen(true)}>
              Open Modal
            </GlassButton>
          </div>
        </section>

        {/* Input Components */}
        <section id="inputs" className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Input Components</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <GlassCard>
              <div className="space-y-6">
                <GlassInput
                  label="Email"
                  placeholder="Enter your email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />

                <GlassTextarea
                  label="Message"
                  placeholder="Enter your message"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  minRows={3}
                  maxRows={6}
                />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="space-y-6">
                <GlassSelect
                  label="Choose Option"
                  placeholder="Select an option..."
                  value={selectValue}
                  onChange={setSelectValue}
                  options={selectOptions}
                />

                <GlassInput
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  rightIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                />
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Button & Action Components */}
        <section id="buttons" className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Button & Action Components</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">Buttons</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <GlassButton variant="primary" size="sm">Small</GlassButton>
                  <GlassButton variant="primary" size="md">Medium</GlassButton>
                  <GlassButton variant="primary" size="lg">Large</GlassButton>
                </div>
                <div className="flex gap-3">
                  <GlassButton variant="primary">Primary</GlassButton>
                  <GlassButton variant="secondary">Secondary</GlassButton>
                  <GlassButton variant="ghost">Ghost</GlassButton>
                  <GlassButton variant="danger">Danger</GlassButton>
                </div>
                <GlassButton 
                  loading={loading} 
                  onClick={handleLoadingDemo}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Start Loading'}
                </GlassButton>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">Controls</h3>
              <div className="space-y-6">
                <GlassToggle
                  label="Enable notifications"
                  checked={toggleChecked}
                  onChange={setToggleChecked}
                  size="md"
                />
                
                <GlassCheckbox
                  label="I agree to the terms"
                  checked={checkboxChecked}
                  onChange={setCheckboxChecked}
                  size="md"
                />

                <div className="space-y-2">
                  <GlassCheckbox label="Small checkbox" size="sm" />
                  <GlassCheckbox label="Medium checkbox" size="md" />
                  <GlassCheckbox label="Large checkbox" size="lg" />
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="max-w-2xl mx-auto">
            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">Tabs</h3>
              <GlassTab
                tabs={tabItems}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                variant="pills"
                size="md"
              />
            </GlassCard>
          </div>
        </section>

        {/* Feedback & Misc Components */}
        <section id="feedback" className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Feedback & Misc Components</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">Avatars</h3>
              <div className="flex items-center gap-4">
                <GlassAvatar size="sm" initials="SM" />
                <GlassAvatar size="md" initials="MD" showStatus status="online" />
                <GlassAvatar size="lg" initials="LG" showStatus status="away" />
                <GlassAvatar size="xl" initials="XL" showStatus status="busy" />
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">Badges</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <GlassBadge count={5}>
                    <div className="w-8 h-8 bg-white/20 rounded"></div>
                  </GlassBadge>
                  <GlassBadge count={99} maxCount={99}>
                    <div className="w-8 h-8 bg-white/20 rounded"></div>
                  </GlassBadge>
                  <GlassBadge count={100}>
                    <div className="w-8 h-8 bg-white/20 rounded"></div>
                  </GlassBadge>
                </div>
                <div className="flex gap-2">
                  <GlassBadge variant="primary">Primary</GlassBadge>
                  <GlassBadge variant="success">Success</GlassBadge>
                  <GlassBadge variant="warning">Warning</GlassBadge>
                  <GlassBadge variant="danger">Danger</GlassBadge>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">Tooltips</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <GlassTooltip content="This is a tooltip">
                    <GlassButton size="sm">Hover me</GlassButton>
                  </GlassTooltip>
                  <GlassTooltip content="Click tooltip" trigger="click">
                    <GlassButton size="sm">Click me</GlassButton>
                  </GlassTooltip>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">Loaders</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <GlassLoader variant="spinner" size="md" />
                  <p className="text-white/70 text-sm mt-2">Spinner</p>
                </div>
                <div className="text-center">
                  <GlassLoader variant="dots" size="md" />
                  <p className="text-white/70 text-sm mt-2">Dots</p>
                </div>
                <div className="text-center">
                  <GlassLoader variant="pulse" size="md" />
                  <p className="text-white/70 text-sm mt-2">Pulse</p>
                </div>
                <div className="text-center">
                  <GlassLoader variant="bars" size="md" />
                  <p className="text-white/70 text-sm mt-2">Bars</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">Dividers</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-white/70 text-sm mb-2">Solid</p>
                  <GlassDivider variant="solid" />
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-2">With Label</p>
                  <GlassDivider variant="solid" label="OR" />
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-2">Gradient</p>
                  <GlassDivider variant="gradient" />
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-2">Dashed</p>
                  <GlassDivider variant="dashed" />
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <GlassDivider className="mb-8" />
          <p className="text-white/60">
            Built with ❤️ using React and the Liquid Glass UI Library
          </p>
        </footer>
      </div>

      {/* Panel */}
      <GlassPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        position="right"
        overlay
      >
        <h3 className="text-lg font-semibold text-white mb-4">Side Panel</h3>
        <p className="text-white/70 mb-4">
          This is a glass panel that slides in from the side.
        </p>
        <GlassButton onClick={() => setPanelOpen(false)}>
          Close Panel
        </GlassButton>
      </GlassPanel>

      {/* Modal */}
      <GlassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Glass Modal"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-white/80">
            This is a beautiful glass modal with backdrop blur effects.
          </p>
          <p className="text-white/60">
            You can press Escape to close it, or click the overlay.
          </p>
          <div className="flex gap-3 pt-4">
            <GlassButton onClick={() => setModalOpen(false)}>
              Close
            </GlassButton>
            <GlassButton variant="secondary">
              Action
            </GlassButton>
          </div>
        </div>
      </GlassModal>
    </div>
  )
}