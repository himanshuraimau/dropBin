"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


const Header = () => {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted text:', text)
    // Here you would typically send the text to your backend or process it
  }
  return (
    <div>
      
    <div className="text text-3xl pl-6 pt-2">
            dropBin
    </div>
    <div className=" pt-36 flex items-center justify-center">
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
        </form>
      </div>
    </div>
    
    </div>
  )
}

export default Header