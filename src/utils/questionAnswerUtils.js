export const generateTrainingQuestions = (selectedNoteIndex, numOfAnswers, setTrainingQuestions) => {
    const randomQuestions = [];

    for (let i = 0; i < numOfAnswers; i++) {
        const randomIndex = Math.floor(Math.random() * selectedNoteIndex.length);
        randomQuestions.push(selectedNoteIndex[randomIndex]);
    }

    setTrainingQuestions(randomQuestions);
};

export const eraseAnswerFunction = (trainingAnswers, seTrainingAnswers) => {
    const updatedTrainingAnswers = [...trainingAnswers];
    updatedTrainingAnswers.pop();
    seTrainingAnswers(updatedTrainingAnswers);
};

export const eraseAllAnswerFunction = (seTrainingAnswers) => {
    seTrainingAnswers([]);
};

export const checkFinalAnswerFunction = (trainingQuestions, trainingAnswers, setFinalAnswerResponseMessage, setShowNextQuestionButton) => {
    if (JSON.stringify(trainingQuestions) === JSON.stringify(trainingAnswers)) {
        setFinalAnswerResponseMessage("Correct");
        setShowNextQuestionButton(true);
    } else {
        setFinalAnswerResponseMessage("Incorrect");
    }
};

export const handleNextQuestion = (generateTrainingQuestions, seTrainingAnswers, setShowNextQuestionButton, setFinalAnswerResponseMessage, setCurrentQuestionIndex, currentQuestionIndex) => {
    generateTrainingQuestions();
    seTrainingAnswers([]);
    setShowNextQuestionButton(false);
    setFinalAnswerResponseMessage("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
};

export const handleAnswer = (answer, trainingAnswers, trainingQuestions, seTrainingAnswers) => {
    if (trainingAnswers.length < trainingQuestions.length) {
        seTrainingAnswers([...trainingAnswers, answer]);
    }
};