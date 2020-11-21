/* eslint-disable */
import "bootstrap";
import "./style.css";
import "./assets/img/4geeks.ico";
import "./assets/img/flower.png";
import "./assets/img/1677.jpg";

let topCard = document.querySelector(".card.top");
let card = document.querySelector(".flip-card-back");
let cardH1 = document.querySelector(".flip-card-back .h1");
let rightCard = document.querySelector(".card.right");
let rightCardP = document.querySelector(".card.right p");

window.onload = function() {
  let button = document.querySelector("button");
  button.addEventListener("click", debounce(changeCard, 600, false));
};

function moveCard() {
  topCard.classList.add("flipped");
  setTimeout(() => {
    topCard.style.opacity = 0;
    topCard.classList.remove("flipped");
    setTimeout(() => (topCard.style.opacity = 1), 200);
  }, 1500);
}

let suites = ["club", "spade", "heart", "diamond"];
let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

function changeCard() {
  let value = values[getRndInteger(0, values.length)];
  let suite = suites[getRndInteger(0, suites.length)];

  clearPreviousClass(card, suite);
  moveCard();

  if (value === 0) {
    card.style.background = "white url(1677.jpg) center center no-repeat";
    card.style.backgroundSize = "contain";
    setTimeout(() => switchRightCard(value, suite), 800);
    card.classList.add("joker");
  } else {
    card.style.background = "white";
    card.classList.add(suite);
    cardH1.innerHTML = value;
    setTimeout(() => switchRightCard(value, suite), 800);
  }
}

function switchRightCard(value, suite) {
  clearPreviousClass(rightCard, suite);
  if (value === 0) {
    // Pulled Joker Card
    rightCard.style.background = "white url(1677.jpg) center center no-repeat";
    rightCard.style.backgroundSize = "contain";
    rightCard.classList.add("joker");
    rightCardP.innerHTML = "";
  } else {
    rightCard.style.background = "white";
    rightCard.classList.add(suite);
    rightCardP.innerHTML = value;
  }
}

function clearPreviousClass(card, suite) {
  cardH1.innerHTML = "";
  for (let key in suites) {
    if (card.classList.contains(suites[key])) {
      card.classList.remove(suites[key]);
    } else if (card.classList.contains("joker")) {
      card.classList.remove("joker");
    }
  }
}

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
