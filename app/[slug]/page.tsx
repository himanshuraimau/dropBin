'use client'

import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useParams } from "next/navigation"

export default function TextFetcher() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const params = useParams()
  const slug = params.slug as string

  const fetchText = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/user/${slug}`)
      setText(response.data.text)
      setError("")
    } catch (error) {
      console.error("Error fetching text:", error)
      setError("Failed to fetch text. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchText()
    }
  }, [slug])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-amber-800 mb-6">
          Text for: {slug}
        </h1>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Textarea
            placeholder="Your text here..."
            value={text}
            onChange={handleTextChange}
            className="w-full h-64 p-4 text-lg border-2 border-amber-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          />
        )}
      </div>
    </div>
  )
}