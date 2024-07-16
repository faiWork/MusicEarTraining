// App.js
import React, { createContext, useState } from "react";
import SettingsPage from "./pages/SettingsPage";
import StartTraining from "./pages/StartTraining";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as noteData from "./utils/noteData";

export const AppContext = createContext();

const App = () => {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState([]);
  const [selectedAccidentalsType, setSelectedAccidentalsType] = useState(noteData.accidentalsType.sharp);

  return (
    <AppContext.Provider
      value={{
        selectedNoteIndex,
        setSelectedNoteIndex,
        selectedAccidentalsType: selectedAccidentalsType,
        setSelectedAccidentalsType: setSelectedAccidentalsType,
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
