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
    selectedSolfegeIndex,
    setSelectedSolfegeIndex,
      accidentalsType,
    setAccidentalsType,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const solfege =
      accidentalsType === "sharp"
      ? noteData.solfegeSharpName
      : noteData.solfegeFlatName;

  const handleSolfegeChange = (solfege, index) => {
    if (selectedSolfegeIndex.includes(index)) {
      setSelectedSolfegeIndex(
        selectedSolfegeIndex.filter((item) => item !== index),
      );
    } else {
      setSelectedSolfegeIndex([...selectedSolfegeIndex, index]);
    }
  };

  const toggleAccidentalsType = () => {
    setAccidentalsType((prevType) => (prevType === "sharp" ? "flat" : "sharp"));
  };

  const handleStartTraining = () => {
    navigate("/start-training", { state: { selectedSolfegeIndex, accidentalsType } });
  };

  return (
      <Layout>
          <h2>Settings</h2>
          <div
              style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  marginBottom: "16px",
              }}
          >
              <h3>Solfège: </h3>
              <div style={{padding: "8px"}}/>
              <div
                  style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                  }}
              >
                  {solfege.map((item, index) => (
                      <button
                          key={item}
                          onClick={() => handleSolfegeChange(item, index)}
                          style={{
                              backgroundColor: selectedSolfegeIndex.includes(index)
                                  ? "blue"
                                  : "white",
                              color: selectedSolfegeIndex.includes(index) ? "white" : "black",
                              width: "70px",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                          }}
                      >
                          {item}
                      </button>
                  ))}
              </div>
          </div>

          <div
              style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  marginBottom: "16px",
              }}
          >
              <h3>Accidentals Type: </h3>
              <div style={{padding: "8px"}}/>
              <div
                  style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                  }}
              >
                  <button onClick={toggleAccidentalsType} style={{marginTop: "16px"}}>
                      {noteDataUtil.getAccidentalsType(accidentalsType)}
                  </button>
              </div>
          </div>

          <h3>{"debug selectedSolfegeIndex:" + selectedSolfegeIndex}</h3>
          <h3>{"debug accidentalsType:" + accidentalsType}</h3>
          <button onClick={handleStartTraining} style={{marginTop: "16px"}}>
              Start Training
          </button>

          <QATable />
      </Layout>

  );
};

export default SettingsPage;
