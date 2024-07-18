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
// import piano_4_c from "../sound/piano-88-notes/4-c.wav";

const StartTraining = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState([]);
    const [trainingQuestions, setTrainingQuestions] = useState([]);
    const [trainingAnswers, seTrainingAnswers] = useState([]);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        generateTrainingQuestions();
    }, [state.selectedNoteIndex]);

    // const questions
    let currentQuestionIndex = 1;

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

    const playRootNoteFunction = () => {
        let audioFilesToPlay = [audioFiles[middleC_Index]];

        let currentIndex = 0;
        let currentAudio = null;
        let intervalId;

        const playNextAudio = () => {
            if (currentIndex < audioFilesToPlay.length) {
                if (currentAudio) {
                    currentAudio.pause();
                }
                currentAudio = new Audio(audioFilesToPlay[currentIndex]);
                currentAudio.play();
                currentIndex++;
            } else {
                clearInterval(intervalId);
                setIsPlaying(false);
            }
        };

        if (isPlaying) {
            clearInterval(intervalId);
            if (currentAudio) {
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
        let currentAudio = null;
        let intervalId;

        const playNextAudio = () => {
            if (currentIndex < audioFilesToPlay.length) {
                if (currentAudio) {
                    currentAudio.pause();
                }
                currentAudio = new Audio(audioFilesToPlay[currentIndex]);
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
        seTrainingAnswers([...trainingAnswers, answer]);
    };

    const initialQuestions = [
        {
            question: 'Question:',
            answer: trainingQuestions.map((item, index) =>
                noteDataUtil.getNoteName(item, "solfege", state.selectedAccidentalsType)
            ).join(", ")
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

                    <button id="playRootNoteButton" onClick={playRootNoteFunction}>
                        {isPlaying ? 'Pause' : 'Play Root'}
                    </button>
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
                    <button id="finalAnswerButton" onClick={finalAnswerFunction}>Final Answer</button>
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
