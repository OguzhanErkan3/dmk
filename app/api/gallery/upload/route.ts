import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Auth kontrolu
  const cookie = request.cookies.get('admin-auth')
  if (cookie?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadi' }, { status: 400 })
    }

    // Sadece gorsel ve video dosyalarina izin ver
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Desteklenmeyen dosya formati' }, { status: 400 })
    }

    // Dosya boyutu limiti: 50MB
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu 50MB limitini asiyor' }, { status: 400 })
    }

    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const blob = await put(`gallery/${timestamp}-${safeName}`, file, {
      access: 'public',
    })

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      type: file.type,
      size: file.size,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Yukleme basarisiz' }, { status: 500 })
  }
}
