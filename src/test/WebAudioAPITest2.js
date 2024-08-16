import React, { useEffect, useRef, useState } from 'react';
import {audioFiles, middleC_Index} from '../utils/audioFiles';
import * as Tone from 'tone';

const VirtualPiano = () => {
  const cNoteSampleRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  

  useEffect(() => {
    console.log("debug 1");
    cNoteSampleRef.current = new Tone.Player(`${process.env.PUBLIC_URL}/sound/piano-88-notes/4-c.wav`);

    cNoteSampleRef.current.toDestination();
    console.log("debug 2 cNoteSampleRef:" + cNoteSampleRef);

    const player = cNoteSampleRef.current;

    // console.log('cNoteSampleRef:', '%o', player);
    
    const checkLoaded = () => {
      console.log("debug 3");
      if (!!player.loaded) {
        console.log("debug 4");
        setIsLoaded(true);
      } else {
        console.log("debug 5");
        setTimeout(checkLoaded, 10000);
      }
    };
    checkLoaded();

    
  }, []);

  const playC = () => {
    // Play the C note
    if (true) {
      console.log("debug 6");
      cNoteSampleRef.current.start();
    } else {
      console.log("debug 7");
      console.error('Audio sample not loaded yet');
    }
  };

  const playCIn80bpm = () => {
    // Play the C note
    Tone.getTransport().stop()
    console.log("debug 8");
    Tone.getTransport().bpm.value = 80;
    cNoteSampleRef.current.start();

  };

  const playCFour80bpm = () => {
    // Play the C note 4 times in 80 BPM
    console.log("debug 10");
    Tone.getTransport().bpm.value = 80;
    console.log("debug 11");
    const loop = new Tone.Loop((time) => {
      console.log("debug 12");
      cNoteSampleRef.current.start(time);
    }, "4n").start(0);

    console.log("debug 13");
    // Stop the loop after 4 iterations
    loop.iterations = 4;
    loop.start();
    console.log("debug 14");
  };

  const stopPlaying = () => {
    console.log("stopPlaying start");
    Tone.getTransport().stop()
  };

  const test = () => {
    Tone.getTransport().bpm.value = 40;
    var loop = new Tone.Loop(function(time){
      //triggered every eighth note. 
      console.log(time);
      cNoteSampleRef.current.start();
    }, "4n").start(0);
    loop.iterations = 4;
    // loop.start();
    
    Tone.getTransport().start();
  }
  
  
  return (
    <div>
      <div>
        <button onClick={playC}>Play Standard C Note</button>
      </div>
      <div>
        <button onClick={playCIn80bpm}>Play Standard C Note in 80bpm</button>
      </div>
      <div>
        <button onClick={playCFour80bpm}>Play C Note 4 Times in 80bpm</button>
      </div>
      <div>
        <button onClick={stopPlaying}>Stop Playing</button>
      </div>
      <div>
        <button onClick={test}>Test</button>
      </div>
    </div>
  );
};

export default VirtualPiano;
