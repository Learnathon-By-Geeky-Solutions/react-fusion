import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 class="text-3xl font-bold underline">
        Instructor Here!
      </h1>
      <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
    </>
  )
}

export default App
