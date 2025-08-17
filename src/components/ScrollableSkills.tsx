'use client'

interface SkillCategory {
  category: string
  skills: string[]
}

const skillsData: SkillCategory[] = [
  {
    category: "Frontend Dev",
    skills: ["Angular", "React", "Next.js", "HTML", "CSS SCSS", "TypeScript", "JavaScript"]
  },
  {
    category: "Languages", 
    skills: ["Javascript", "Typescript", "Python", "Java", "C++"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Heroku", "Docker", "Linux", "Nginx", "Git", "Github", "GitLab"]
  },
  {
    category: "Databases & APIs",
    skills: ["MySQL", "MongoDB", "Firebase", "PostgreSQL", "Redis", "RESTful APIs", "GraphQL", "OAuth", "JWT"]
  }
]

export default function ScrollableSkills() {
  return (
    <div className="h-full w-full">
      <h5 className="text-xl font-semibold mb-6 text-primary text-center">
        SKILLS
      </h5>
      
      {/* Horizontal Scrollable Skills Container */}
      <div className="h-80 space-y-3">
        {skillsData.map((category) => (
          <div key={category.category} className="border-2 border-primary/20 rounded-md p-3 space-y-2">
            <h6 className="font-medium text-primary text-left text-sm">
              {category.category}
            </h6>
            
            {/* Horizontal scrollable skills for this category */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent hover:scrollbar-thumb-primary/50 -mx-1 px-1">
              <div className="flex gap-3 pb-3 w-max">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-2 bg-theme-dark-purple text-theme-light-bg text-sm font-medium hover:bg-primary-accent hover:text-primary transition-colors duration-200 whitespace-nowrap touch-manipulation" 
                    style={{borderRadius: '5px'}}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}