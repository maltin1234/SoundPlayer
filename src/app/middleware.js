import { NextResponse, userAgent } from 'next/server'

export const config = {
    matcher: '/',
  }
 //trigger
export function middleware(request) {
    return NextResponse.rewrite(new URL('/about-2', request.url))

}