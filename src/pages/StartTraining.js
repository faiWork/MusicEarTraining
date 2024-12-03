import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import Layout from "../components/Layout";
import QATable from '../components/QATable';
import * as noteData from "../utils/noteData";
import * as noteDataUtil from "../utils/noteDataUtil";
import '../styles/MyComponent.css';
import {audioFiles} from '../utils/audioFiles';
import { usePageNavigation } from "../utils/usePageNavigation";
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { generateTrainingQuestions, eraseAnswerFunction, eraseAllAnswerFunction, checkFinalAnswerFunction, handleNextQuestion, handleAnswer } from "../utils/questionAnswerUtils";

const StartTraining = () => {
    const {
        selectedNoteIndex,
        setSelectedNoteIndex,
        selectedAccidentalsType,
        setSelectedAccidentalsType,
        numOfQuestions,
        setNumOfQuestions,
        numOfAnswers,
        setNumOfAnswers,
        keyRootNoteIndex,
        selectedKeys
    } = useContext(AppContext);
    const [selectedButton, setSelectedButton] = useState([]);
    const [trainingQuestions, setTrainingQuestions] = useState([]);
    const [trainingAnswers, seTrainingAnswers] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Initialize volume to 1 (100%)
    const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
    const [finalAnswerResponseMessage, setFinalAnswerResponseMessage] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const { goToPage } = usePageNavigation();

    const [currentAudio, setCurrentAudio] = useState(null);
    const [stateIntervalId, setStateIntervalId] = useState(null);
    const [stateCurrentAudioIndex, setStateCurrentAudioIndex] = useState(null);
    const [stateAudioElements, setStateAudioElements] = useState(null);

    let intervalId;
    let currentAudioIndex = 0;
    let audioElements = [];

    useEffect(() => {
        generateTrainingQuestions(selectedNoteIndex, numOfAnswers, setTrainingQuestions);
    }, [selectedNoteIndex]);

    //Audio functions ================================================
    const pauseNoteFunction = () => {
        // console.log("pauseNoteFunction currentAudio:" + JSON.stringify(currentAudio))
        console.log("pauseNoteFunction stateIntervalId:" + stateIntervalId);
        console.log("pauseNoteFunction stateCurrentAudioIndex:" + stateCurrentAudioIndex)
        if (currentAudio) {
            currentAudio.pause();
        }
        if(stateIntervalId){
            stateAudioElements[stateCurrentAudioIndex-1].pause();
            clearInterval(stateIntervalId);
            setIsPlaying(false);
        }
    }

    const playNoteFunction = (noteIndex) => {
        if (!isPlaying) {
            const audioFileToPlay = audioFiles[keyRootNoteIndex + noteIndex]; // Get the audio file path based on the note index
        
            const audio = new Audio(audioFileToPlay); // Create a new Audio object
            audio.volume = volume; // Set the volume for the audio
            audio.play(); // Play the audio
        
            // Update the currentAudio state with the new audio object
            setCurrentAudio(audio);
        }
    };

    const fadeOut = (audio, duration) => {
        const fadeOutInterval = 50; // Interval in milliseconds
        const fadeOutSteps = duration / fadeOutInterval;
        let currentVolume = audio.volume;
        const volumeDecrease = currentVolume / fadeOutSteps;
    
        const fadeOutIntervalId = setInterval(() => {
            if (currentVolume > 0) {
                currentVolume -= volumeDecrease;
                audio.volume = currentVolume < 0 ? 0 : currentVolume;
            } else {
                clearInterval(fadeOutIntervalId);
                audio.pause();
            }
        }, fadeOutInterval);
    };
    
    const playNextAudio = (audioFilesToPlay) => {
        if (currentAudioIndex < audioFilesToPlay.length) {
            if (audioElements[currentAudioIndex - 1]) {
                fadeOut(audioElements[currentAudioIndex - 1], 500); // 500 ms fade-out
            }
            
            audioElements[currentAudioIndex] = new Audio(audioFilesToPlay[currentAudioIndex]);
            setStateAudioElements(audioElements);
            audioElements[currentAudioIndex].volume = volume;
            audioElements[currentAudioIndex].play();
            currentAudioIndex++;
        } else {
            clearInterval(intervalId);
            setIsPlaying(false);
            currentAudioIndex = 0; // Reset the audio index
        }
        setStateCurrentAudioIndex(currentAudioIndex);
    };

    const playAllQuestionFunction = (playRoot) => {
        let audioFilesToPlay = [...trainingQuestions.map(noteIndex => audioFiles[keyRootNoteIndex + noteIndex])];
        if(playRoot){
            audioFilesToPlay = [audioFiles[keyRootNoteIndex],...audioFilesToPlay];
        }

        if(intervalId){
            clearInterval(intervalId);
        }
        currentAudioIndex = 0;
        audioElements = [];
        
        const playRootAudio = () => {
            if (currentAudioIndex > 0 && audioElements[currentAudioIndex - 1]) {
                audioElements[currentAudioIndex - 1].pause();
            }
            audioElements[currentAudioIndex] = new Audio(audioFilesToPlay[currentAudioIndex]);
            setStateAudioElements(audioElements);
            audioElements[currentAudioIndex].volume = volume;
            audioElements[currentAudioIndex].play();
            currentAudioIndex++;
            setStateCurrentAudioIndex(currentAudioIndex);
        };

        console.log("playAllQuestionFunction isPlaying:" + isPlaying + " intervalId:" + intervalId);
        if (isPlaying) {
            clearInterval(intervalId);
            if (currentAudio) {
                currentAudio.pause();
            }
            // setIsPlaying(false);
        } else {
            setIsPlaying(true);
            if(playRoot) {
                playRootAudio();
                setTimeout(function () {
                    const bpm = 80;
                    const noteDelay = (60 / bpm) * 1000; // Duration of each note in milliseconds
                    intervalId = setInterval(() => playNextAudio(audioFilesToPlay), noteDelay);
                    setStateIntervalId(intervalId);
                }, 1000);
            }else{
                const bpm = 80;
                const noteDelay = (60 / bpm) * 1000; // Duration of each note in milliseconds
                intervalId = setInterval(() => playNextAudio(audioFilesToPlay), noteDelay);
                setStateIntervalId(intervalId);
            }
        }
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const initialQuestions = [
        {
            question: 'Around:',
            answer: currentQuestionIndex + ' of ' + numOfQuestions
        },
        {
            question: 'Key:',
            answer: selectedKeys[0].selectedKey
        },
        {
            question: 'Sound:',
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
            question: 'Answer:',
            answer: trainingAnswers.map((item, index) =>
                noteDataUtil.getNoteName(item, "solfege", selectedAccidentalsType)
            ).join(", ")
        },
        {
            question: '',
            answer: 
                <div>
                    {<h3>{finalAnswerResponseMessage}</h3>}
                </div>
        },
        {
            question: '',
            answer:
                <div>
                    <button id="eraseButton" onClick={() => eraseAnswerFunction(trainingAnswers, seTrainingAnswers)}>Erase</button>
                    <button id="eraseAllButton" onClick={() => eraseAllAnswerFunction(seTrainingAnswers)}>Erase All</button>
                    <button id="finalAnswerButton" disabled={trainingAnswers.length !== trainingQuestions.length} onClick={() => checkFinalAnswerFunction(trainingQuestions, trainingAnswers, setFinalAnswerResponseMessage, setShowNextQuestionButton)}>Final Answer</button>
                    {showNextQuestionButton && (<button onClick={() => handleNextQuestion(selectedNoteIndex, numOfAnswers, setTrainingQuestions, seTrainingAnswers, setShowNextQuestionButton, setFinalAnswerResponseMessage, setCurrentQuestionIndex, currentQuestionIndex)}>Next Question</button>)}
                </div>
        },
        {
            question: '',
            answer: (
                <div>
                    {selectedNoteIndex.map((item, index) => (
                        <button
                            key={item}
                            className={`note-button ${selectedButton === item ? 'selected' : ''}`}
                            onMouseDown={() => setSelectedButton(item)}
                            onMouseUp={() => setSelectedButton(null)}
                            onClick={() => handleAnswer(item , trainingAnswers, trainingQuestions, seTrainingAnswers)}
                        >
                            {noteDataUtil.getNoteName(item, "solfege", selectedAccidentalsType)}
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
            {<h3>{"debug selectedNoteIndex:" + selectedNoteIndex.join(", ")}</h3>}
            {<h3>{"debug selectedAccidentalsType:" + selectedAccidentalsType}</h3>}
            {<h3>{"debug keyRootNoteIndex:" + keyRootNoteIndex}</h3>}
            

            <button onClick={() => goToPage("/settings")}>Back</button>

        </Layout>
    );
};

export default StartTraining;
