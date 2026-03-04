import { put } from "@vercel/blob"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return Response.json({ error: "Dosya bulunamadı" }, { status: 400 })
  }

  const blob = await put(file.name, file, { access: "public" })

  return Response.json({
    url: blob.url,
    type: file.type.startsWith("video") ? "video" : "image",
  })
}
