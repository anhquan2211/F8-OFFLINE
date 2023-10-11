/** @format */

import { client } from "./client.js";

const root = document.querySelector("#root");

const appEle = document.createElement("div");
appEle.classList.add("app");

const quizizz = document.createElement("div");
quizizz.classList.add("quizizz");

appEle.append(quizizz);
root.append(appEle);

// Define your variables
let totalPoint = 0;
let totalScore = 0;
let streak = 0;
let streakPoint = 0;
let limitPoint = 100;
let totalAnswerCorrect = 0;
let totalAnswerIncorrect = 0;
let streakMax = 0;
let answerCorrect = [];
let sentenceCurrent = 0;
let quizcopy = [];
let isPlay = false;

const getQuestions = async (query = {}, isTotal = false) => {
  const queryString = new URLSearchParams(query).toString();
  const { response, data } = await client.get(`/questions?${queryString}`);

  if (!isTotal) {
    renderQuesttion(data);
  }
  return data;
};

// Function to handle user choice
function handleQuestion(e, correct_answers, score) {
  e.preventDefault();
  const quizizzResultEl = document.querySelector(".result");
  const el = e.target;
  const value = el.innerText;
  answerCorrect.push(value);
  const correctAnswers = Array.isArray(correct_answers)
    ? [...correct_answers]
    : [correct_answers];
  if (correctAnswers.includes(value)) {
    totalAnswerCorrect++;
    el.style.backgroundColor = "green";
    const check = correctAnswers.every((item) => answerCorrect.includes(item));
    if (check) {
      quizizzResultEl.innerText = "Correct";
      quizizzResultEl.style.backgroundColor = "green";
      if (streakPoint > 0) {
        totalScore += +score;
        totalScore += +streakPoint;
      } else {
        totalScore += +score;
      }
      streakPoint += +limitPoint;
      if (streak === 2) streakMax++;
      if (streak < 3) streak++;

      setTimeout(() => {
        getQuestions();
      }, 1000);
    }
  } else {
    totalAnswerIncorrect++;
    quizizzResultEl.innerText = "Incorrect";
    quizizzResultEl.style.backgroundColor = "red";
    streak = 0;
    streakPoint = 0;
    el.style.backgroundColor = "red";
    const elArr = e.target.parentElement.children;
    Array.from(elArr).forEach((el) => {
      if (correctAnswers.includes(el.innerText)) {
        el.style.backgroundColor = "green";
      }
    });

    setTimeout(() => {
      getQuestions();
    }, 1000);
  }
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to reset the game
function handleReset() {
  quizizz.innerHTML = "";
  totalPoint = 0;
  streak = 0;
  streakPoint = 0;
  totalAnswerCorrect = 0;
  totalAnswerIncorrect = 0;
  streakMax = 0;
  renderStart();
}

// Function to get random question
function getRandomQuestion(data) {
  if (data.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomQuestion = data[randomIndex];
  return randomQuestion;
}

// Define the renderEnd function
function renderEnd(totalQuestion) {
  const quizizzStatsEl = document.createElement("div");
  quizizzStatsEl.classList.add("quizz-end");

  const quizizzStatInnerEl = document.createElement("div");
  quizizzStatInnerEl.classList.add("end-inner");

  const quizizzStatInnerTopEl = document.createElement("div");
  quizizzStatInnerTopEl.classList.add("end-top");
  const pEl = document.createElement("p");
  if (totalAnswerCorrect > 7) pEl.innerText = "Game performance";
  else if (totalAnswerCorrect < 4) pEl.innerText = "Bad";
  else pEl.innerText = "Normal";
  quizizzStatInnerTopEl.append(pEl);

  const quizizzStatAccuracyEl = document.createElement("div");
  quizizzStatAccuracyEl.classList.add("end-correct");
  quizizzStatAccuracyEl.innerHTML = `<p>Accuracy</p>
                    <div class="end-correct-total">
                      <div
                        class="end-correct-progress"
                        style="width: ${
                          (totalAnswerCorrect / totalQuestion) * 100
                        }%"
                      >
                        <span>${(
                          (totalAnswerCorrect / totalQuestion) *
                          100
                        ).toFixed(2)}%</span>
                      </div>
                    </div>`;
  quizizzStatInnerTopEl.append(quizizzStatAccuracyEl);

  const quizizzStatPerformanceEl = document.createElement("div");
  quizizzStatPerformanceEl.classList.add("end-performance");
  quizizzStatPerformanceEl.innerHTML = ` <div class="end-performance-item">
                      <p class="number">${totalPoint}</p>
                      <p class="end">Score</p>
                    </div>
                    <div class="end-performance-item">
                      <p class="number">${streakMax}</p>
                      <p class="end">Streak</p>
                    </div>
                    <div class="end-performance-item">
                      <p class="number">${totalAnswerCorrect}</p>
                      <p class="end">Correct</p>
                    </div>
                    <div class="end-performance-item">
                      <p class="number">${totalAnswerIncorrect}</p>
                      <p class="end">Incorrect</p>
                    </div>`;
  quizizzStatInnerTopEl.append(quizizzStatPerformanceEl);

  const quizizzStatActionEl = document.createElement("div");
  quizizzStatActionEl.classList.add("quizz-end--actions");

  const btnReset = document.createElement("button");
  btnReset.classList.add("action-reset");
  btnReset.addEventListener("click", handleReset);
  btnReset.innerText = " Play again";
  quizizzStatActionEl.append(btnReset);

  quizizzStatInnerTopEl.append(quizizzStatActionEl);

  quizizzStatInnerEl.append(quizizzStatInnerTopEl);
  quizizzStatsEl.append(quizizzStatInnerEl);
  quizizz.append(quizizzStatsEl);
}

// Define the renderStart function
function renderStart() {
  const quizizzStartEl = document.createElement("div");
  quizizzStartEl.classList.add("quizizz-start");

  const quizizzStartBodyEl = document.createElement("div");
  quizizzStartBodyEl.classList.add("start-body");
  quizizzStartEl.append(quizizzStartBodyEl);

  const buttonStart = document.createElement("button");
  buttonStart.classList.add("start-btn");
  buttonStart.innerText = "Start";
  quizizzStartBodyEl.append(buttonStart);

  buttonStart.addEventListener("click", (e) => {
    e.preventDefault();
    buttonStart.remove();
    const countdownElement = document.createElement("div");
    countdownElement.classList.add("countdown");
    const p = document.createElement("p");
    countdownElement.append(p);
    quizizzStartBodyEl.append(countdownElement);
    p.innerHTML = "3";
    setTimeout(() => {
      p.innerHTML = "2";
      setTimeout(() => {
        p.innerHTML = "1";
        setTimeout(() => {
          p.innerHTML = "Go!";
          quizizzStartEl.remove();
          getQuestions();
        }, 1000);
      }, 1000);
    }, 1000);
  });
  quizizz.append(quizizzStartEl);
}

// Define the renderQuesttion function
async function renderQuesttion(quiz) {
  if (quiz.length) {
    if (quizcopy.length === 0) {
      quizcopy = [...quiz];
    }
    const randomQuestion = getRandomQuestion(quizcopy);
    const { question, correct_answer, incorrect_answers, score } =
      randomQuestion;
    const randomQuestionIndex = quizcopy.findIndex(
      (item) => item === randomQuestion
    );

    quizcopy.splice(randomQuestionIndex, 1);
    quizizz.innerText = "";
    const quizizzQuestionEl = document.createElement("div");
    quizizzQuestionEl.classList.add("quizizz-question");
    const quizizzTopEl = document.createElement("div");
    quizizzTopEl.classList.add("quizizz-top");
    quizizzTopEl.innerHTML = ` <div class="quizizz-top-timer">
                  <div class="timer-total">
                    <div class="timer-progress"></div>
                  </div>
                </div>
                <div class="top-inner">
                  <div class="top-inner-left">
                    <div class="top-step">
                      <span id="current">${
                        sentenceCurrent + 1
                      }</span><span id="total">/${quiz.length}</span>
                    </div>
                    <div class="streak">
                      <div class="streak-left"></div>
                      <div class="streak-right"></div>
                      <div class="streak-endus" style ="width: ${
                        streak === 0 ? 0 : (100 / 3) * streak
                      }%; padding: 0px ${streak > 0 ? 5 : 0}px">${
      streak > 0 ? "Streak" : ""
    }</div>  
                    </div> 
                    <span>${streakPoint > 0 ? "+" + streakPoint : ""}</span>
                  </div>
                  <div class="top-inner-right">
                    <div class="top-score">Score: ${totalPoint}</div>
                  </div>
                </div>`;

    quizizzQuestionEl.append(quizizzTopEl);
    const quizizzBody = document.createElement("div");
    quizizzBody.classList.add("quizizz-body");
    const quizizzBodyInner = document.createElement("div");
    quizizzBodyInner.classList.add("body-inner");

    const questionText = document.createElement("div");
    questionText.classList.add("question-text");
    const h3 = document.createElement("h3");
    h3.innerHTML = question;
    questionText.append(h3);
    const h4 = document.createElement("h4");
    questionText.append(h4);

    const answers = document.createElement("div");
    answers.classList.add("answer");

    let allAnswers = [];
    if (Array.isArray(correct_answer)) {
      h4.innerText = `(Choose ${correct_answer.length} correct answer(s))`;
      allAnswers = [...correct_answer, ...incorrect_answers];
    } else {
      h4.innerText = `(Choose 1 correct answer(s))`;
      allAnswers.push(correct_answer, ...incorrect_answers);
    }
    const allAnswerNews = shuffleArray(allAnswers);
    Array.from(allAnswerNews).forEach((answer) => {
      const answerEl = document.createElement("div");
      answerEl.classList.add("answer-item");
      answerEl.addEventListener("click", (e) => {
        sentenceCurrent++;

        handleQuestion(e, correct_answer, incorrect_answers, score);
        if (sentenceCurrent === quiz.length) {
          isPlay = true;
        }
      });
      answerEl.innerText = answer;
      answers.append(answerEl);
    });

    const quizizzResult = document.createElement("div");
    quizizzResult.classList.add("result");

    quizizzBodyInner.append(questionText);
    quizizzBodyInner.append(answers);
    quizizzBody.append(quizizzBodyInner);

    quizizzQuestionEl.append(quizizzBody);
    quizizzQuestionEl.append(quizizzResult);
    quizizz.append(quizizzQuestionEl);

    if (sentenceCurrent === quiz.length) {
      sentenceCurrent = 0;
      quizizz.innerHTML = "";
      renderEnd(quiz.length);
    }
  }
}

renderStart();
