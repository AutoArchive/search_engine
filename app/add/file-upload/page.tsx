'use client'

export default function FileUploadPage() {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    // File handling logic will be implemented later
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">文件上传</h1>
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">文件上传</h2>
        <input
          type="file"
          onChange={handleFileUpload}
          className="rounded bg-blue-50 py-2 font-semibold file:border-0 file:px-4 file:text-sm"
        />
      </div>
    </div>
  )
}
