import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/test') {
    const url = request.nextUrl.clone();
    url.pathname = '/layout-test';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/test'],
};
