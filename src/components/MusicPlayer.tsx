import { useState, useRef, useEffect } from "react";
import { FaPlayCircle, FaPauseCircle, FaArrowCircleRight, FaArrowCircleLeft, FaExpandAlt, FaCompressAlt } from "react-icons/fa";

type Track = {
  title: string;
  url: string;
};

const tracks: Track[] = [
  { title: "Miami Sky - Karl Casey", url: "./miamiSky.mp3" },
  { title: "Much Higher - Causmic", url: "./muchHigher.mp3" },
  { title: "Hackers - Karl Casey", url: "./hackers.mp3" }
];

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [trackIndex, isPlaying]);  
  

  const goToNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const goToPreviousTrack = () => {
    if (trackIndex > 0) {
      setTrackIndex(trackIndex - 1);
    } else {
      setTrackIndex(tracks.length - 1);
    }
  };

  return (  
    <div className={`music fixed bottom-0 left-0 bg-custom-black text-blue-400 max-w-lg p-4 rounded-full flex items-center justify-center ${className}`}>
      <audio
        src={tracks[trackIndex].url}
        ref={audioRef}
        onEnded={goToNextTrack}
      />
      <div className="w-20 h-30 flex items-center justify-center">
        {isPlaying ? (
          <img src='./equalizer.gif' alt="Equalizer" className="w-full h-full" /> 
        ) : (
          <p className="text-white">...</p>
        )}
      </div>
      {isMinimized ? (
        <button 
          className="text-white p-2 rounded-md m-2" 
          onClick={() => setIsMinimized(false)}
        >
          <FaExpandAlt />
        </button>
      ) : (
        <>
          <h2 className="m-2">{tracks[trackIndex].title}</h2>
          <button 
            className="text-white p-2 rounded-md m-2" 
            onClick={goToPreviousTrack}
          >
            <FaArrowCircleLeft size={30} />
          </button>
          <button 
            className="text-white p-2 rounded-md m-2" 
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <FaPauseCircle size={30} /> : <FaPlayCircle size={30} />}
          </button>
          <button 
            className="text-white p-2 rounded-md m-2" 
            onClick={goToNextTrack}
          >
            <FaArrowCircleRight size={30} />
          </button>
          <button
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-custom-black text-white p-2 rounded-3xl m-2"
            onClick={() => setIsMinimized(true)}
          >
            <FaCompressAlt size={20}/>
          </button>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;