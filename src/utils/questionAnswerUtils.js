export const generateTrainingQuestions = (selectedNoteIndex, numOfAnswers, setTrainingQuestions) => {
    const randomQuestions = [];

    for (let i = 0; i < numOfAnswers; i++) {
        const randomIndex = Math.floor(Math.random() * selectedNoteIndex.length);
        randomQuestions.push(selectedNoteIndex[randomIndex]);
    }

    setTrainingQuestions(randomQuestions);
};

// export const generateTrainingQuestions = (selectedNoteIndex, numOfAnswers, setTrainingQuestions, selectedLargestInterval) => {
//     const randomQuestions = [];
//     const previousQuestion = null;
//     const nextSelectedNoteIndex = [];

//     for (let i = 0; i < numOfAnswers; i++) {
//         if(previousQuestion != null){
//             for (let j = 0; j < selectedNoteIndex.length; j++) {
//                 if(Math.abs(previousQuestion - selectedNoteIndex[j]) <= selectedLargestInterval){
//                     nextSelectedNoteIndex.push(selectedNoteIndex[j]);
//                 }
//             }
//         }else{
//             nextSelectedNoteIndex = selectedNoteIndex;
//         }

//         if(nextSelectedNoteIndex.length <= 0){//prevent the next note only have one choice because of the selectedLargestInterval
//             nextSelectedNoteIndex = selectedNoteIndex;
//         }

//         const randomIndex = Math.floor(Math.random() * nextSelectedNoteIndex.length);
        
//         randomQuestions.push(nextSelectedNoteIndex[randomIndex]);
//         previousQuestion = nextSelectedNoteIndex[randomIndex];

//     }

//     setTrainingQuestions(randomQuestions);
// }

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

export const handleNextQuestion = (selectedNoteIndex, numOfAnswers, setTrainingQuestions, seTrainingAnswers, setShowNextQuestionButton, setFinalAnswerResponseMessage, setCurrentQuestionIndex, currentQuestionIndex) => {
    generateTrainingQuestions(selectedNoteIndex, numOfAnswers, setTrainingQuestions);
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