"use strict";

{
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");

  const quizSet = [
    { q: "what is A?", c: ["a", "b", "c"] },
    { q: "what is B?", c: ["d", "e", "f"] },
    { q: "what is C?", c: ["g", "h", "i"] },
  ];
  let currentNum = 0;

  function shuffle(arr) {
    //上の記述で配列の最終indexをiという変数で定義している。
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }

    return arr;
  }

  function checkAnswer(li) {
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add("correct");
    } else {
      li.classList.add("wrong");
    }
  }

  function setQuiz() {
    question.textContent = quizSet[currentNum].q;
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;

      li.addEventListener("click", () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
  }

  setQuiz();
}
