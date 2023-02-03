const cardObjectDefinitions = [
    {id:1, imagePath:'/images/card-KingHearts.png'},
    {id:2, imagePath:'/images/card-JackClubs.png'},
    {id:3, imagePath:'/images/card-QueenDiamonds.png'},
    {id:4, imagePath:'/images/card-AceSpades.png'}

];

const cardBackImgPath = '/images/card-back-blue.png';
const cardContainerElement = document.querySelector('.card-container');
let cards = [];
const playGameButtonElement = document.getElementById('playGame');
const collapseGridAreaTemp = '"d d" "d d"';
const cardCollectionCellClass = ".card-pos-d";

const numeCards = cardObjectDefinitions.length;
let cardPositions = [];

let gameInProgress = false;
let shufflingInProgress = false;
let cardsRevealed = false;

const aceSpadesId = 4;


{/* <div class="header-score-container">
<h2 class="score">Score&nbsp;<span class="badge">0</span></h2>
</div>
<div class="header-round-container">
<h2 class="round">Round&nbsp;<span class="badge">0</span></h2>
</div> */}
const currentGameStatusElem = document.querySelector('.current-status');
const scoreContainerElement = document.querySelector('.header-score-container');
const scoreElement = document.querySelector('.score');
const roundContainerElement = document.querySelector('.header-round-container');
const roundElement = document.querySelector('.round');

const winColour = 'green';
const loseColour = 'red';
const primaryColour = 'black';

let roundNum = 0;
let maxRounds = 4;
let score = 0;


loadGame();


function loadGame() {
    // when the game loads, the cards will be created on the grid
    createCards();
    // assigned All the cardElements created to casrds variable 
    cards = document.querySelectorAll('.card');
    // the score and round value is hidden when the game is loaded
    updateStatusElement(scoreContainerElement, "none");
    updateStatusElement(roundContainerElement, "none");
    
    // click Play Game button to start the game
    playGameButtonElement.addEventListener('click', () => startGame() );


}

function startGame() {
    // when user click Play Game button, the game will start
    // initialised all the key values then the round automatically starts
    initialiseNewGame();
    startRound();
}


function initialiseNewGame() {
    // initalise all the values and prepare for the game to start
    score = 0;
    roundNum = 0;
    shufflingInProgress = false;

    updateStatusElement(scoreContainerElement, "flex");
    updateStatusElement(roundContainerElement, "flex");
    updateStatusElement(scoreElement, "block", primaryColour, `Score <span class='badge'>${score}</span>`);
    updateStatusElement(roundElement, "block", primaryColour, `Round <span class='badge'>${roundNum}</span>`)
}

function startRound() {
    initialiseNewRound();
    collectCards();
    flipCards(true);
    shuffleCards();
}


function initialiseNewRound() {

    roundNum++;
    playGameButtonElement.disabled = true;
    gameInProgress = true;
    shufflingInProgress = true;
    cardsRevealed = false;

    // when a round is started, we want to update the status of the game in black colour
    updateStatusElement(currentGameStatusElem, "block", primaryColour, "Shuffling...");
    updateStatusElement(roundElement, "block", primaryColour, `Round <span class='badge'>${roundNum}</span>`)
}

function collectCards() {
    // when the round starts, the grid will collapse into one cell and all cards will stack
    transFormGridArea(collapseGridAreaTemp);
    addCardsToGridAreaCell(cardCollectionCellClass);
}

function flipCards(flipToBack) {
    // the cards will flip in order with 0.1s wait time
    cards.forEach((card, index) => {
        setTimeout(() => {
            flipCard(card, flipToBack);
        }, index * 100)
    })
}


function shuffleCards() {
    // radomise the position of the card

    // every 12ms the shuffle function will be executed
    const id = setInterval(shuffle, 10);
    
    let shuffleCount = 0;
    function shuffle() {
        randomiseCardPositions();
        if (shuffleCount === 400) {
            clearInterval(id);
            shufflingInProgress = false;
            dealCards();
            updateStatusElement(currentGameStatusElem, "block", primaryColour, "Please click the card that you think is the Ace of the Spades")
        } else {
            shuffleCount++;
        }
    }

}


// user starts to choose for a card
function chooseCard(card) {
    // let user choose a card
    if (canChooseCard()) {
        evaluateCardChoice(card);
        // flip the card that user chooses
        flipCard(card, false);
        
        setTimeout(() => {
            // after 3s all cards will revealed
            flipCards(false);
            updateStatusElement(currentGameStatusElem, "block", primaryColour, "Card position revealed");
            endRound();
        }, 3000)
        cardsRevealed = true
    }
}

