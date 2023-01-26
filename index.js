const cardObjectDefinitions = [
    {id:1, imagePath:'/images/card-KingHearts.png'},
    {id:2, imagePath:'/images/card-JackClubs.png'},
    {id:3, imagePath:'/images/card-QueenDiamonds.png'},
    {id:4, imagePath:'/images/card-AceSpades.png'},

];

const cardBackImgPath = '/images/card-back-Blue.png';

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
    
    // add src attribute and appropriate value to img element - back of card
    addSrcToImgElement(cardImgBack, cardBackImgPath);
    
    // add src attribute and appropriate value to img element - front of card
    addSrcToImgElement(cardImgFront, cardElem.imagePath);

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
    addChildElement(cardInnerElem, cardElem);


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