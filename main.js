const elBtns = document.querySelectorAll(".js-answer-btn");
const elSanoqBtn = document.querySelector(".savol-raqami");
const elCompleted = document.querySelector(".js-answer-count");
const elTime = document.querySelector(".js-time");
const elCorrect = document.querySelector(".js-correct");
const iwla = document.querySelector(".js-uncorrect-final");
let savolCounter = 1;
let javobCounter = 0;
let foraCount = 5;
let correctAnswer = 0;
const elAudioLose = document.querySelector("#lose");
const elAudioWin = document.querySelector("#win");
const elAudioPass = document.querySelector("#pass");
const elAudioFail = document.querySelector("#fail");

let arr = [];

function foraCountFunction(count) {
  document.querySelector(".js-fora").textContent = `${count} ta`;
}
function savolRaqami(son) {
  elSanoqBtn.textContent = `${son}-savol`;
}
function jsAnswerCounter(son) {
  elCompleted.textContent = `${son}/10`;
  if (javobCounter === 10 && foraCount !== 0) {
    document.querySelector(".tests").classList.add("d-none");
    document.querySelector(".youWin").classList.remove("d-none");
    document.querySelector(".js-correct-final").innerText = correctAnswer;
    elAudioWin.play();
  }
}
function jsCorrectFunction(son) {
  elCorrect.textContent = son;
}
function greenBtn(ind) {
  correctAnswer++;
  jsCorrectFunction(correctAnswer);
  let number = Math.floor(Math.random() * 90 + 1);
  if (!arr.includes(number)) {
    elAudioPass.play();
    arr.push(number);
    elBtns.forEach((btn, index) => {
      if (index === ind) {
        btn.style.border = "1px solid green";
        setTimeout(() => {
          btn.style.border = "1px solid rgb(184, 184, 184)";
          testRender(roadSymbol.slice(number, number + 3));
          savolCounter++;
          javobCounter++;
          savolRaqami(savolCounter);
          jsAnswerCounter(javobCounter);
        }, 1000);
      } else {
        btn.classList.add("disabled");
        setTimeout(() => {
          btn.classList.remove("disabled");
        }, 1000);
      }
    });
  } else {
    greenBtn(ind);
  }
}
function redBtn(ind) {
  let number = Math.floor(Math.random() * 90 + 1);
  if (!arr.includes(number)) {
    elAudioFail.play();
    arr.push(number);
    elBtns.forEach((btn, index) => {
      if (index === ind) {
        btn.style.border = "1px solid red";
        setTimeout(() => {
          btn.style.border = "1px solid rgb(184, 184, 184)";
          testRender(roadSymbol.slice(number, number + 3));
          savolCounter++;
          javobCounter++;
          foraCount--;
          savolRaqami(savolCounter);
          jsAnswerCounter(javobCounter);
          foraCountFunction(foraCount);
          if (foraCount === 0) {
            document.querySelector(".tests").classList.add("d-none");
            document.querySelector(".gameOver").classList.remove("d-none");
            iwla.textContent = correctAnswer;
            console.log(document.querySelector(".js-uncorrect-final"));
            elAudioLose.play();
          }
        }, 1000);
      } else {
        btn.classList.add("disabled");
        setTimeout(() => {
          btn.classList.remove("disabled");
        }, 1000);
      }
    });
  } else {
    redBtn(ind);
  }
}
function testRender(symbols) {
  let sum = Math.floor(Math.random() * 2); // 1
  symbols.forEach((value, index) => {
    elBtns[index].textContent = value.symbol_title;
    if (sum === index) {
      document.querySelector(".js-test-img").src = value.symbol_img;
      elBtns.forEach((btn, yandex) => {
        if (sum === yandex) {
          btn.textContent = value.symbol_title;
          btn.setAttribute("onclick", `greenBtn(${yandex})`);
          console.log(btn);
        } else {
          btn.setAttribute("onclick", `redBtn(${yandex})`);
        }
      });
    }
  });
}

function timeRender(time) {
  minut = `0${time}`;
  secund = 00;
  vaqt = `${minut}:${secund}`;
  elTime.textContent = vaqt;
  setInterval(() => {
    if (secund == 00 || secund == 0) {
      time = Number(time) - 1;
      console.log(time, secund)
      if (elTime.textContent == "00:0") {
        document.querySelector(".tests").classList.add("d-none");
        document.querySelector(".gameOver").classList.remove("d-none");
        document.querySelector(".js-uncorrect-final").textContent =
          correctAnswer;
        console.log(document.querySelector(".js-uncorrect-final"));
        elAudioLose.play();
      }
      secund = 60;
      secund--;
      minut = `0${time}`;
      vaqt = `${minut}:${secund}`;
      elTime.textContent = vaqt;
    } else {
      secund--;
      vaqt = `${minut}:${secund}`;
      elTime.textContent = vaqt;
    }
  }, 100);
}
document.querySelectorAll(".blur-btns").forEach((value) => {
  value.addEventListener("click", () => {
    let sum = Math.floor(Math.random() * 90 + 1);
    arr.push(sum);
    document.querySelector(
      ".js-level-exam"
    ).textContent = `Level: ${value.textContent
      .slice(0, value.textContent.length - 9)
      .trim()}`;
    document.querySelector(".entery-section").classList.add("d-none");
    document.querySelector(".tests").classList.remove("d-none");
    testRender(roadSymbol.slice(sum, sum + 3));
    foraCountFunction(foraCount);
    savolRaqami(savolCounter);
    jsAnswerCounter(javobCounter);
    jsCorrectFunction(correctAnswer);
    timeRender(value.textContent[value.textContent.length - 7]);
  });
});
