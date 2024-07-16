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
  } = useContext(AppContext);

  const navigate = useNavigate();

  const noteChoiceIndex = [-12, -11, -10, -9 -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const handleNoteChange = (index) => {
    if (selectedNoteIndex.includes(index)) {
      setSelectedNoteIndex(
        selectedNoteIndex.filter((item) => item !== index),
      );
    } else {
      setSelectedNoteIndex([...selectedNoteIndex, index]);
    }
  };

  const toggleSelectedAccidentalsType = () => {
    setSelectedAccidentalsType((prevType) => (prevType === noteData.accidentalsType.sharp ? noteData.accidentalsType.flat : noteData.accidentalsType.sharp));
  };

  const handleStartTraining = () => {
    navigate("/start-training", { state: { selectedNoteIndex, selectedAccidentalsType } });
  };

  const initialQuestions = [
      {
          question: 'Solfège Name:'
          , answer:
              <div>
                  {noteChoiceIndex.map((item, index) => (
                      <button
                          key={item}
                          onClick={() => handleNoteChange(item)}
                          style={{
                              backgroundColor: selectedNoteIndex.includes(item)
                                  ? "blue"
                                  : "white",
                              color: selectedNoteIndex.includes(item) ? "white" : "black",
                              width: "70px",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                          }}
                      >
                          {/*{noteDataUtil.getSharpSolfegeName(item)}*/}
                          {noteDataUtil.getNoteName(item, "solfege", selectedAccidentalsType)}
                      </button>
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
          , answer: '10'
      },
      {
          question: 'How many notes for each questions'
          , answer: '5'
      },
  ];

    return (
        <Layout>

            <QATable title="Melody Dictation" initialQuestions={initialQuestions}/>

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
