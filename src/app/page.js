import React, { useRef, useEffect, useState } from 'react';
import disableScroll from 'disable-scroll';
import Audio from './component/Audio'; // Import the Audio component

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
  const audioRef = useRef(null); // Ref for the audio element

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
      
      // Determine the audio source based on the entrance number
      const newAudioSrc = entranceNumber === 1 ? "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" : "/audio.mp3";
      
      // Set the audio source state and trigger audio playback
      setAudioSrc(newAudioSrc);
      audioRef.current.play();
      
      // Toggle the state to indicate button click
      setIsClicked(isClicked => !isClicked);
    }
  };

  // Function to handle touch move event to prevent scrolling
  const handleTouchMove = (e) => {
    e.preventDefault();
  };

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
        <audio ref={audioRef} src={audioSrc}/>
      </div>
    </div>
  );
}
