"use client"

import { useState, useEffect } from "react"

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          type="text"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2"
        />
        <button
          onClick={() => {
            if (username === "admin" && password === "orucourc1987") {
              setLoggedIn(true)
            } else {
              alert("Hatalı giriş")
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Giriş Yap
        </button>
      </div>
    )
  }

  return <GalleryAdmin />
}

function GalleryAdmin() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [items, setItems] = useState<any[]>([])

  // Listeyi çek
  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [])

  // Upload
  const handleUpload = async () => {
    if (!files) return
    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)

      await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      })
    }
    // Listeyi güncelle
    const res = await fetch("/api/gallery")
    setItems(await res.json())
  }

  // Silme
  const handleDelete = async (url: string) => {
    await fetch("/api/gallery/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
    setItems(items.filter((item) => item.url !== url))
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Galeri Yönetimi</h1>

      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Yükle
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {items.map((item, i) => (
          <div key={i} className="relative">
            {item.type === "image" ? (
              <img src={item.url} alt="" className="rounded-lg" />
            ) : (
              <video src={item.url} controls className="rounded-lg" />
            )}
            <button
              onClick={() => handleDelete(item.url)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
