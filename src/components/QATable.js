import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from "../App";

const QATable = ({ title, initialQuestions = [], headers = [] }) => {

    const [questions, setQuestions] = useState(initialQuestions);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    useEffect(() => {
        setQuestions(initialQuestions);
    }, [initialQuestions]);

    const addQA = () => {
        if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {
            setQuestions([...questions, { question: newQuestion, answer: newAnswer }]);
            setNewQuestion('');
            setNewAnswer('');
        }
    };

    const removeQA = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    return (
        <div>
            <h2>{title}</h2>
            <table>
                <thead>
                <tr>
                    {headers.map((item, index) => (
                        <th>{item}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {questions.map((qa, index) => (
                        <tr key={index}>
                            <td style={{ verticalAlign: 'top' }}>{qa.question}</td>
                            <td style={{ verticalAlign: 'top' }}>{qa.answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QATable;