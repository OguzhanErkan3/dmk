import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'gallery/' })

    const files = blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }))

    return NextResponse.json({ files })
  } catch (error) {
    console.error('List error:', error)
    return NextResponse.json({ error: 'Listeleme basarisiz' }, { status: 500 })
  }
}
