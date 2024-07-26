import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

const VirtualPiano = () => {
  const cNoteSampleRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("debug 1");
    // Load your pre-recorded C note audio sample
    cNoteSampleRef.current = new Tone.Player('5-c.wav');
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

  return (
    <div>
      <button onClick={playC}>Play Standard C Note</button>
    </div>
  );
};

export default VirtualPiano;