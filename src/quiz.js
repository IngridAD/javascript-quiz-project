class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion() {
        if(this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
        }
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (currentQuestion.answer === answer) {
            this.correctAnswers++;
            return true;  
        } else {
            return false; 
        }
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }

    filterQuestionsByDifficulty(difficulty) { 

        if (difficulty >= 1 && difficulty <= 3) {
            this.questions = this.questions.filter((question) => {
                return question.difficulty === difficulty
            });
        }

    }

    averageDifficulty() {
        const total = this.questions.reduce((acc, curr) => {
            return acc + curr.difficulty;
        }, 0);
        return total / this.questions.length;
    }
};