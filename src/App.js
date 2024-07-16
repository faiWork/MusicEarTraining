// App.js
import React, { createContext, useState } from "react";
import SettingsPage from "./pages/SettingsPage";
import StartTraining from "./pages/StartTraining";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const AppContext = createContext();

const App = () => {
  const [selectedSolfegeIndex, setSelectedSolfegeIndex] = useState([]);
  const [accidentalsType, setAccidentalsType] = useState(0);

  return (
    <AppContext.Provider
      value={{
        selectedSolfegeIndex,
        setSelectedSolfegeIndex,
          accidentalsType,
        setAccidentalsType,
      }}
    >
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/start-training" element={<StartTraining />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