function canChooseCard() {
    // only game is in progress, shuffling is not in progress and cards are not revealed 
    // then the user can choose a card
    return gameInProgress == true && !shufflingInProgress && !cardsRevealed;
}

function evaluateCardChoice(card) {
    // evalute the card that use chooses is the ace of spades or not
    if (card.id == 4) {
        // Score only updates when the use chooses the ace of spades
        updateScore();
        outputChoiceFeedback(true);
    } else {
        outputChoiceFeedback(false);
    }
}

function endRound () {
    // the round will be ended after user selected a card and
    // all cards have revealed

    // if the roundNum reaches the maxRounds, the game ends
    // if not, the new round will start automaticlally in 2s
    setTimeout(() => {
        if (roundNum === maxRounds) {
            gameOver();
            return
        } else {
            startRound();
        }
    }, 2000)
}


function gameOver() {
    updateStatusElement(scoreContainerElement, "none");
    updateStatusElement(roundContainerElement, "none");

    const gameOverMessage = `Game Over! Final Score - <span class = 'badge'>${score}</span>`
    updateStatusElement(currentGameStatusElem, "block", primaryColour, gameOverMessage);
    gameInProgress = false;
    playGameButtonElement.disabled = false;
}


function updateScore() {
    calculateScore();
    updateStatusElement(scoreElement, "block", primaryColour, `<span class='badge'>${score}</span>`)
}


function calculateScoreToAdd(roundNum) {
    if (roundNum === 1) {
        return 100;
    } else if (roundNum === 2) {
        return 50;
    } else if (roundNum === 3){
        return 25;
    } else {
        return 10; 
    }
}
function calculateScore() {
    const scoreToAdd = calculateScoreToAdd(roundNum);
    score = score + scoreToAdd
}



function updateStatusElement(elem, display, colour, innerHTML) {
    elem.style.display = display;
    
    if (arguments.length > 2) {
        elem.style.color = colour;
        elem.innerHTML = innerHTML;
    }

}

function outputChoiceFeedback(hit) {
    if (hit) {
        updateStatusElement(currentGameStatusElem, "block", winColour, "Hit!! - Well Done!");
    } else {
        updateStatusElement(currentGameStatusElem, "block", loseColour, "Missed!!")
    }
}




function transFormGridArea(areas) {
    // modify the gridTemplateAreas css which makes the grid only contains one cell
    cardContainerElement.style.gridTemplateAreas = areas
    
}
function addCardsToGridAreaCell(cellPositionClassName) {
    // select the one cell of the grid and append all cards into that single cell
    const cellPositionElem = document.querySelector(cellPositionClassName)
    cards.forEach((card, index) =>{
        addChildElement(cellPositionElem, card)
    })
}

function flipCard(card, flipToBack) {
    const innerCardElement = card.firstChild;
    // if flipToBack is true and the first child element of the card doesnt have flip-it class
    // then add to it
    if (flipToBack && !innerCardElement.classList.contains('flip-it')) {
        innerCardElement.classList.add('flip-it');
    } else if (innerCardElement.classList.contains('flip-it')){
        innerCardElement.classList.remove('flip-it')
    }
}



function randomiseCardPositions() {
    // generate a random whole number between 1 and4
    const random1 = Math.floor(Math.random() * numeCards) + 1;
    const random2 = Math.floor(Math.random() * numeCards) + 1;
    // swap the elements in the cardPositions array so the position of the cards are randomised
    // cardPositions currently is [1, 2, 3, 4]
    const temp = cardPositions[random1 - 1];
    cardPositions[random1 - 1] = cardPositions[random2 - 1];
    cardPositions[random2 - 1] = temp;
}


function dealCards() {
    //this function will restore the grid to contain four grid cells
    // put card on the result of randomised position
    addCardsToAppropriateCell()
    const areasTemplate = returnGridAreasMappedTpCardPos()
    transFormGridArea(areasTemplate)
}

function addCardsToAppropriateCell() {
    // restore the grid to its orginal state with four cells
    cards.forEach(card => {
        addCardToGridCell(card);
    })
}

