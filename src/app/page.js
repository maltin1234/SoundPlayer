"use client"
import Image from "next/image";
import React, { useRef } from 'react';
export default function Home() {
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div>
       <div className="flex justify-center items-center h-screen">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={playAudio}>PLAY</button>
      <audio ref={audioRef} src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" />
    </div>
  </div>
  );
}
