"use client"
import Image from "next/image";
import React, { useRef, useEffect,useState } from 'react';
import disableScroll from 'disable-scroll';




export default function Home() {

  const [isClicked, setIsClicked] = useState(false)
  const [audioSrc, setAudioSrc] = useState("");
  const audioRef = useRef(null);
  useEffect(() => {
    
    const entranceNumber = Math.floor(Math.random() * 2) + 1;
    sessionStorage.setItem('entrance', entranceNumber.toString());
    disableScroll.on();
    return () => {
      disableScroll.off();
    };
  }, []);

 

  const playAudio = () => {
    if (audioRef.current) {
      const entranceNumber = parseInt(sessionStorage.getItem('entrance'));
      console.log(entranceNumber)
      // Set audio source based on the entrance number
      const newAudioSrc = entranceNumber === 1 ? "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" : "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
       console.log(newAudioSrc)
       // Update audio source
       setAudioSrc(newAudioSrc);
       // Play audio
       
       audioRef.current.play();
      setIsClicked(isClicked => !isClicked)
      
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
         className={`text-white font-bold py-4 px-6 rounded-lg btn ${isClicked ? 'bg-neutral-800' : 'bg-slate-950'}`}
         
          onClick={playAudio}
        >
          <p className="text-4xl md:text-7xl mb-0">Press here</p>
        </button>
        <audio ref={audioRef} src={audioSrc}/>
      </div>
    </div>
  );
}