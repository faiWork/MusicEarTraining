import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import Layout from "../components/Layout";

const StartTraining = () => {

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
        <p>Selected note Index: {state.selectedNoteIndex.join(", ")}</p>
        <p>
          Solfege type:{" "}
          {state.selectedAccidentalsType}
        </p>
        <button onClick={handleBack}>Back</button>
      </div>
    </Layout>
  );
};

export default StartTraining;
