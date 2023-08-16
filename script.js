const cardsContainer = document.querySelector('.cards_container');
const cards = [
  {
    cardName: "C#",
    path: "Images/C#.pmg",
    color: "crimson",
  },
  {
    cardName: "C++",
    path: "Images/C++.pmg",
    color: "cornsilk",
  },
  {
    cardName: "Css",
    path: "Images/Css.pmg",
    color: "cyan",
  },
  {
    cardName: "html",
    path: "Images/html.pmg",
    color: "darkgreen",
  },
  {
    cardName: "kotlen",
    path: "Images/kotlen.pmg",
    color: "midnightblue",
  },
  {
    cardName: "php",
    path: "Images/php.pmg",
    color: "dodgerblue",
  },
  {
    cardName: "python",
    path: "Images/python.pmg",
    color: "gold",
  },
  {
    cardName: "swift",
    path: "Images/swift.pmg",
    color: "lightblue",
  },
];



const randomNumber = (min,max) => Math.floor(((max - min + 1 ) * Math.random()) + min);

const randomCard = () => cards[randomNumber(0,cards.length-1)];


const drawCard = function(card){
  const container = document.createElement('div');
  container.classList.add('container')
  const backFace = document.createElement('div');
  backFace.classList.add('back');
  backFace.style.backgroundColor = 'black';
  const cardHTML = document.createElement('div');
  cardHTML.style.backgroundColor = card.color; 
  cardHTML.classList.add('card');
  cardHTML.classList.add("hide");
  backFace.classList.add('show');
  container.append(cardHTML);
  container.append(backFace)
  cardsContainer.append(container);
}



const drawCards = function(e){
    let drawnCards = 0;
    const cardsNumber = (cards.length) * 2;
    let cardToDraw = null;
    const cardsMap = cards.reduce(function(acc,card){
        acc.set(card.cardName,2);
        return acc;
    },new Map())
    
    console.log(cardsNumber);
    while(drawnCards !== cardsNumber){
        cardToDraw = randomCard();
        if(cardsMap.get(cardToDraw.cardName) !== 0){
            drawCard(cardToDraw);
            cardsMap.set(cardToDraw.cardName,cardsMap.get(cardToDraw.cardName)-1);
            drawnCards++;
        }
    }
    console.log(drawnCards);
}

let shownCards = 0; 
let firstCard = null;
let secondCard = null;

const play = function(e){
  if(!e.target.classList.contains('stable')){
    console.log(shownCards);
      if(shownCards === 0){
        firstCard = e.target.parentElement.querySelector('.card');
      }else{
        secondCard = e.target.parentElement.querySelector('.card');;
      }
      show(e);
      shownCards++;
      if(shownCards === 2){
        console.log(firstCard,secondCard);
        if(firstCard.style.backgroundColor !== secondCard.style.backgroundColor){
         time(firstCard,secondCard);
        }
        firstCard.classList.add("stable");
        secondCard.classList.add("stable");
        firstCard = null;
        secondCard = null;
        shownCards = 0;
    }
  }
}


const time = function(firstCard,secondCard){
  setTimeout(function () {
    hide(firstCard);
    console.log(shownCards);
    hide(secondCard);
  }, 1000);
}




const show = function(e){
  if(e.target.classList.contains('back')){
    e.target.classList.toggle('hide')
    e.target.classList.toggle("show");
    e.target.parentElement.querySelector(".card").classList.toggle("show");
    e.target.parentElement.querySelector('.card').classList.toggle('hide');
    e.target.classList.toggle("flip");
    e.target.parentElement.querySelector(".card").classList.toggle("flip");
  }
}

const hide = function(card){
  if (card.classList.contains("card")) {
    card.classList.toggle("show");
    card.parentElement.querySelector(".back").classList.toggle("hide");
    card.classList.toggle("hide");
    card.parentElement.querySelector(".back").classList.toggle("show");
    card.classList.remove("flip");
    card.parentElement.querySelector(".back").classList.remove("flip");
    // e.target.classList.add("flip");
    // e.target.parentElement.querySelector(".back").classList.add("flip");
  }
}

// document.querySelector(".cards_container").addEventListener("click", show);
// document.querySelector(".cards_container").addEventListener("click", hide);
document.querySelector(".cards_container").addEventListener("click", play);

window.addEventListener("DOMContentLoaded",drawCards);
