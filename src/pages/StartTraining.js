import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import Layout from "../components/Layout";

const StartTraining = () => {
  const { selectedSolfegeIndex, accidentalsType } = useContext(AppContext);

  const { state } = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/settings");
  };

  return (
    <Layout>
      <div>
        <h2>Start Training</h2>
        {/* Add your training logic here */}
        <p>Selected solfege Index: {state.selectedSolfegeIndex.join(", ")}</p>
        <p>
          Solfege type:{" "}
          {state.accidentalsType}
        </p>
        <button onClick={handleBack}>Back</button>
      </div>
    </Layout>
  );
};

export default StartTraining;
