"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'

const Body = () => {
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false) 

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const data  = await axios.post('/api/user', { text })
    const currentUrl = window.location.href
    setUrl(`${currentUrl}${data.data.url}`)
    setCopied(false) 
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url) 
    setCopied(true) 
  }

  return (
    <div className="pt-36 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-amber-800 mb-6">Drop your Text</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            placeholder="Drop your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 p-4 text-lg border-2 border-amber-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          />
          <Button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Submit
          </Button>
          {url && (
            <div className="flex items-center space-x-4">
              <Textarea
                value={url}
                readOnly
                className="w-full h-12 p-4 text-lg border-2 border-amber-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              />
              <Button 
                onClick={handleCopy} 
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
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

export default Body
