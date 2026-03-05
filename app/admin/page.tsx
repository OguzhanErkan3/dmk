'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LogOut, Upload, Trash2, Loader2, ImageIcon, Film } from 'lucide-react'

interface GalleryFile {
  url: string
  pathname: string
  size: number
  uploadedAt: string
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        onLogin()
      } else {
        setError('Hatali kullanici adi veya sifre')
      }
    } catch {
      setError('Bir hata olustu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 px-8">
          <div className="text-center mb-8">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Yonetici Girisi</h1>
            <p className="text-muted-foreground mt-1 text-sm">Galeri yonetim paneline giris yapin</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1.5">
                Kullanici Adi
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Kullanici adi"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Sifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sifre"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                required
              />
            </div>

            {error && (
              <p className="text-destructive text-sm text-center bg-destructive/10 py-2 rounded-lg">{error}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Giris yapiliyor...
                </>
              ) : (
                'Giris Yap'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|mov)$/i.test(url) || url.includes('video')
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [files, setFiles] = useState<GalleryFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    fetch('/api/auth/check')
      .then((res) => res.json())
      .then((data) => {
        setAuthenticated(data.authenticated)
        setChecking(false)
      })
      .catch(() => setChecking(false))
  }, [])

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery/list')
      const data = await res.json()
      setFiles(data.files || [])
    } catch (error) {
      console.error('Dosya listesi alinamadi:', error)
    }
  }, [])

  useEffect(() => {
    if (authenticated) fetchFiles()
  }, [authenticated, fetchFiles])

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    setUploading(true)

    try {
      for (const file of Array.from(fileList)) {
        const formData = new FormData()
        formData.append('file', file)
        await fetch('/api/gallery/upload', {
          method: 'POST',
          body: formData,
        })
      }
      await fetchFiles()
    } catch (error) {
      console.error('Yukleme hatasi:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (url: string) => {
    if (!confirm('Bu dosyayi silmek istediginize emin misiniz?')) return
    setDeleting(url)

    try {
      await fetch('/api/gallery/delete', {
        method: 'DELETE',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' },
      })
      await fetchFiles()
    } catch (error) {
      console.error('Silme hatasi:', error)
    } finally {
      setDeleting(null)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setAuthenticated(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleUpload(e.dataTransfer.files)
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Galeri Yonetimi</h1>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {files.length} dosya
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="bg-transparent">
            <LogOut className="w-4 h-4 mr-2" />
            Cikis
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Upload Area */}
        <div
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 mb-8',
            dragOver
              ? 'border-primary bg-primary/5 scale-[1.01]'
              : 'border-border hover:border-primary/50 hover:bg-accent/20'
          )}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium">Dosyalar yukleniyor...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">
                  Dosyalari surukleyip birakin veya secin
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  JPG, PNG, WebP, GIF, MP4, WebM - Maks. 50MB
                </p>
              </div>
              <div>
                <input
                  id="file-upload-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                  multiple
                  onChange={(e) => {
                    handleUpload(e.target.files)
                    e.target.value = ''
                  }}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => document.getElementById('file-upload-input')?.click()}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Dosya Sec
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        {files.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">Henuz dosya yuklenmemis</p>
            <p className="text-muted-foreground text-sm mt-1">Yukardaki alani kullanarak dosya yukleyin</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.url}
                className="group relative aspect-square rounded-xl overflow-hidden bg-card border border-border"
              >
                {isVideoFile(file.url) || isVideoFile(file.pathname) ? (
                  <div className="relative w-full h-full">
                    <video
                      src={file.url}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-foreground/60 flex items-center justify-center">
                        <Film className="w-5 h-5 text-card" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={file.url}
                    alt="Galeri gorseli"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                    <span className="text-card text-xs">
                      {formatFileSize(file.size)}
                    </span>
                    <button
                      onClick={() => handleDelete(file.url)}
                      disabled={deleting === file.url}
                      className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground hover:bg-destructive/80 transition-colors disabled:opacity-50"
                      aria-label="Sil"
                    >
                      {deleting === file.url ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
