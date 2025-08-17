import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if the user is trying to access admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          // Allow access to login page
          if (req.nextUrl.pathname === '/admin/login') {
            return true
          }
          // Require authentication for other admin routes
          return !!token
        }
        
        // Allow access to all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*']
}