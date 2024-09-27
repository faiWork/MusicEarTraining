// App.js
import React, { createContext, useState } from "react";
import SettingsPage from "./pages/SettingsPage";
import StartTraining from "./pages/StartTraining";
import Home from "./pages/Home";
import WebAudioAPITest from "./test/WebAudioAPITest";
import WebAudioAPITest2 from "./test/WebAudioAPITest2";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import * as noteData from "./utils/noteData";

export const AppContext = createContext();

const App = () => {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState([]);
  const [selectedAccidentalsType, setSelectedAccidentalsType] = useState(noteData.accidentalsType.sharp);
  const [numOfQuestions, setNumOfQuestions] = useState([10]);
  const [numOfAnswers, setNumOfAnswers] = useState([5]);
  const [selectedKeys, setSelectedKeys] = useState([{"index": 0, "selectedKey": 0}]);
  const [keyRootNoteIndex, setKeyRootNoteIndex] = useState();

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/start-training" element={<StartTraining />} />
          <Route path="/web-audio-api-test" element={<WebAudioAPITest />} />
          <Route path="/web-audio-api-test2" element={<WebAudioAPITest2 />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
