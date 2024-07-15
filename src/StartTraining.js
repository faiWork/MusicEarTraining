import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './App';

const StartTraining = () => {
    const { selectedSolfege, solfegeType } = useContext(AppContext);

    const { state } = useLocation();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/settings');
    };

    return (
        <div>
            <h2>Start Training</h2>
            {/* Add your training logic here */}
            <p>Selected solfege: {state.selectedSolfege.join(', ')}</p>
            <p>Solfege type: {state.solfegeType === 0 ? 'Do-Di-Re-Ri' : 'Do-Ra-Re-Me'}</p>
            <button onClick={handleBack}>Back</button>
        </div>
    );
};

export default StartTraining;