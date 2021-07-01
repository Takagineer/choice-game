"use strict";

{
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector("#result > p");

  const quizSet = shuffle([
    { q: "世界一高い山は?", c: ["富士山", "力道山", "石鎚山", "ヒマラヤ山脈"] },
    { q: "以下のうち、本物は?", c: ["長州力", "長州小力", "消臭力", "超非力"] },
    { q: "どれが正解?", c: ["g", "h", "i", "j"] },
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    //上の記述で配列の最終indexをiという変数で定義している。
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }

    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
    }
    btn.classList.remove("disabled");
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;

      li.addEventListener("click", () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
    if (currentNum === quizSet.length - 1) {
      btn.textContent = "show score";
    }
  }

  setQuiz();

  btn.addEventListener("click", () => {
    if (btn.classList.contains("disabled")) {
      return;
    }

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `score:${score}/${quizSet.length}`;
      result.classList.remove("hidden");
    } else {
      btn.classList.add("disabled");
      currentNum++;
      setQuiz();
    }
  });
}
