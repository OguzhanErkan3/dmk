import { list } from "@vercel/blob"

export async function GET() {
  // Blob içindeki tüm dosyaları listele
  const { blobs } = await list()

  // Her dosya için URL ve tip (image/video) belirle
  const items = blobs.map((b) => {
    const type = b.url.includes("video") || b.pathname?.includes("video") ? "video" : "image"
    return { url: b.url, type }
  })

  // JSON olarak döndür
  return Response.json(items)
}
