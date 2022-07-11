import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/test') {
    return NextResponse.redirect(new URL('/layout-test', request.url));
  }
  if (request.nextUrl.pathname === '/another') {
    return NextResponse.rewrite(new URL('/rewrite', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/test', '/another/:path*'],
};
