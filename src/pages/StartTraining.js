import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import Layout from "../components/Layout";
import QATable from '../components/QATable';
import * as noteData from "../utils/noteData";
import * as noteDataUtil from "../utils/noteDataUtil";
import '../styles/MyComponent.css';
import { MidiPlayer } from "react-midi-player";
import audioFile from '../sound/GrandPiano/piano-f-c4.wav'

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

    const playAllQuestionFunction = () => {
        // const audioFile = "../sound/GrandPiano/piano-f-c4.wav";
        const audio = new Audio(audioFile);

        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }

        // audio.play()
        //     .then(() => {
        //         console.log("Audio playback started successfully");
        //     })
        //     .catch((error) => {
        //         console.error("Error playing audio:", error);
        //     });
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
            // <button id="playAllQuestionButton" onClick={playAllQuestionFunction(trainingQuestions)}>Play Again</button>

                <button onClick={playAllQuestionFunction}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
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
            // , answer:
            //   <div>
            //     {state.selectedNoteIndex.map((item, index) => (
            //         <button
            //             key={item}
            //             onClick={() => handleAnswer(item)}
            //             style={{
            //                 backgroundColor: "white",
            //                 color: "black",
            //                 width: "70px",
            //                 padding: "8px",
            //                 border: "1px solid #ccc",
            //                 borderRadius: "4px",
            //             }}
            //         >
            //             {noteDataUtil.getNoteName(item, "solfege", state.selectedAccidentalsType)}
            //         </button>
            //     ))}
            //   </div>
        },
    ];

    return (
        <Layout>
            <QATable title="Melody Dictation Training" initialQuestions={initialQuestions}/>


            {<h3>{"debug selectedNoteIndex:" + state.selectedNoteIndex.join(", ")}</h3>}
            {<h3>{"debug selectedAccidentalsType:" + state.selectedAccidentalsType}</h3>}

            <button onClick={handleBack}>Back</button>

        </Layout>
    );
};

export default StartTraining;
