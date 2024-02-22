"use client"
import Image from "next/image";
import React, { useRef, useEffect } from 'react';
import disableScroll from 'disable-scroll';
import { middleware } from './middleware';


export default function Home() {
  const audioRef = useRef(null);
  useEffect(() => {
    disableScroll.on();
    return () => {
      disableScroll.off();
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-yellow-400" style={{ touchAction: 'none', overflow: 'hidden' }}>
      <div className="text-center">
        <p className="text-5xl md:text-7xl mb-4 py-4 px-6">In need of<br />support?</p>
        <p className="text-lg md:text-2xl mb-4 py-4 px-6">Press the button <br /> and the Startbox will <br /> come to assist you</p>
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