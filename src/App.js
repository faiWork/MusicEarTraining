// App.js
import React, { createContext, useState } from 'react';
import SettingsPage from './SettingsPage';
import StartTraining from './StartTraining';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const AppContext = createContext();

const App = () => {
    const [selectedSolfege, setSelectedSolfege] = useState([]);
    const [selectedSolfegeIndex, setSelectedSolfegeIndex] = useState([]);
    const [solfegeType, setSolfegeType] = useState(0);

    return (
        // <AppContext.Provider value={{ selectedSolfege, setSelectedSolfege, selectedSolfegeIndex, setSelectedSolfegeIndex, solfegeType, setSolfegeType }}>
        //     <Router>
        //         <Routes>
        //             <Route path="/settings" element={<SettingsPage />} />
        //             {/*<Route path="/start-training" element={<StartTraining />} />*/}
        //         </Routes>
        //     </Router>
        // </AppContext.Provider>
        <div className="App">
            <header className="App-header">
                <h1>Welcome to my React Demo!</h1>
                <p>This is a simple React application running on a Mac.</p>
                <SettingsPage />
            </header>

        </div>
    );
};

export default App;
