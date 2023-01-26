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

    // create card element
    const cardElem = createElement('div');
    // add class and id to the card element
    addClassToElement(cardElem, 'card');
    addIdToElement(cardElem, cardElem.id);

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