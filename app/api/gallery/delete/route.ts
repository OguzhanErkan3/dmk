import { del } from "@vercel/blob"

export async function DELETE(req: Request) {
  const { url } = await req.json()

  if (!url) {
    return Response.json({ error: "URL gerekli" }, { status: 400 })
  }

  await del(url)

  return Response.json({ success: true })
}
