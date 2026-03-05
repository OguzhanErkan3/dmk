import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('admin-auth')
  if (cookie?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}
