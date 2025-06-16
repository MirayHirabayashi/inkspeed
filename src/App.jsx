import React from "react";
import TypingSpeedTest from "./components/TypingSpeedTest";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return ( 
  <>
  <div className="flex flex-col items-center bg-black w-screen h-screen">
    <h1 className="text-[50px] text-white font-sans mt-5">inkspeed</h1>
    <TypingSpeedTest />
    <Analytics />
  </div>
  </>
  )
}

export default App;
