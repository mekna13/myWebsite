export default function Footer() {
  return (
    <footer className="bg-primary text-primary-light py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          Made with <span className="text-primary-accent">♥</span> using{' '}
          <span className="font-semibold">Next.js</span>,{' '}
          <span className="font-semibold">TypeScript</span>, 
          <span className="font-semibold">Tailwind CSS</span>
          , and{' '}
          <span className="font-semibold">Claude Code</span>
        </p>
        <p className="text-xs text-primary-light/70 mt-2">
          © 2024 Meghna Pradhan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}