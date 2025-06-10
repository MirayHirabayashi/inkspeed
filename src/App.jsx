import React from "react";
import TypingSpeedTest from "./components/TypingSpeedTest";

function App() {
  return ( 
  <>
  <div className="flex flex-col items-center bg-black w-screen h-screen">
    <h1 className="text-[45px] text-white font-sans mt-5">inkspeed</h1>
    <TypingSpeedTest />
  </div>
  </>
  )
}

export default App;
