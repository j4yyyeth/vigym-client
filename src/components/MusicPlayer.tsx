import { useState, useEffect } from 'react';
import useSound from 'use-sound';

const MusicPlayer = () => {
    const song = '../music.mp3';
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound }] = useSound(song);

    const playingButton = () => {
        if (isPlaying) {
          pause(); // this will pause the audio
          setIsPlaying(false);
        } else {
          play(); // this will play the audio
          setIsPlaying(true);
        }
      };

      return (
        <div className="component">
          <h2>Playing Now</h2>
          <img className="musicCover" src="" alt='cover'/>
          <div>
            <h3 className="title">Rubaiyyan</h3>
            <p className="subTitle">Qala</p>
          </div>
          <div>
            <button className="playButton">
              Play
            </button>
            {!isPlaying ? (
              <button className="playButton" onClick={playingButton}>
                PAUSE
              </button>
            ) : (
              <button className="playButton" onClick={playingButton}>
                Play
              </button>
            )}
            <button className="playButton">
                Play
            </button>
          </div>
        </div>
      );
};

export default MusicPlayer;