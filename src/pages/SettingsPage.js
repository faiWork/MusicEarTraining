// import React, { useState } from 'react';
import { useContext } from "react";
import { AppContext } from "../App";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import * as noteData from "../utils/noteData";
import * as noteDataUtil from "../utils/noteDataUtil";
import QATable from '../components/QATable';

const SettingsPage = () => {
  const {
    selectedNoteIndex,
    setSelectedNoteIndex,
    selectedAccidentalsType,
    setSelectedAccidentalsType,
    numOfQuestions,
    setNumOfQuestions,
    numOfAnswers,
    setNumOfAnswers
  } = useContext(AppContext);

  const navigate = useNavigate();

  const noteChoiceIndex = [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

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

  const handleStartTraining = () => {
    navigate("/start-training", { state: { selectedNoteIndex, selectedAccidentalsType, numOfQuestions, numOfAnswers} });
  };

  const headers = ["Setting", "Choice"];

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
          question: 'Accidentals Type'
          , answer:
              <button onClick={toggleSelectedAccidentalsType} style={{marginTop: "16px"}}>
                  {noteDataUtil.getAccidentalsType(selectedAccidentalsType)}
              </button>
      },
      {
          question: 'How many questions'
          , answer: numOfQuestions
      },
      {
          question: 'How many notes for each questions'
          , answer: numOfAnswers
      },
  ];


    return (
        <Layout>

            <QATable title="Melody Dictation Setting" initialQuestions={initialQuestions} headers={headers}/>

            {/*<h3>{"debug selectedNoteIndex:" + selectedNoteIndex}</h3>*/}
            {/*<h3>{"debug selectedAccidentalsType:" + selectedAccidentalsType}</h3>*/}
            {/*<h3>{"debug noteChoiceIndex to name:" +*/}
            {/*    noteChoiceIndex.map((item, index) => {*/}
          {/*        return noteDataUtil.getFlatSolfegeName(item);*/}
          {/*    })*/}
          {/*}</h3>*/}

          <button onClick={handleStartTraining} style={{marginTop: "16px"}}>
              Start Training
          </button>
      </Layout>

  );
};

export default SettingsPage;
