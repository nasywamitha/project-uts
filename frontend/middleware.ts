import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { handleAuthMiddleware } from './app/middleware/authMiddleware';
import { handleProxyMiddleware } from './app/middleware/proxyMiddleware';

export function middleware(request: NextRequest) {
  const authResponse = handleAuthMiddleware(request);
  if (authResponse) return authResponse;

  const proxyResponse = handleProxyMiddleware(request);
  if (proxyResponse) return proxyResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};