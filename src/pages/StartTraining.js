import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import Layout from "../components/Layout";
import QATable from '../components/QATable';
import * as noteData from "../utils/noteData";
import * as noteDataUtil from "../utils/noteDataUtil";
import '../styles/MyComponent.css';
import {audioFiles, middleC_Index} from '../utils/audioFiles';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

const StartTraining = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState([]);
    const [trainingQuestions, setTrainingQuestions] = useState([]);
    const [trainingAnswers, seTrainingAnswers] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Initialize volume to 1 (100%)

    let currentAudio = null;

    useEffect(() => {
        generateTrainingQuestions();
    }, [state.selectedNoteIndex]);

    const generateTrainingQuestions = () => {
        const selectedNoteIndex = state.selectedNoteIndex;
        const randomQuestions = [];

        for (let i = 0; i < state.numOfAnswers; i++) {
            const randomIndex = Math.floor(Math.random() * selectedNoteIndex.length);
            randomQuestions.push(selectedNoteIndex[randomIndex]);
        }
        console.log("generateTrainingQuestions state.numOfAnswers:" + state.numOfAnswers);
        console.log("generateTrainingQuestions randomQuestions:" + randomQuestions);
        setTrainingQuestions(randomQuestions);
    };

    const handleBack = () => {
        navigate("/settings");
    };

    const eraseAnswerFunction = () => {
        // Make a copy of the trainingAnswers array
        const updatedTrainingAnswers = [...trainingAnswers];

        // Remove the last element from the copy
        updatedTrainingAnswers.pop();

        // Update the trainingAnswers state with the modified array
        seTrainingAnswers(updatedTrainingAnswers);
    };

    const finalAnswerFunction = () => {
    };

    const pauseNoteFunction = () => {
        console.log("pauseNoteFunction currentAudio:" + currentAudio)
        currentAudio.pause();
    }

    const playNoteFunction = (noteIndex) => {
        console.log("playNoteFunction start");
        let audioFilesToPlay = [audioFiles[middleC_Index + noteIndex]];

        let currentIndex = 0;
        // let currentAudio = null;
        let intervalId;

        const playNextAudio = () => {
            if (currentIndex < audioFilesToPlay.length) {
                if (currentAudio) {
                    currentAudio.pause();
                }
                currentAudio = new Audio(audioFilesToPlay[currentIndex]);
                currentAudio.volume = volume; // Set the volume for the current audio
                console.log("currentAudio before play:" + currentAudio);
                currentAudio.play();
                console.log("currentAudio after play:" + currentAudio);
                currentIndex++;
            } else {
                clearInterval(intervalId);
                setIsPlaying(false);
            }
        };

        console.log("isPlaying:" + isPlaying);
        console.log("currentAudio:" + currentAudio);
        if (isPlaying) {
            clearInterval(intervalId);
            if (currentAudio) {
                console.log("pause");
                currentAudio.pause();
            }
            setIsPlaying(false);
        } else {
            setIsPlaying(true);

            const bpm = 80;
            const noteDelay = (60 / bpm) * 1000; // Duration of each note in milliseconds
            intervalId = setInterval(playNextAudio, noteDelay);

        }
    }

    const playAllQuestionFunction = (playRoot) => {
        let audioFilesToPlay = [...trainingQuestions.map(noteIndex => audioFiles[middleC_Index + noteIndex])];
        if(playRoot){
            audioFilesToPlay = [audioFiles[middleC_Index],...audioFilesToPlay]
        }

        let currentIndex = 0;
        // let currentAudio = null;
        let intervalId;

        const playNextAudio = () => {
            if (currentIndex < audioFilesToPlay.length) {
                if (currentAudio) {
                    currentAudio.pause();
                }
                currentAudio = new Audio(audioFilesToPlay[currentIndex]);
                currentAudio.volume = volume; // Set the volume for the current audio
                currentAudio.play();
                currentIndex++;
            } else {
                clearInterval(intervalId);
                setIsPlaying(false);
            }
        };

        const playRootAudio = () => {
            if (currentAudio) {
                currentAudio.pause();
            }
            currentAudio = new Audio(audioFilesToPlay[currentIndex]);
            currentAudio.volume = volume; // Set the volume for the current audio
            currentAudio.play();
            currentIndex++;
        };

        if (isPlaying) {
            clearInterval(intervalId);
            if (currentAudio) {
                currentAudio.pause();
            }
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            if(playRoot) {
                playRootAudio();
                setTimeout(function () {
                    const bpm = 80;
                    const noteDelay = (60 / bpm) * 1000; // Duration of each note in milliseconds
                    intervalId = setInterval(playNextAudio, noteDelay);
                }, 1000);
            }else{
                const bpm = 80;
                const noteDelay = (60 / bpm) * 1000; // Duration of each note in milliseconds
                intervalId = setInterval(playNextAudio, noteDelay);
            }
        }
    };

    const handleAnswer = (answer) => {
        if (trainingAnswers.length < trainingQuestions.length) {
            seTrainingAnswers([...trainingAnswers, answer]);
        }
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const initialQuestions = [
        {
            question: 'Question:',
            answer: (
                <div>
                    {trainingQuestions.map((item, index) => (
                        <button
                            key={"A" + index}
                            className={`note-button ${selectedButton === ("A" + index) ? 'selected' : ''}`}
                            onClick={() => playNoteFunction(item)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            ),
        },
        {
            question: 'Action:',
            answer:
                <div>
                    <button id="playAllQuestionButton" onClick={() => playAllQuestionFunction(false)}>
                        {isPlaying ? 'Pause' : 'Play Question'}
                    </button>

                    <button id="playRootAndAllQuestionButton" onClick={() => playAllQuestionFunction(true)}>
                        {isPlaying ? 'Pause' : 'Play Root and Question'}
                    </button>

                    <button id="playNoteButton" onClick={() => playNoteFunction(0)}>
                        {isPlaying ? 'Pause' : 'Play Root'}
                    </button>

                    <button id="pauseNoteButton" onClick={pauseNoteFunction}>
                        {'Pause'}
                    </button>


                    <VolumeDown/>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <VolumeUp/>
                </div>
        },
        {
            question: 'Answer:',
            answer: trainingAnswers.map((item, index) =>
                noteDataUtil.getNoteName(item, "solfege", state.selectedAccidentalsType)
            ).join(", ")
        },
        {
            question: '',
            answer:
                <div>
                    <button id="eraseButton" onClick={eraseAnswerFunction}>Erase</button>
                    <button id="finalAnswerButton" disabled={trainingAnswers.length !== trainingQuestions.length} onClick={finalAnswerFunction}>Final Answer</button>
                </div>
        },
        {
            question: '',
            answer: (
                <div>
                    {state.selectedNoteIndex.map((item, index) => (
                        <button
                            key={item}
                            className={`note-button ${selectedButton === item ? 'selected' : ''}`}
                            onMouseDown={() => setSelectedButton(item)}
                            onMouseUp={() => setSelectedButton(null)}
                            onClick={() => handleAnswer(item)}
                        >
                            {noteDataUtil.getNoteName(item, "solfege", state.selectedAccidentalsType)}
                        </button>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <QATable title="Melody Dictation Training" initialQuestions={initialQuestions}/>

            {<h3>{"debug trainingQuestions:" + trainingQuestions.join(", ")}</h3>}
            {<h3>{"debug selectedNoteIndex:" + state.selectedNoteIndex.join(", ")}</h3>}
            {<h3>{"debug selectedAccidentalsType:" + state.selectedAccidentalsType}</h3>}

            <button onClick={handleBack}>Back</button>

        </Layout>
    );
};

export default StartTraining;
