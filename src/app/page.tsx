export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero flex items-center justify-center min-h-screen text-center px-4 bg-primary text-primary-light">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-light">
            Hi, I'm <span className="text-primary-accent">Meghna</span>
          </h1>
          <h3 className="text-xl md:text-2xl mb-8 opacity-90">
            Software Engineer / Cloud-Native Applications / AI-Driven Development
          </h3>
          <div className="flex justify-center">
            <a 
              href="#about" 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-light hover:bg-primary-accent transition-colors duration-300 text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-primary-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden bg-primary/20">
                {/* Placeholder for profile image */}
                <div className="w-full h-full flex items-center justify-center text-primary">
                  Profile Image
                </div>
              </div>
              <p className="text-primary leading-relaxed">
                I'm currently pursuing a Master's in Management Information Systems at Texas A&M, 
                passionate about software development and product innovation. I excel in crafting 
                seamless user experiences and staying ahead of industry trends. Let's connect and 
                collaborate on exciting projects!
              </p>
              <div>
                <h5 className="text-lg font-semibold mb-4 text-primary">
                  CONTACT ME
                </h5>
                <div className="flex space-x-4 justify-center">
                  <a href="https://www.linkedin.com/in/meghna-pradhan-9b238a182/" className="text-primary hover:text-primary-accent transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/mekna13" className="text-primary hover:text-primary-accent transition-colors">
                    <span className="sr-only">GitHub</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="mailto:meghna.prd@gmail.com" className="text-red-600 hover:text-red-800 transition-colors">
                    <span className="sr-only">Email</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h5 className="text-xl font-semibold mb-6 text-primary">
                SKILLS
              </h5>
              <div className="space-y-6">
                <div>
                  <h6 className="font-medium mb-3 text-primary">Frontend Dev</h6>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Angular', 'React', 'Next.js', 'HTML', 'CSS SCSS'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-theme-dark-purple text-theme-light-bg text-sm" style={{borderRadius: '5px'}}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h6 className="font-medium mb-3 text-primary">Languages</h6>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Javascript', 'Typescript', 'Python', 'Java'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-theme-dark-purple text-theme-light-bg text-sm" style={{borderRadius: '5px'}}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h6 className="font-medium mb-3 text-primary">Server Management</h6>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['AWS', 'Heroku', 'Docker', 'Linux'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-theme-dark-purple text-theme-light-bg text-sm" style={{borderRadius: '5px'}}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h6 className="font-medium mb-3 text-primary">Databases</h6>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['MySQL', 'MongoDB', 'Firebase', 'PostgreSQL'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-theme-dark-purple text-theme-light-bg text-sm" style={{borderRadius: '5px'}}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h6 className="font-medium mb-3 text-primary">Version Control</h6>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Git', 'Github', 'Bitbucket'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-theme-dark-purple text-theme-light-bg text-sm" style={{borderRadius: '5px'}}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h6 className="font-medium mb-3 text-primary">Web APIs</h6>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['RESTful APIs', 'GraphQL'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-theme-dark-purple text-theme-light-bg text-sm" style={{borderRadius: '5px'}}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder project cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Project Image</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Project {i}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Description of project {i} will be loaded from the database.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}