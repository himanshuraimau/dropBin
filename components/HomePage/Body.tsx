"use client"

import { useState } from 'react'
import axios from 'axios'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const expirationOptions = [
  { value: "12h", label: "12 hours" },
  { value: "1d", label: "1 day" },
  { value: "1w", label: "1 week" },
]

export default function Body() {
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const [expiration, setExpiration] = useState(expirationOptions[0])

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/user', { text, expiration: expiration.value })
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

  const toggleCombobox = () => {
    setOpen(!open)
  }

  const selectOption = (option: { value: string; label: string }) => {
    setExpiration(option)
    setOpen(false)
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
          <p className="text-lg font-bold text-yellow-800 mb-4">Expiry:</p>
          <div className="relative">
            <div
              className={cn(
                "w-full px-3 py-2 text-base border-2 border-yellow-200 rounded cursor-pointer",
                open ? "border-yellow-400" : ""
              )}
              onClick={toggleCombobox}
            >
              {expiration.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transition-transform duration-300",
                  open ? "rotate-180" : ""
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {open && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-yellow-200 rounded shadow-lg max-h-48 overflow-auto">
                {expirationOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "px-3 py-2 hover:bg-yellow-100 cursor-pointer",
                      expiration.value === option.value ? "bg-yellow-100" : ""
                    )}
                    onClick={() => selectOption(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
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