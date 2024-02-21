"use client"
import Image from "next/image";
import React, { useRef } from 'react';
import styles from '../app/styles/touch-actions.module.css'; // Import CSS module
export default function Home() {
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-yellow-200">
    <div className="text-center">
      <p className="text-5xl md:text-7xl mb-4 py-4 px-6">In need of<br/>support?</p>
      <p className="text-lg md:text-2xl mb-4 py-4 px-6">Press the button <br/> and the Startbox will <br/> come to assist you</p>
      <button 
        className="bg-neutral-800 hover:bg-slate-950 text-white font-bold py-4 px-6 rounded-lg btn"
        onClick={playAudio}
      >
        <p className="text-4xl md:text-7xl mb-0">Press here</p>
      </button>
      <audio ref={audioRef} src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" />
    </div>
  </div>
  
  
  );
}
