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
  const silentAudioRef = useRef(null); // Ref for the silent audio element

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
  const playAudio = async () => {
    // Check if the audio reference exists
    if (audioRef.current) {
      // Get the entrance number from session storage
      const entranceNumber = parseInt(sessionStorage.getItem('entrance'));
      const newAudioSrc = entranceNumber === 1 ? "/Ping.wav" : "/airport.mp3";
      
      // Set the audio source state and log the new source
      setAudioSrc(newAudioSrc);
      console.log(`Setting audio source to: ${newAudioSrc}`);

      try {
        // Try to play the audio
        await audioRef.current.play();
        setIsClicked(true); // Set isClicked to true to update the button style
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  // Effect hook to set up the silent audio for autoplay
  useEffect(() => {
    // Function to play silent audio 
    const playSilentAudio = () => {
      if (silentAudioRef.current) {
        console.log("Triggering silent audio");
        silentAudioRef.current.play();
      }
    };

    // Initial play of the silent audio
    playSilentAudio();

    // Set interval to play silent audio every 1 minute
    const interval = setInterval(playSilentAudio, 60000); // 60000 milliseconds = 1 minute

    // Cleanup function to clear the interval
    return () => {
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
          disabled={isClicked} // Disable the button after it's clicked
        >
          <p className="text-4xl md:text-7xl mb-0">Press here</p>
        </button>
        {/* Main audio element */}
        <audio ref={audioRef} src={audioSrc} preload="auto" />
        {/* Silent audio element */}
        <audio ref={silentAudioRef} src="/silent.mp3" autoPlay loop />
      </div>
    </div>
  );
}
