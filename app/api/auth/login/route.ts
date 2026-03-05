import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === 'admin' && password === 'orucoruc') {
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 gun
      })
      return response
    }

    return NextResponse.json({ error: 'Hatali kullanici adi veya sifre' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Giris basarisiz' }, { status: 500 })
  }
}
