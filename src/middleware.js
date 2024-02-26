import { NextResponse, userAgent } from 'next/server'
 
export function middleware(request) {
  const url = request.nextUrl
  const { device } = userAgent(request)
  console.log(url)
  return NextResponse.rewrite(url)
}

// Configure the matcher to match the exact path '/home'
export const config = {
  matcher: '/',
};