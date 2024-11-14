"use client"

import { useState } from 'react'
import axios from 'axios'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"



export default function Body() {
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/user', { text})
      const currentUrl = window.location.href
      if (response.data && response.data.url) {
        setUrl(`${currentUrl}${response.data.url}`)
        setCopied(false)
      } else {
        console.error('Invalid response from server')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleCopy = () => {
    if (url) {
      navigator.clipboard.writeText(url)
      setCopied(true)
    }
  }


  return (
    <div className="pt-16 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-yellow-800 mb-4">Drop your Text</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Drop your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[16rem] p-3 text-base border-2 border-yellow-200 rounded focus:ring-2 focus:ring-yellow-300 focus:border-transparent resize-none"
          />
          
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded transition duration-300"
          >
            Submit
          </Button>
          {url && (
            <div className="flex items-center space-x-3">
              <textarea
                value={url}
                readOnly
                className="w-full h-12 p-3 text-base border-2 border-yellow-200 rounded focus:ring-2 focus:ring-yellow-300 focus:border-transparent resize-none"
              />
              <Button
                onClick={handleCopy}
                type="button"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded transition duration-300"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}