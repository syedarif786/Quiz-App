let startBtn = document.querySelector(".startButton");
let infoBox = document.querySelector(".infoBox");
let exitBtn = document.querySelector(".exitBtn");
let continueBtn = document.querySelector(".continueBtn");
let quizBox = document.querySelector(".quiz-box");
let questionText = document.querySelector(".questionText");
let optionListContainer = document.querySelector(".options-list-container");
let highlightedTextFooter = document.querySelector(".highlighted-text-1");
let nextBtn = document.querySelector(".nextBtn");
let timeline = document.querySelector(".timeline");
let progressBar = document.querySelector(".progressBar");
let timeLineTitle = document.querySelector(".time-line-title");
let scoreText = document.querySelector(".score-text");
let resultBox = document.querySelector(".result-box");
let replayQuiz = document.querySelector(".replay-quiz");
let quitQuiz = document.querySelector(".quit-quiz");

let currentQuestionIndex = 0;
let timer = 15;
let progressWidth = 0;
let timelineInterval = null;
let progressInterval = null;
let userScore = 0;

startBtn.addEventListener("click", () => {
  console.log("clicked");
  infoBox.classList.add("activeInfoBox");
});

exitBtn.addEventListener("click", () => {
  infoBox.classList.remove("activeInfoBox");
});

continueBtn.addEventListener("click", () => {
  infoBox.classList.remove("activeInfoBox");
  quizBox.classList.add("activeQuizBox");
  showQuestion(currentQuestionIndex);
  handleTimer(timer);
});

const showQuestion = (index) => {
  // 1. Which type of language is JavaScript?
  optionListContainer.innerHTML = "";
  questionText.innerHTML =
    questions[index]?.numb + ". " + questions[index].question;
  console.log(questionText.innerHTML);

  questions[index].options.forEach((option) => {
    let que = document.createElement("div");
    que.classList.add("options");
    que.innerHTML = option;
    optionListContainer.appendChild(que);
    que.addEventListener("click", optionClickHandler);
  });
  highlightedTextFooter.innerHTML = questions[index]?.numb;
};

nextBtn.addEventListener("click", () => {
  nextBtn.classList.remove("active");
  currentQuestionIndex += 1;
  if (currentQuestionIndex < 10) {
    handleTimer(timer);
    showQuestion(currentQuestionIndex);
  }
  if (currentQuestionIndex == 10) {
    quizBox.classList.remove("activeQuizBox");
    resultBox.classList.add("active-score");
    if (userScore > 7) {
      scoreText.innerHTML = `and nice, you got ${userScore} out of 10`;
    } else {
      scoreText.innerHTML = `try again, you got ${userScore} out of 10`;
    }

    console.log(userScore);
  }

  // reset the timer
  // reser progressbar
});

const handleTimer = (timeLimit) => {
  clearInterval(timelineInterval);
  clearInterval(progressInterval);
  let timeLeft = timeLimit;
  let maxWidth = 550;
  let progress = 0;

  timeline.innerHTML = timeLeft < 10 ? "0" + timeLeft : timeLeft;
  progressBar.style.width = "0px";

  timelineInterval = setInterval(() => {
    if (timeLeft >= 0) {
      timeline.innerHTML = timeLeft < 10 ? "0" + timeLeft : timeLeft;
      timeLineTitle.innerHTML = "Time Left";
      // Update progress bar every second
      progress = maxWidth * ((timeLimit - timeLeft) / timeLimit);
      progressBar.style.width = `${progress}px`;

      timeLeft--;
    } else {
      timeLineTitle.innerHTML = "Timer Off";
      nextBtn.classList.add("active");
      clearInterval(progressInterval);
      clearInterval(timelineInterval);
      // ✅ Highlight correct answer
      const correctAnswer = questions[currentQuestionIndex].answer;
      document.querySelectorAll(".options").forEach((option) => {
        if (option.innerHTML.trim() === correctAnswer.trim()) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", tickIcon);
        }
        // Disable all options
        option.classList.add("disabled");
      });

      // ✅ Activate next button
      nextBtn.classList.add("active");
    }
  }, 1000);
};

const tickIcon = `<div class><i class="fa-solid fa-check"></i></div>`;
const wrongIcon = `<div class><i class="fa-solid fa-xmark"></i></div>`;

const optionClickHandler = (event) => {
  clearInterval(timelineInterval);
  clearInterval(progressInterval);

  const userAnswer = event.target.innerHTML;
  console.log(userAnswer);
  const correctAnswer = questions[currentQuestionIndex].answer;
  console.log(correctAnswer);

  if (userAnswer == correctAnswer) {
    userScore++;
    event.target.classList.add("correct");
    console.log(event.target);
    console.log(event.target.classList);
    event.target.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    event.target.classList.add("incorrect");

    document.querySelectorAll(".options").forEach((opt) => {
      if (opt.innerHTML.trim() === correctAnswer.trim()) {
        opt.classList.add("correct");
        event.target.insertAdjacentHTML("beforeend", wrongIcon);
        opt.insertAdjacentHTML("beforeend", tickIcon);
      }
    });

    document.querySelectorAll(".options").forEach((opt) => {
      opt.classList.add("disabled");
    });
  }
  nextBtn.classList.add("active");
};

// Retry and quiz section
replayQuiz.addEventListener("click", () => {
  resultBox.classList.remove("active-score");
  infoBox.classList.add("activeInfoBox");
  userScore=0;
});

quitQuiz.addEventListener('click',()=>{
    resultBox.classList.remove("active-score");
    infoBox.classList.remove("activeInfoBox");    
})

