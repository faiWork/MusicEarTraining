import { useContext } from "react";
import { AppContext } from "../App";
import React, { useEffect } from "react";
import { usePageNavigation } from "../utils/usePageNavigation";
import Layout from "../components/Layout";
import * as noteData from "../utils/noteData";
import * as noteDataUtil from "../utils/noteDataUtil";
import QATable from '../components/QATable';
import {middleC_Index} from '../utils/audioFiles';

const SettingsPage = () => {
    const {
        selectedNoteIndex,
        setSelectedNoteIndex,
        selectedAccidentalsType,
        setSelectedAccidentalsType,
        numOfQuestions,
        setNumOfQuestions,
        numOfAnswers,
        setNumOfAnswers,
        selectedKeys,
        setSelectedKeys,
        keyRootNoteIndex,
        setKeyRootNoteIndex
    } = useContext(AppContext);

    const { goToPageWithOptions } = usePageNavigation();

    useEffect(() => {
        if(!!!keyRootNoteIndex){
            setKeyRootNoteIndex(middleC_Index);
        }
    }, []);

    const noteChoiceIndex = [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const handleSelectNote = (index) => {
        if (selectedNoteIndex.includes(index)) {
            setSelectedNoteIndex(
                selectedNoteIndex.filter((item) => item !== index),
            );
        } else {
            setSelectedNoteIndex([...selectedNoteIndex, index].sort((a, b) => a - b));
        }
    };

    const toggleSelectedAccidentalsType = () => {
        setSelectedAccidentalsType((prevType) => (prevType === noteData.accidentalsType.sharp ? noteData.accidentalsType.flat : noteData.accidentalsType.sharp));
    };

    const headers = ["Setting", "Choice"];

    const MIN_QUESTIONS = 1;
    const MAX_QUESTIONS = 20;

    const MIN_ANSWERS = 1;
    const MAX_ANSWERS = 20;

    const initialQuestions = [
        {
            question: 'Note Choice:'
            , answer:
                <div>
                    {noteChoiceIndex.map((item, index) => (
                        <React.Fragment key={item}>
                            <button
                                id={`noteChoiceButton${item}`}
                                onClick={() => handleSelectNote(item)}
                                style={{
                                    backgroundColor: selectedNoteIndex.includes(item) ? 'blue' : 'white',
                                    color: selectedNoteIndex.includes(item) ? 'white' : 'black',
                                    width: '70px',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    marginRight: index % 12 !== 11 ? '8px' : '0',
                                    marginBottom: index % 12 === 11 ? '8px' : '0',
                                }}
                            >
                                {noteDataUtil.getNoteName(item, 'solfege', selectedAccidentalsType)}
                            </button>
                            {index % 12 === 11 && <br/>}
                        </React.Fragment>
                    ))}
                </div>
        },
        {
          question: 'Select notes by scale/mode'
          , answer: 'Buttons/OptionList'
        },
        // {
        //   question: 'Play the note when answering the note'
        //   , answer: 'Yes/No'
        // }, // move this to the StartTraining Page
        {
            question: 'Key Selection (up to 5 keys)',
            answer: (
              <select
                value={selectedKeys[0].selectedKey + ""} // Ensure numOfQuestions is a single scalar value
                onChange={(e) => {
                  const updatedKeys = [...selectedKeys]; // Create a copy of the selectedKeys array
                  updatedKeys[0].selectedKey = e.target.value; // Update the updatedKeys[].selectedKey with the new value
                  updatedKeys[0].index = noteData.keyName.indexOf(updatedKeys[0].selectedKey); // Update the updatedKeys.index with the new value
                  setSelectedKeys(updatedKeys); // Update the state with the new array
                  
                  setKeyRootNoteIndex(middleC_Index + updatedKeys[0].index);
                //   console.log("selectedKeys:" + JSON.stringify(updatedKeys));
                //   console.log("middleC_Index + updatedKeys:" + JSON.stringify(middleC_Index + updatedKeys[0].index));
                  
                }}
              >
                {noteData.keyName.map((key, index) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            )
        },
        {
          question: 'Single Note Mode/Chord Note Mode'
          , answer: 'Single/Chord'
        },
        {
            question: 'Accidentals Type'
            , answer:
                <button onClick={toggleSelectedAccidentalsType} style={{marginTop: "16px"}}>
                    {noteDataUtil.getAccidentalsType(selectedAccidentalsType)}
                </button>
        },
        {
            question: 'How many arounds of question?'
            , answer: (
                <select
                    value={numOfQuestions.toString()} // Ensure numOfQuestions is a single scalar value
                    onChange={(e) => setNumOfQuestions(parseInt(e.target.value))}
                >
                    {Array.from({ length: MAX_QUESTIONS - MIN_QUESTIONS + 1 }, (_, i) => i + MIN_QUESTIONS).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            )
        },
        {
            question: 'How many notes for each questions'
            , answer: (
                <select
                    value={numOfAnswers.toString()} // Ensure numOfAnswers is a single scalar value
                    onChange={(e) => setNumOfAnswers(parseInt(e.target.value))}
                >
                    {Array.from({ length: MAX_ANSWERS - MIN_ANSWERS + 1 }, (_, i) => i + MIN_ANSWERS).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            )
        },
        {
          question: 'Largest Interval'
          , answer: ''
        },
        {
          question: 'Start with Root Note'
          , answer: ''
        },
        {
          question: 'Tempo'
          , answer: '80bpm'
        },
    ];

    return (
        <Layout>

            <QATable title="Melody Dictation Setting" initialQuestions={initialQuestions} headers={headers}/>

            <h3>{"debug selectedKeys:" + JSON.stringify(selectedKeys)}</h3>
            {<h3>{"debug keyRootNoteIndex:" + keyRootNoteIndex}</h3>}
            {/*<h3>{"debug selectedNoteIndex:" + selectedNoteIndex}</h3>*/}
            {/*<h3>{"debug selectedAccidentalsType:" + selectedAccidentalsType}</h3>*/}
            {/*<h3>{"debug noteChoiceIndex to name:" +*/}
            {/*    noteChoiceIndex.map((item, index) => {*/}
            {/*        return noteDataUtil.getFlatSolfegeName(item);*/}
            {/*    })*/}
            {/*}</h3>*/}

          <button onClick={() => goToPageWithOptions("/start-training", { state: { selectedNoteIndex, selectedAccidentalsType, numOfQuestions, numOfAnswers, selectedKeys, keyRootNoteIndex} })} style={{marginTop: "16px"}}>
              Start Training
          </button>
      </Layout>

  );
};

export default SettingsPage;
