'use client'

import ScrollableSkills from '@/components/ScrollableSkills'
import BookshelfSection from '@/components/BookshelfSection'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProjectsSection from '@/components/ProjectsSection'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [resumeData, setResumeData] = useState<{ url: string; filename: string } | null>(null)

  useEffect(() => {
    // Fetch resume data
    const fetchResume = async () => {
      try {
        const response = await fetch('/api/resume')
        const result = await response.json()

        if (result.success) {
          setResumeData({
            url: result.data.cloudinaryUrl,
            filename: result.data.filename
          })
        }
      } catch (error) {
        console.error('Error fetching resume:', error)
      }
    }

    fetchResume()
  }, [])
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
      {/* Hero Section */}
        <section id="home" className="hero flex items-center justify-center min-h-screen text-center px-4 bg-primary text-primary-light animate-gradient">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-primary-light animate-fade-in-up">
            Hi, I'm <span className="text-primary-accent animate-type">Meghna</span>
          </h1>
            <h3 className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 leading-relaxed animate-fade-in-up delay-600">
              Software Engineer / Full-Stack Development /<br className="sm:hidden" /> AWS & AI-Driven Development
          </h3>
          <div className="flex justify-center animate-fade-in-up delay-900">
            <a 
              href="#about" 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-light hover:bg-primary-accent transition-colors duration-300 text-primary animate-float"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
        <section id="about" className="py-12 md:py-20 px-4 bg-primary-light">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-primary">
            About Me
          </h2>

            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-start">
            {/* Profile Side */}
              <div className="space-y-4 md:space-y-6 text-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden bg-primary/20">
                  <Image
                    src="/images/profile.jpg"
                    alt="Meghna Pradhan"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                    style={{ 
                      objectPosition: 'center top'
                    }}
                    priority
                    quality={95}
                  />
              </div>

                <p className="text-primary leading-relaxed text-sm md:text-base max-w-md mx-auto md:max-w-none">
                  I'm a software developer passionate about full-stack development, cloud technologies, and building impactful products. I focus on crafting seamless user experiences, writing clean and efficient code, and staying ahead of industry trends. Let's connect and explore opportunities to create meaningful solutions together!
              </p>

              <div>
                  <h5 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-primary">
                  CONTACT ME
                </h5>
                  <div className="flex flex-wrap gap-3 md:gap-6 justify-center">
                    <a href="https://www.linkedin.com/in/meghna-pradhan-9b238a182/" className="text-primary hover:text-primary-accent transition-colors p-2">
                    <span className="sr-only">LinkedIn</span>
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                    <a href="https://github.com/mekna13" className="text-primary hover:text-primary-accent transition-colors p-2">
                    <span className="sr-only">GitHub</span>
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                    <a href="https://www.hackerrank.com/meghna_prd" className="text-primary hover:text-primary-accent transition-colors p-2">
                    <span className="sr-only">HackerRank</span>
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M16 0c1.714 0 13 6.516 13.854 8 0.859 1.484 0.859 14.516 0 16s-12.141 8-13.854 8c-1.714 0-13-6.516-13.859-8-0.854-1.484-0.854-14.516 0-16 0.859-1.484 12.146-8 13.859-8zM19.063 9.068c-0.193 0-0.349 0.151-0.349 0.344v5.167h-5.427v-5.37h0.932c0.188 0 0.339-0.151 0.339-0.344 0-0.125-0.068-0.234-0.161-0.292l-2.099-2.010c-0.063-0.089-0.188-0.146-0.302-0.146-0.109 0-0.214 0.057-0.276 0.141l-2.24 2.016c-0.094 0.063-0.161 0.167-0.161 0.292 0 0.188 0.151 0.344 0.344 0.344h0.938l0.010 13.38c0 0.193 0.146 0.344 0.339 0.344h1.99c0.188 0 0.344-0.151 0.344-0.344v-5.339h5.432v5.536h-0.932c-0.193 0-0.344 0.156-0.344 0.344 0 0.125 0.068 0.234 0.161 0.292l2.104 2.016c0.057 0.083 0.188 0.146 0.302 0.146s0.208-0.063 0.276-0.146l2.24-2.016c0.094-0.057 0.161-0.167 0.161-0.292 0-0.188-0.156-0.344-0.344-0.344h-0.938l-0.010-13.375c0-0.198-0.151-0.349-0.339-0.349h-1.99z"/>
                    </svg>
                  </a>
                    <a href="mailto:meghna.prd@gmail.com" className="text-primary hover:text-primary-accent transition-colors p-2">
                    <span className="sr-only">Email</span>
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>

                {/* Resume Download Button */}
                {resumeData && (
                  <div className="mt-6">
                    <a
                      href="/api/resume/download"
                      className="inline-flex items-center bg-primary text-primary-light px-6 py-3 rounded-md hover:bg-primary-accent hover:text-primary transition-colors font-medium"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z" />
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 01-.308-.018v1.426H7v-3.936A7.558 7.558 0 018.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.60v-3.917A7.947 7.947 0 0111.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z" />
                      </svg>
                      Download Resume
                    </a>
                  </div>
                )}
              </div>
            </div>

              {/* Skills Side - Hidden on mobile */}
              <div className="hidden md:flex justify-center">
              <ScrollableSkills />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-4 bg-primary-light">
        <div className="w-80 border-t-4 border-dotted border-primary/40"></div>
      </div>

      {/* Experience Timeline Section */}
      <section className="py-20 px-4 bg-primary-light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">
            My Journey
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/30 h-full"></div>
            
            <div className="space-y-12">
              {/* Timeline Item 1 - Software Developer at CTE */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-primary text-primary-light rounded-lg p-4 shadow-lg">
                    <div className="h-24 bg-gradient-to-b from-transparent to-black/50 rounded-lg mb-3 flex items-end justify-center text-white font-bold text-xs"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .5)), url('https://www.swansea.ac.uk/texas/tamu/Academic-Plaza-in-Fall.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                      <span className="p-1">CTE Texas A&M</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-1">2024 - Present</div>
                    <h3 className="font-bold mb-1">Software Developer - Graduate Student Technician</h3>
                    <p className="text-xs opacity-90">Center for Teaching Excellence, Texas A&M</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Timeline Item 2 - MS MIS Program */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-primary text-primary-light rounded-lg p-4 shadow-lg">
                    <div className="h-24 bg-gradient-to-b from-transparent to-black/50 rounded-lg mb-3 flex items-end justify-center text-white font-bold text-xs"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .5)), url('https://www.swansea.ac.uk/texas/tamu/Academic-Plaza-in-Fall.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                      <span className="p-1">MS MIS at Texas A&M</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-1">AUG 2023</div>
                    <h3 className="font-bold mb-1">Enrolled in MS MIS Program</h3>
                    <p className="text-xs opacity-90">Texas A&M University</p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 - Full-time Software Developer at Ncompass */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-primary text-primary-light rounded-lg p-4 shadow-lg">
                    <div className="h-24 bg-gradient-to-b from-transparent to-black/50 rounded-lg mb-3 flex items-end justify-center text-white font-bold text-xs"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .5)), url('https://media.licdn.com/dms/image/D560BAQHPVqwXeFRo0w/company-logo_200_200/0/1693224093103/ncompass_techstudio_logo?e=2147483647&v=beta&t=utI4CS9Mmsmg2pRku8FAiFtg5ZY605bkeElzYZ-3HRc')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                      <span className="p-1">Ncompass</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-1">JUN 2022</div>
                    <h3 className="font-bold mb-1">Software Developer</h3>
                    <p className="text-xs opacity-90">Ncompass (Full-time)</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Timeline Item 4 - Graduated CS */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-primary text-primary-light rounded-lg p-4 shadow-lg">
                    <div className="h-24 bg-gradient-to-b from-transparent to-black/70 rounded-lg mb-3 flex items-end justify-center text-white font-bold text-xs"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .7)), url('https://akm-img-a-in.tosshub.com/indiatoday/images/story/201906/Technical-Pvt-Jul1-1_770.jpeg?VersionId=.l0Uawf5fIsN3xgPV8s.JcIQdKamL9c5')", backgroundSize: 'cover', backgroundPosition: 'center top'}}>
                      <span className="p-1">CS Engineering Graduate</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-1">MAY 2022</div>
                    <h3 className="font-bold mb-1">Graduated CS</h3>
                    <p className="text-xs opacity-90">Sikkim Manipal Institute of Technology</p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 5 - Software Dev Internship at Ncompass */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-primary text-primary-light rounded-lg p-4 shadow-lg">
                    <div className="h-24 bg-gradient-to-b from-transparent to-black/50 rounded-lg mb-3 flex items-end justify-center text-white font-bold text-xs"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .5)), url('https://media.licdn.com/dms/image/D560BAQHPVqwXeFRo0w/company-logo_200_200/0/1693224093103/ncompass_techstudio_logo?e=2147483647&v=beta&t=utI4CS9Mmsmg2pRku8FAiFtg5ZY605bkeElzYZ-3HRc')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                      <span className="p-1">Internship at Ncompass</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-1">JAN 2022</div>
                    <h3 className="font-bold mb-1">Software Dev Internship</h3>
                    <p className="text-xs opacity-90">Ncompass</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Timeline Item 6 - Software Dev Internship at Nivoda */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-primary text-primary-light rounded-lg p-4 shadow-lg">
                    <div className="h-24 bg-gradient-to-b from-transparent to-black/50 rounded-lg mb-3 flex items-end justify-center text-white font-bold text-xs"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .5)), url('https://i.vimeocdn.com/video/926792178-8f1e5a6857e7b8556a467ec1f9173115befde2a315af092f20bcfd1a9ed5f316-d_750x421.875?q=60')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                      <span className="p-1">Internship at Nivoda</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-1">AUG 2021</div>
                    <h3 className="font-bold mb-1">Software Dev Internship</h3>
                    <p className="text-xs opacity-90">Nivoda</p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 7 - CS Undergrad */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-primary text-primary-light rounded-lg p-4 shadow-lg">
                    <div className="h-24 bg-gradient-to-b from-transparent to-black/70 rounded-lg mb-3 flex items-end justify-center text-white font-bold text-xs"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .7)), url('https://akm-img-a-in.tosshub.com/indiatoday/images/story/201906/Technical-Pvt-Jul1-1_770.jpeg?VersionId=.l0Uawf5fIsN3xgPV8s.JcIQdKamL9c5')", backgroundSize: 'cover', backgroundPosition: 'center top'}}>
                      <span className="p-1">CS Undergrad</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-1">AUG 2018</div>
                    <h3 className="font-bold mb-1">CS Undergrad</h3>
                    <p className="text-xs opacity-90">Sikkim Manipal Institute of Technology</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Bookshelf Section */}
      <BookshelfSection />
    </main>
    <Footer />
    </>
  )
}