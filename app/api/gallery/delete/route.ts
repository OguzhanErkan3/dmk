import { del } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  // Auth kontrolu
  const cookie = request.cookies.get('admin-auth')
  if (cookie?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
  }

  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL bulunamadi' }, { status: 400 })
    }

    await del(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Silme basarisiz' }, { status: 500 })
  }
}
