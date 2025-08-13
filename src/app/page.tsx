import ScrollableSkills from '@/components/ScrollableSkills'

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

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Profile Side */}
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
                <div className="flex space-x-6 justify-center">
                  <a href="https://www.linkedin.com/in/meghna-pradhan-9b238a182/" className="text-primary hover:text-primary-accent transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/mekna13" className="text-primary hover:text-primary-accent transition-colors">
                    <span className="sr-only">GitHub</span>
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="https://www.hackerrank.com/meghna_prd" className="text-primary hover:text-primary-accent transition-colors">
                    <span className="sr-only">HackerRank</span>
                    <svg className="w-12 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12C21.75 19.114 13.287 24 12 24s-9.75-4.886-10.392-6C1.002 16.885 1.002 7.115 1.608 6 2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908c0-.141-.115-.258-.258-.258-.141 0-.258.115-.258.258v10.534c0 .141.115.258.258.258.141 0 .258-.115.258-.258v-4.629h4.074v4.629c0 .141.115.258.258.258.141 0 .258-.115.258-.258V6.908c0-.141-.115-.258-.258-.258z" />
                    </svg>
                  </a>
                  <a href="mailto:meghna.prd@gmail.com" className="text-primary hover:text-primary-accent transition-colors">
                    <span className="sr-only">Email</span>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Skills Side */}
            <div className="flex justify-center">
              <ScrollableSkills />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-4 bg-primary-light">
        <div className="w-60 border-t-4 border-dotted border-primary/40"></div>
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
              {/* Timeline Item 1 - Texas A&M */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-primary text-primary-light rounded-lg p-6 shadow-lg">
                    <div className="h-32 bg-gradient-to-b from-transparent to-black/50 rounded-lg mb-4 flex items-end justify-center text-white font-bold text-sm"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .5)), url('https://www.swansea.ac.uk/texas/tamu/Academic-Plaza-in-Fall.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                      <span className="p-2">MS MIS at Texas A&M</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-2">AUG 2023</div>
                    <p className="text-sm">I enrolled in the Masters of Science in Management Information Systems program at Texas A&M University with the aim of broadening my expertise beyond software development.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Timeline Item 2 - Full-time at Ncompass */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-primary text-primary-light rounded-lg p-6 shadow-lg">
                    <div className="text-primary-accent font-bold mb-2">JUN 2022</div>
                    <h3 className="font-bold mb-2">Transitioned internship to full-time at Ncompass</h3>
                    <p className="text-sm">Successfully converted my internship role into a full-time position, continuing to contribute to innovative SaaS solutions.</p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 - Graduation */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-primary text-primary-light rounded-lg p-6 shadow-lg">
                    <div className="h-32 bg-gradient-to-b from-transparent to-black/70 rounded-lg mb-4 flex items-end justify-center text-white font-bold text-sm"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .7)), url('https://akm-img-a-in.tosshub.com/indiatoday/images/story/201906/Technical-Pvt-Jul1-1_770.jpeg?VersionId=.l0Uawf5fIsN3xgPV8s.JcIQdKamL9c5')", backgroundSize: 'cover', backgroundPosition: 'center top'}}>
                      <span className="p-2">CS Engineering Graduate</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-2">MAY 2022</div>
                    <p className="text-sm">Completed my four-year Computer Science Engineering program at Sikkim Manipal Institute of Technology, gaining expertise in algorithms, data structures, and software development.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Timeline Item 4 - Ncompass Internship */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-primary text-primary-light rounded-lg p-6 shadow-lg">
                    <div className="h-32 bg-gradient-to-b from-transparent to-black/50 rounded-lg mb-4 flex items-end justify-center text-white font-bold text-sm"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .5)), url('https://media.licdn.com/dms/image/D560BAQHPVqwXeFRo0w/company-logo_200_200/0/1693224093103/ncompass_techstudio_logo?e=2147483647&v=beta&t=utI4CS9Mmsmg2pRku8FAiFtg5ZY605bkeElzYZ-3HRc')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                      <span className="p-2">Internship at NCompass</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-2">JAN 2022</div>
                    <p className="text-sm">Worked on internationalizing a SaaS app with React and developed an API for an online hotel booking application using Flask.</p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 5 - Nivoda Internship */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-primary text-primary-light rounded-lg p-6 shadow-lg">
                    <div className="h-32 bg-gradient-to-b from-transparent to-black/50 rounded-lg mb-4 flex items-end justify-center text-white font-bold text-sm"
                         style={{backgroundImage: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .5)), url('https://i.vimeocdn.com/video/926792178-8f1e5a6857e7b8556a467ec1f9173115befde2a315af092f20bcfd1a9ed5f316-d_750x421.875?q=60')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                      <span className="p-2">Internship at Nivoda</span>
                    </div>
                    <div className="text-primary-accent font-bold mb-2">AUG 2021</div>
                    <p className="text-sm">Interned at Nivoda, an online B2B diamond marketplace, developing admin functions for diamond certificate management and working on customer account features.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Timeline Item 6 - Started CS */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-accent rounded-full border-4 border-primary-light"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-primary text-primary-light rounded-lg p-6 shadow-lg">
                    <div className="text-primary-accent font-bold mb-2">AUG 2018</div>
                    <h3 className="font-bold mb-2">CS Undergrad</h3>
                    <blockquote className="text-sm italic border-l-4 border-primary-accent pl-4">
                      "I began my tech journey by enrolling in a Computer Science Engineering undergraduate program at Sikkim Manipal Institute of Technology."
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-light">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder project cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-primary-light rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-primary/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-primary">Project Image</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Project {i}
                </h3>
                <p className="text-primary mb-4">
                  Description of project {i} will be loaded from the database.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="inline-flex items-center gap-2 bg-primary text-primary-light px-4 py-2 rounded-md hover:bg-primary-accent hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 bg-primary text-primary-light px-4 py-2 rounded-md hover:bg-primary-accent hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
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