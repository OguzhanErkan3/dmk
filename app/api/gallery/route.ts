import { list } from "@vercel/blob"

export async function GET() {
  // Blob içindeki tüm dosyaları listele
  const { blobs } = await list()

  // Her dosya için URL ve tip (image/video) belirle
  const items = blobs.map((b) => {
    const contentType = b.contentType ?? "" // undefined ise boş string
    const type = contentType.startsWith("video") ? "video" : "image"
    return { url: b.url, type }
  })

  // JSON olarak döndür
  return Response.json(items)
}
