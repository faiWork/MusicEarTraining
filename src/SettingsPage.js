// import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from './App';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const { selectedSolfege, setSelectedSolfege, selectedSolfegeIndex, setSelectedSolfegeIndex, solfegeType, setSolfegeType } = useContext(AppContext);

    // const [selectedSolfege, setSelectedSolfege] = useState([]);
    // const [selectedSolfegeIndex, setSelectedSolfegeIndex] = useState([]);
    // const [solfegeType, setSolfegeType] = useState(0); // 0 for Do-Di-Re-Ri, 1 for Do-Ra-Re-Me

    const navigate = useNavigate();

    const solfege = solfegeType === 0
        ? ['Do', 'Di', 'Re', 'Ri', 'Mi', 'Fa', 'Fi', 'So', 'Si', 'La', 'Li', 'Ti']
        : ['Do', 'Ra', 'Re', 'Me', 'Mi', 'Fa', 'Se', 'So', 'Le', 'La', 'Te', 'Ti'];

    const handleSolfegeChange = (solfege,index) => {
        if (selectedSolfege.includes(solfege)) {
            setSelectedSolfege(selectedSolfege.filter((item) => item !== solfege));
        } else {
            setSelectedSolfege([...selectedSolfege, solfege]);
        }

        if (selectedSolfegeIndex.includes(index)) {
            setSelectedSolfegeIndex(selectedSolfegeIndex.filter((item) => item !== index));
        } else {
            setSelectedSolfegeIndex([...selectedSolfegeIndex, index]);
        }
    };

    const toggleSolfegeType = () => {
        setSolfegeType((prevType) => (prevType === 0 ? 1 : 0));
    };

    const handleStartTraining = () => {
        navigate('/start-training', { state: { selectedSolfege, solfegeType } });
    };

    return (
        <div>
            <h2>Settings</h2>
            <h3>Solfège</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px'}}>
                {solfege.map((item, index) => (
                    <button
                        key={item}
                        onClick={() => handleSolfegeChange(item, index)}
                        style={{
                            backgroundColor: selectedSolfegeIndex.includes(index) ? 'blue' : 'white',
                            color: selectedSolfegeIndex.includes(index) ? 'white' : 'black',
                            width: '70px',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <button onClick={toggleSolfegeType} style={{marginTop: '16px'}}>
                {solfegeType === 0 ? 'Use Do-Ra-Re-Me' : 'Use Do-Di-Re-Ri'}
            </button>
            <h3>{"debug selectedSolfege:" + selectedSolfege}</h3>
            <h3>{"debug selectedSolfegeIndex:" + selectedSolfegeIndex}</h3>
            <button onClick={handleStartTraining} style={{marginTop: '16px'}}>
                Start Training
            </button>
        </div>
    );
};

export default SettingsPage;