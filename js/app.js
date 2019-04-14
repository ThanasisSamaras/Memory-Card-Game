
let cards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb',
];

let deck = document.querySelector('.deck');
let cardHTML;

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initGame() {
  cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join('');
}

initGame();

// other useful card variables
const cardList = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = 0;

// move counting variables
let moves = 0,
    moveCounter = document.querySelector('.moves');
// setting counter to zero
moveCounter.innerHTML = moves;

// star rating variables
let starPanel = document.querySelector('.stars'),
    star = starPanel.getElementsByTagName('i'),
    totalRating = 3;

// reset game variable
let restart = document.querySelector('.restart'),
    repeat = restart.getElementsByTagName('i');

// timer variables
let time = document.getElementsByTagName('time'),
    hours = document.querySelector('.hours'),
    minutes = document.querySelector('.minutes'),
    seconds = document.querySelector('.seconds'),
    sec = 0,
    min = 0,
    hrs = 0,
    t;

// modal info
const modal = document.getElementById('myModal');
const modalReplayBtn = document.querySelector('.modalBtn');
const modalMoves = document.querySelector('.modal-content .moves-count');
const modalHours = document.querySelector('.modal-content .hours');
const modalMins = document.querySelector('.modal-content .mins');
const modalSeconds = document.querySelector('.modal-content .seconds');
const modalRating = document.querySelector('.modal-content .rating');

// When the game is finished, open the modal
function showModal() {
  modalHours.textContent = hrs > 0 ? `${hrs} hours, ` : '';
  modalMins.textContent = min > 0 ? `${min} minutes, ` : '';
  modalSeconds.textContent = `${sec} seconds`;
  modalMoves.textContent = `${moves} moves`;
  modalRating.textContent = totalRating;
  modal.style.display = "block";
}

function closeModal() {
    modal.style.display = 'none';
}

function timer() {
  t = setTimeout(add, 1000);
}

function stopFunction() {
  clearTimeout(t);
}

function add() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
    if (min >= 60) {
        min = 0;
        hrs++;
    }
  }

  if (hrs > 9) {
    hours.textContent = hrs;
  }
  else {
    hours.textContent = "0" + hrs;
  }

  if (min > 9) {
    minutes.textContent = min;
  }
  else {
    minutes.textContent = "0" + min;
  }

  if (sec > 9) {
    seconds.textContent = sec;
  }
  else {
    seconds.textContent = "0" + sec;
  }

  timer();
}

function resetGame() {
  // reset open and matched cards
  openCards = [];
  matchedCards = 0;

  // reset timer
  stopFunction(t);
  hours.textContent = "00";
  minutes.textContent = "00";
  seconds.textContent = "00";
  hrs, min, sec = 0;

  // reset number of moves
  moves = 0;
  moveCounter.innerHTML = moves;

  // reset star rating
  for (let icon of star) {
    if (icon.classList.contains('fa-star-o')) {
      icon.classList.remove('fa', 'fa-star-o');
      icon.classList.add('fa', 'fa-star');
    }
  }

  //reset game board
  deck.innerHTML = '';
  console.log(deck);

  initGame();
}

repeat[0].addEventListener('click', function(evt) {
  resetGame();
});

modalBtn.addEventListener('click', function(evt) {
  closeModal()
  resetGame();
});

for (let card of cardList) {
  card.addEventListener('click', function(e) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      card.classList.add('open', 'show');
      openCards.push(card);

      if (openCards.length == 2) {
        // increase the number of moves
        moves++;
        moveCounter.innerHTML = moves;

        // star rating system
        if (moves == 11) {
          star[2].classList.remove('fa', 'fa-star');
          star[2].classList.add('fa', 'fa-star-o');
          totalRating--;
        }
        else if (moves == 16) {
          star[1].classList.remove('fa', 'fa-star');
          star[1].classList.add('fa', 'fa-star-o');
          totalRating--;
        }
        else if (moves == 21) {
          star[0].classList.remove('fa', 'fa-star');
          star[0].classList.add('fa', 'fa-star-o');
          totalRating--;
        }

        // check if cards match
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[1].classList.add('match');

          matchedCards = matchedCards + 2;

          if (matchedCards == 16) {
            stopFunction(t);
            showModal();
          }

          openCards = [];
        }
        // cards don't match
        else {
          setTimeout(function() {
            for (let card of openCards) {
              card.classList.remove('open', 'show');
            };

            openCards = [];
          }, 700);
        }
      }
    }

    if (moves < 1) {
      timer();
    }
  });
};
