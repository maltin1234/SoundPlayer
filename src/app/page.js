"use client"
import React, { useRef, useEffect, useState } from 'react';
import disableScroll from 'disable-scroll';

/**
 * Home Component
 * 
 * This component represents the main page of the application.
 * It provides a button for users to trigger an audio playback.
 */
export default function Home() {
  // State variables
  const [isClicked, setIsClicked] = useState(false); // State to track button click
  const [audioSrc, setAudioSrc] = useState(""); // State to store audio source
  const audioRef = useRef(null); // Ref for the main audio element
  const iframeRef = useRef(null); // Ref for the hidden iframe

  // Effect hook to run on component mount
  useEffect(() => {
    // Generate a random entrance number and store it in session storage
    const entranceNumber = Math.floor(Math.random() * 2) + 1;
    sessionStorage.setItem('entrance', entranceNumber.toString());

    // Disable scrolling on component mount
    disableScroll.on();

    // Cleanup function to re-enable scrolling on component unmount
    return () => {
      disableScroll.off();
    };
  }, []);

  // Function to handle button click event
  const playAudio = () => {
    // Check if the audio reference exists
    if (audioRef.current) {
      // Get the entrance number from session storage
      const entranceNumber = parseInt(sessionStorage.getItem('entrance'));
      let newAudioSrc;
      newAudioSrc = entranceNumber === 1 ? "/Ping.wav" : "/airport.mp3";

      // Set the audio source state and trigger audio playback
      setAudioSrc(newAudioSrc);
      audioRef.current.play();
      setIsClicked(true); // Set isClicked to true to update the button style
    }
  };

  // Effect hook to set up the iframe for autoplay
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // Hide the iframe
    iframe.src = 'about:blank'; // Set the iframe's source to a blank page

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Set the iframe reference
    iframeRef.current = iframe;

    // Function to play silent audio within the iframe
    const playSilentAudio = () => {
      if (iframeRef.current) {
        const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
        const audio = iframeDoc.createElement('audio');
        audio.src = '/silent.mp3'; // Specify your silent audio file here
        audio.autoplay = true; // Set the autoplay attribute
        audio.muted = true; // Mute the audio
        iframeDoc.body.appendChild(audio);
      }
    };

    // Initial play of the silent audio
    playSilentAudio();

    // Set interval to play silent audio every 11 minutes
    const interval = setInterval(playSilentAudio, 660000); // 660000 milliseconds = 11 minutes

    // Cleanup function to remove the iframe and clear the interval
    return () => {
      document.body.removeChild(iframe);
      clearInterval(interval);
    };
  }, []);

  // Render the component
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
        <audio ref={audioRef} src={audioSrc} />
      </div>
    </div>
  );
}
