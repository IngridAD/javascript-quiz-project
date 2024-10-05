document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton");
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    new Question("What is the name of Joshua's dog?", ["Dom", "Ragnar", "Sigurd Snake-in-the-Eye", "Buddy"], "Ragnar", 2),
    new Question("What is the name of Neha's cat?", ["Babushka", "Babush", "Dedushka", "Dedush"], "Babush", 2),
    new Question("What is not related to the Web Development?", ["DOM", "Java", "HTML", "CSS"], "Java", 2),
    new Question("Where is the worst internet connection?", ["France", "Mongolia", "North Korea", "Bulgaria"], "France", 1),
    new Question("What sport is featured in the video game “FIFA”", ["Football", "Basketball", "Volleyball", "Boxing"], "Football", 1),
    new Question("A collection of data containing both properties and methods is called...", ["Tag", "Selector", "Object", "Class"], "Object", 2),
  ];

  /************  TIMER  ************/
  let timer;
  const timeRemainingContainer = document.getElementById('timeRemaining');
  const quizDuration = 120;// 120 seconds (2 minutes)

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      quiz.timeRemaining--;

      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, '0');
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, '0');
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults(); 
      };  
    }, 1000);
  }
  

  /************  QUIZ INSTANCE  ************/
  let quiz = new Quiz(questions, quizDuration, quizDuration);

  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  // Show first question
  showQuestion();
  startTimer();

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener('click', nextButtonHandler);
  restartButton.addEventListener('click', restartQuiz)


  /************  FUNCTIONS  ************/
  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";
    const question = quiz.getQuestion();
    question.shuffleChoices();

    // 1. Show the question
    const questionElement = document.createElement("p");
    questionElement.textContent = question.text;
    questionContainer.appendChild(questionElement);
    
    // 2. Update the green progress bar
    const progressPercent = (100 / quiz.questions.length) * quiz.currentQuestionIndex;
    progressBar.style.width = `${progressPercent}%`;

    // 3. Update the question count text
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

    // 4. Create and display new radio input element with a label for each choice.
    question.choices.forEach(choice => {
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = "choice";
      choiceInput.value = choice;
      choiceInput.id = choice;
      const choiceLabel = document.createElement("label");
      choiceLabel.htmlFor = choice;
      choiceLabel.innerText = choice;
      const choiceContainerElement = document.createElement("div");
      choiceContainerElement.appendChild(choiceInput);
      choiceContainerElement.appendChild(choiceLabel);
      choiceContainer.appendChild(choiceContainerElement);
    });
  }

  function nextButtonHandler () {
    let selectedAnswer = null;
    const choiceElements = document.querySelectorAll("input[name='choice']");

    choiceElements.forEach(choiceElement => {
      if (choiceElement.checked) {
        selectedAnswer = choiceElement.value;
      } 
    });
    
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      if (quiz.currentQuestionIndex + 1 === quiz.questions.length) {
        showResults();
      }
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }  

  function showResults() {
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }

  function restartQuiz() {
    quiz = new Quiz(questions, quizDuration, quizDuration);
    quiz.shuffleQuestions();
    quizView.style.display = "flex";
    endView.style.display = "none";
    progressBar.style.width = "0%";
    questionCount.innerText = "";

    showQuestion();
  }
});