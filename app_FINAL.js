const timer = document.getElementById("timer");
const modeButtons = document.querySelector("[class=modeSelector]");
const pomodoroButton = document.getElementById("pomodoroButton");
const shortButton = document.getElementById("shortButton");
const longButton = document.getElementById("longButton");
const mainButton = document.getElementById("toggle");
let seconds = 0;

const TIMER = {
  POMODORO: 25,
  SHORTBREAK: 5,
  LONGBREAK: 15,
};

function changeMode(e) {
  mainButton.classList.replace("fa-stop", "fa-play");
  mainButton.dataset.paused = "true";

  for (let i = 0; i < 3; i++) {
    e.path[1].children[i].classList.remove("active");
  }
  e.target.classList.add("active");

  let mode = e.target.dataset.mode;
  timer.dataset.mode = mode;

  if (timer.dataset.mode === "pomodoro") {
    timer.innerHTML = `${TIMER.POMODORO}:00`;
  } else if (timer.dataset.mode === "short") {
    timer.innerHTML = `0${TIMER.SHORTBREAK}:00`;
  } else {
    timer.innerHTML = `${TIMER.LONGBREAK}:00`;
  }
}

function pomodoro() {
  function setTimer() {
    if (timer.dataset.mode === "pomodoro") {
      seconds = TIMER.POMODORO * 60;
    } else if (timer.dataset.mode === "short") {
      seconds = TIMER.SHORTBREAK * 60;
    } else {
      seconds = TIMER.LONGBREAK * 60;
    }
  }

  if (mainButton.classList.contains("fa-play")) {
    mainButton.classList.replace("fa-play", "fa-stop");
    mainButton.dataset.paused = "false";

    setTimer();

    interval = setInterval(() => {
      let timeRemaining =
        ("0" + Math.floor(seconds / 60)).slice(-2) +
        ":" +
        ("0" + (seconds % 60)).slice(-2);
      timer.innerHTML = timeRemaining;
      document.title = `${timeRemaining} - ${
        timer.dataset.mode === "pomodoro" ? "Work" : "Break"
      }`;

      if (mainButton.dataset.paused === "true" || seconds === 0) {
        clearInterval(interval);
      }
      seconds--;
    }, 1000);
  } else {
    mainButton.classList.replace("fa-stop", "fa-play");
    mainButton.dataset.paused = "true";
  }
}

mainButton.addEventListener("click", pomodoro);
modeButtons.addEventListener("click", changeMode);
