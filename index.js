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

loadGame();

function loadGame() {
    // when the game loads, the cards will be created on the grid
    createCards();
    // assigned All the cardElements created to casrds variable 
    cards = document.querySelectorAll('.card');
    // add click event handler to the play game button, once play game button clicked, startGame function activates
    playGameButtonElement.addEventListener('click', () => startGame() )

}

function startGame() {
    // when user click Play Game button, the game will start
    initialiseNewGame();
    startRound();
}

function initialiseNewGame() {

}

function startRound() {
    initialiseNewRound();
    collectCards();
    flipCards(true);
}

function initialiseNewRound() {

}

function collectCards() {
    // when the round starts, the grid will collapse into one cell and all cards will stack
    transFormGridArea(collapseGridAreaTemp);
    addCardsToGridAreaCell(cardCollectionCellClass);
}

function transFormGridArea(areas) {
    // modify the gridTemplateAreas css which makes the grid only contains one cell
    cardContainerElement.style.gridTemplateAreas = areas
    
}
function addCardsToGridAreaCell(cellPositionClassName) {
    const cellPositionElem = document.querySelector(cellPositionClassName)
    cards.forEach((card, index) =>{
        addChildElement(cellPositionElem, card)
    })
}

function flipCard(card, flipToBack) {
    const innerCardElement = card.firstChild;
    if (flipToBack && !innerCardElement.classList.contains('flip-it')) {
        innerCardElement.classList.add('flip-it');
    } else if (innerCardElement.classList.contains('flip-it')){
        innerCardElement.classList.remove('flip-it')
    }
}

function flipCards(flipToBack) {
    cards.forEach((card, index) => {
        setTimeout(() => {
            flipCard(card, flipToBack);
        }, index * 400)
    })
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
    const cardPositionElem = document.querySelector(cardPositionClassName);
    addChildElement(cardPositionElem, card)
}

function mapCardToGridCell(card) {
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