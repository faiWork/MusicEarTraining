import React, { useState } from 'react';

const QATable = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

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
            <h2>Question and Answer Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Setting</th>
                    <th>Choice</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {questions.map((qa, index) => (
                    <tr key={index}>
                        <td>{qa.question}</td>
                        <td>{qa.answer}</td>
                        <td>
                            <button onClick={() => removeQA(index)}>Remove</button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <input
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Enter a new question"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            placeholder="Enter a new answer"
                        />
                    </td>
                    <td>
                        <button onClick={addQA}>Add</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default QATable;