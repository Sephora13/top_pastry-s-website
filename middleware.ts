import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Exclude /admin/login and api routes/static assets
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const isLoggedIn = request.cookies.get('admin_logged_in')?.value === 'true';

    if (!isLoggedIn) {
      // Redirect to the login page
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Limit the middleware to /admin paths
export const config = {
  matcher: ['/admin/:path*'],
};
