'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('about')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide/show navigation based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past initial scroll threshold
        setIsVisible(false)
      } else {
        // Scrolling up or at the top
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)

      // Active section tracking
      const sections = ['about', 'projects', 'bookshelf']
      const scrollPosition = currentScrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About Me' },
    { id: 'bookshelf', label: 'Bookshelf' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-dark-purple transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          {/* Navigation Links - Centered */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-accent ${
                  activeSection === item.id 
                  ? 'text-primary-light border-b-2 border-primary-accent'
                  : 'text-primary-light/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - Centered */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-light hover:text-primary-accent transition-transform duration-200"
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-3 items-center pt-4 pb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-accent py-2 px-4 rounded ${
                  activeSection === item.id 
                    ? 'text-primary-accent bg-primary-accent/10' 
                  : 'text-primary-light/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}