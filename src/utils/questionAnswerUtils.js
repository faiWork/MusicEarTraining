export const generateTrainingQuestions = (selectedNoteIndex, numOfAnswers, setTrainingQuestions, selectedLargestInterval, startWithRootNote) => {
    const randomQuestions = [];
    let previousQuestion = null;
    let nextSelectedNoteIndex = [];

    console.log("selectedLargestInterval: " + parseInt(selectedLargestInterval));

    for (let i = 0; i < numOfAnswers; i++) {
        if(previousQuestion != null){
            nextSelectedNoteIndex = [];
            for (let j = 0; j < selectedNoteIndex.length; j++) {
                console.log("Math.abs(previousQuestion - (selectedNoteIndex[j])): " + Math.abs(previousQuestion - (selectedNoteIndex[j])));
                if(Math.abs(previousQuestion - (selectedNoteIndex[j])) <= selectedLargestInterval){
                    nextSelectedNoteIndex.push(selectedNoteIndex[j]);
                }
            }
        }else{
            nextSelectedNoteIndex = [...selectedNoteIndex];
        }

        // if(nextSelectedNoteIndex.length <= 1){//prevent the next note only have one or no choice because of the selectedLargestInterval
        //     nextSelectedNoteIndex = [...selectedNoteIndex];
        // }

        const randomIndex = Math.floor(Math.random() * nextSelectedNoteIndex.length);

        console.log("nextSelectedNoteIndex: " + nextSelectedNoteIndex);
        console.log("startWithRootNote: " + startWithRootNote);
        console.log("i: " + i);
        console.log("randomIndex: " + randomIndex);

        if((i == 0 && startWithRootNote)){
            randomQuestions.push(0);
        }else{
            randomQuestions.push(nextSelectedNoteIndex[randomIndex]);
        }
        
        previousQuestion = nextSelectedNoteIndex[randomIndex];

    }

    setTrainingQuestions(randomQuestions);
}

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

export const handleNextQuestion = (selectedNoteIndex, numOfAnswers, setTrainingQuestions, selectedLargestInterval, seTrainingAnswers, setShowNextQuestionButton, setFinalAnswerResponseMessage, setCurrentQuestionIndex, currentQuestionIndex, startWithRootNote) => {
    generateTrainingQuestions(selectedNoteIndex, numOfAnswers, setTrainingQuestions, selectedLargestInterval, startWithRootNote);
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