function returnGridAreasMappedTpCardPos() {
    // this function generates a grid area template 
    // the grid area template contains a new position configuration for the cells in the grid 
    // based on the random position generated through the shuffle functionality stored within the cardPositions array
    let firstPart = ""
    let secondPart = ""
    let areas = ""

    cards.forEach((card, index) => {
        if(cardPositions[index] == 1)
        {
            areas = areas + "a "
        }
        else if(cardPositions[index] == 2)
        {
            areas = areas + "b "
        }
        else if (cardPositions[index] == 3)
        {
            areas = areas + "c "
        }
        else if (cardPositions[index] == 4)
        {
            areas = areas + "d "
        }
        if (index == 1)
        {
            firstPart = areas.substring(0, areas.length - 1)
            areas = "";
        }
        else if (index == 3)
        {
            secondPart = areas.substring(0, areas.length - 1)
        }

    })

    return `"${firstPart}" "${secondPart}"`


}


function createCards() {
    cardObjectDefinitions.forEach((cardItem)=>{
        createCard(cardItem)
    })
} 

function createCard(cardItem) {
    // create div elements that make up a card using HTML templte below
    // <div class="card">
    // <div class="card-inner">
    //     <div class="card-front">
    //         <img src="./images/card-JackClubs.png" alt="" class="card-img">
    //     </div>

    //     <div class="class-back">
    //         <img src="./images/card-back-Blue.png" alt="" class="card-img">
    //     </div>
    // </div>

    // create card element
    const cardElem = createElement('div');
    // add class and id to the card element
    addClassToElement(cardElem, 'card');
    addIdToElement(cardElem, cardItem.id);

    // create cardInnerElem and add class to it 
    const cardInnerElem = createElement('div');
    addClassToElement(cardInnerElem, 'card-inner');
    
    //create cardFrontElem and add class to it 
    const cardFrontElem = createElement('div');
    addClassToElement(cardFrontElem, 'card-front');

    // create cardBackElem and add class to it
    const cardBackElem = createElement('div');
    addClassToElement(cardBackElem, 'card-back');

    //create front and back image elements for a card
    const cardImgFront = createElement('img');
    const cardImgBack = createElement('img');
    
    // add src attribute and appropriate value to img element - back of card
    addSrcToImgElement(cardImgBack, cardBackImgPath);
    
    // add src attribute and appropriate value to img element - front of card
    addSrcToImgElement(cardImgFront, cardItem.imagePath);

    // add class to cardImgFront and cardImgBack element
    addClassToElement(cardImgFront, 'card-img');
    addClassToElement(cardImgBack, 'card-img');

    // add child elements to parent elements

    // add back img element as child element to cardBackElem
    addChildElement(cardBackElem, cardImgBack);
    // add front img element as child element to cardFrontElem
    addChildElement(cardFrontElem, cardImgFront);
    // add front and back card element as child element to inner card element
    addChildElement(cardInnerElem, cardFrontElem);
    addChildElement(cardInnerElem, cardBackElem);
    // add inner card element to card element
    addChildElement(cardElem, cardInnerElem);
    // add card element as child element to appropriate grid cell
    addCardToGridCell(cardElem);
    // the initial posiiotn of the card is established when the card is created
    initialiseCardPosition(cardElem);
    attachClickEventHanderToCard(cardElem);

}

function attachClickEventHanderToCard(card) {
    // chooseCard method is call whenever a card is clicked
    card.addEventListener("click", () => chooseCard(card))
}

function initialiseCardPosition(card) {
    // cardPositions will updated to [1, 2, 3, 4]
    return cardPositions.push(card.id)
}

function createElement(elemType) {
    // a resuable function to create HTML elements
    return document.createElement(elemType)
}

function addClassToElement(elem, className) {
    return elem.classList.add(className)
}

function addIdToElement(elem, id) {
    return elem.id = id
}

function addSrcToImgElement(imgElem, src) {
    return imgElem.src = src 
}

function addChildElement(parentElem, childElem) {
    return parentElem.appendChild(childElem)
}

function addCardToGridCell(card) {
    const cardPositionClassName = mapCardToGridCell(card);
    // append the card element to div based on its id number
    const cardPositionElem = document.querySelector(cardPositionClassName);
    addChildElement(cardPositionElem, card)
}

function mapCardToGridCell(card) {
    // check card's id and return the class name according to its id number accordingly
    if(card.id == 1) {
        return '.card-pos-a';
    } else if(card.id == 2) {
        return '.card-pos-b';
    } else if(card.id == 3) {
        return '.card-pos-c';
    } else if (card.id == 4){
        return '.card-pos-d';
    }
}