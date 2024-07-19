import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

const WebAudioAPITest = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

    const notes = [
        { note: 'C4', bpm: 20 },
        { note: 'E4', bpm: 80 },
        { note: 'D4', bpm: 80 },
        { note: 'G5', bpm: 80 },
    ];

    let intervalId;

    useEffect(() => {
        // Load the piano sample
        Tone.loaded().then(() => {
            Tone.context.resume();
        });
    }, []);

    const playNextNote = () => {
        if (currentNoteIndex < notes.length) {
            const currentNote = notes[currentNoteIndex];
            playNote(currentNote.note, currentNote.bpm);
            setCurrentNoteIndex(currentNoteIndex + 1);
        } else {
            clearInterval(intervalId);
            setIsPlaying(false);
        }
    };

    const playNote = (note, bpm) => {
        const piano = new Tone.Sampler({
            urls: {
                C4: 'C4.mp3',
                D4: 'D4.mp3',
                E4: 'E4.mp3',
                'G5': 'G5.mp3',
            },
            release: 1,
            baseUrl: 'https://example.com/samples/',
        }).toDestination();

        piano.triggerAttackRelease(note, (60 / bpm) * 0.9);
    };

    const handlePlayClick = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            setCurrentNoteIndex(0);
            intervalId = setInterval(playNextNote, 1000);
        } else {
            clearInterval(intervalId);
            setIsPlaying(false);
        }
    };

    return (
        <div>
            <button onClick={handlePlayClick}>
                {isPlaying ? 'Stop' : 'Play'}
            </button>
        </div>
    );
};

export default WebAudioAPITest;