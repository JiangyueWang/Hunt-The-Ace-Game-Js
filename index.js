const cardObjectDefinitions = [
    {id:1, imagePath:'/images/card-KingHearts.png'},
    {id:2, imagePath:'/images/card-JackClubs.png'},
    {id:3, imagePath:'/images/card-QueenDiamonds.png'},
    {id:4, imagePath:'/images/card-AceSpades.png'},

];

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
    const cardElem = createElement('div');
    const cardInnerElem = createElement('div');
    const cardFrontElem = createElement('div');
    const cardBackElem = createElement('div');

    //create front and back image elements for a card
    const cardImgFront = createElement('img');
    const cardImgBack = createElement('img');


}

function createElement(elemType) {
    // a resuable function to create HTML elements
    return document.createElement(elemType)
}

function addClassToElement(elem, className) {
    return elem.classList.add(className)
}

