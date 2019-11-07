const allResultsDisplay = document.querySelectorAll(".results");
const h1 = document.querySelector("h1");
const runButton = document.querySelector("#run");
const monteButton = document.querySelector("#monteCarlo");
const selection = document.querySelector(".hand-selection");
const heroDisplay = document.querySelector("#hero");
const menu = document.querySelector("#menu");
const allHandDisplays = document.querySelectorAll(".hand");


let newDeck = new Deck;
let deckStub = new Deck; 
let deck = new Deck;

const board = new Hand;
const heroHand = new Hand;
const villian1Hand = new Hand;
const villian2Hand = new Hand;
const villian3Hand = new Hand;
const villian4Hand = new Hand;
const villian5Hand = new Hand;

let timesrun = 0;
let monteRunning = false;
let usedCards = [];
let displayFocus = heroDisplay;
let handFocusIndex = 0;
let allHands = [heroHand, villian1Hand, villian2Hand, villian3Hand, villian4Hand, villian5Hand, board];




/*----------------------------------------------------------------------------------------------------
FUNCTIONS
-----------------------------------------------------------------------------------------------------*/



//combines each hand with the board and evaluates the hand and assigns each hand a value
//then it searches for the highest value of all hands and assigns a win or tie as needed to the winning hands
//finally it removes the value and adds 1 to the hands played for all hands
const compare = () => {

    for(let i=0; i<allHands.length -1 ; i++ ) {

        if (allHands[i].cards.length > 0 ) {

            Array.prototype.push.apply(allHands[i].cards, board.cards);
            allHands[i].evaluate();
            allHands[i].cards = allHands[i].cards.filter( e => !board.cards.includes(e) );
        }
    }

    let winningValue = Math.max.apply(Math, allHands.map( obj => obj.value ));
    let numOfWinningHands = allHands.filter( e => e.value === winningValue);

    if (numOfWinningHands.length > 1) {
        numOfWinningHands.forEach( e => e.ties++);
    } else {
        numOfWinningHands.forEach( e => e.wins++);
    }
    
    allHands.forEach( (e) => {
        e.value = 0; 
        e.handsPlayed++;
    });

};

// creates a deck stub consisting of all cards not currently in use
// systematically creates every possible board texture and passes that to the  compare function
// finally it displays the results    
const run = () => {
    clearResults();
    runButton.innerText = "...running";
    deckStub = new Deck;
    deckStub.cards = deckStub.cards.filter( e=> ! usedCards.includes(parseInt(e.identifier)));

    setTimeout( () => { 

        if ( board.cards.length < 5 ) {

            for(let i=0; i<deckStub.cards.length; i++) {

                console.log(deckStub.cards[i]);

                board.cards.push(deckStub.copyCard(i));

                if(board.cards.length === 5) {

                    compare();
                    board.cards.pop();

                } else {

                    for(let j=i+1; j<deckStub.cards.length; j++) {

                        board.cards.push(deckStub.copyCard(j));

                        if(board.cards.length === 5) {

                            compare();
                            board.cards.pop();

                        } else {

                            for(let a=j+1; a<deckStub.cards.length; a++) {

                                board.cards.push(deckStub.copyCard(a));

                                if(board.cards.length === 5) {

                                    compare();
                                    board.cards.pop();

                                } else {

                                    for(let b=a+1; b<deckStub.cards.length; b++) {

                                        board.cards.push(deckStub.copyCard(b));

                                        if(board.cards.length === 5) {

                                            compare();
                                            board.cards.pop();

                                        } else {

                                            for(let c=b+1; c<deckStub.cards.length; c++) {

                                                board.cards.push(deckStub.copyCard(c));

                                                if(board.cards.length === 5) {

                                                    compare();
                                                    board.cards.pop();
                                                }
                                            }
                                            board.cards.pop();
                                        }
                                    }
                                    board.cards.pop();
                                }
                            }
                            board.cards.pop();
                        }
                    }
                    board.cards.pop();
                }
            }
        } else {
            compare();
        }
        displayResults();
        runButton.innerText = "Run"

    }, 0);
};


// loops through every hand and displays its win and tie percentage
const displayResults = () => {
    for ( let i = 0; i < allHands.length - 1; i++) {
        if ( allHands[i].cards.length > 0 ) {
            allResultsDisplay[i].innerHTML = "win: " + ((allHands[i].wins / allHands[i].handsPlayed)*100).toFixed(2) + "<br>" +
                                             "tie: " + ((allHands[i].ties / allHands[i].handsPlayed)*100).toFixed(2);
        }
    }
}

//creates a random board from remaining cards to be used in the compare function
// then it displays results and removes the random cards from the board
// it repeats this 300 times everytime its called
const monteCarlo = () => {

    for(let i = 0; i<300 ; i++) {

        let cardsNeeded = 5 -  board.cards.length;

        for (let i = 0; i<cardsNeeded; i++) {

            let randomIndex;

            do {

            randomIndex = Math.floor(Math.random()*52);

            } while (usedCards.includes(randomIndex))

            board.cards.push(newDeck.copyCard(randomIndex));
            usedCards.push(parseInt(randomIndex)); 
        }
        compare();
        displayResults();

        for ( let i = 0; i < cardsNeeded; i++) {

            usedCards.pop();
            board.cards.pop();
        }

        timesrun++;
}

};

// checks to see if this process is already running and will stop or start the action accordingly
// this function runs random comparisons and continually updates the results so the user can see roughly the 
// percentages without having to wait 20 seconds for the results
const runMonteCarlo = () => {

    
    if(!monteRunning) {

        clearResults();
        monteButton.innerText = "STOP";

        setTimeout( () => { 

        monteRunning = setInterval(monteCarlo, 1);

        }, 0);

    } else {
        stopMonteCarlo();
    }
};

// stops monteCarlo from running
const stopMonteCarlo = () => {

    clearInterval(monteRunning);
    monteButton.innerText = "MonteCarlo";
    monteRunning = false;

}


//clears everything including results and all cards from every hand and board
//also stops MonteCarlo is running
const clearAll = () => {

    stopMonteCarlo();

    clearResults();

    allHands.forEach( (e) => {
        e.cards = [];
    });

    allHandDisplays.forEach( e => e.innerHTML =  "");

    document.querySelectorAll("#menu button").forEach( e => e.classList = "");

    usedCards = [];
};


// clears the results form every hand but leaves the cards in place
const clearResults = () => {

    allHands.forEach( (e) => {
        e.wins = 0;
        e.ties = 0;
        e.handsPlayed = 0;
    });

    allResultsDisplay.forEach( e => e.innerHTML = "");    
}


/*----------------------------------------------------------------------------------------------------
PROCESSES
-----------------------------------------------------------------------------------------------------*/

// creates the display of cards by creating a new element and placing the cards name inside the element
// it also gives each element a value that corresponds to each cards identifier to help link each element to its exact card in a deck
for( let i=0; i<deck.cards.length; i++ ) {
    
    let div = document.createElement("button");
    div.innerHTML = deck.cards[i].name;
    div.value = i;
    div.style.color = deck.cards[i].color;
    menu.appendChild(div);
}


/*----------------------------------------------------------------------------------------------------
EVENT LISTENERS
-----------------------------------------------------------------------------------------------------*/
//sets the focus on the hand that was clicked
//first it removes class 'focused' from all hands
//then it adds that class to the target of the click
//it sets the display focus to the target of the click
//it removes all 'inFocusedHand' classes and adds that class to any card that is already in the targets hand

allHandDisplays.forEach( obj => obj.addEventListener ("click",  e => {

    if(e.currentTarget.classList.contains("hand") ) {

        allHandDisplays.forEach( (object) => object.classList.remove("focus") ); //removes the focus class for each hand
        e.currentTarget.classList += " focus"; //adds focus class to selected hand
        handFocusIndex = parseInt(e.currentTarget.value); //makes the handfocusIndex equal to hand associated with the display
        displayFocus = e.currentTarget; //sets the displayFocus on the hand selected
        document.querySelectorAll(".used").forEach( el => el.classList.remove("inFocusedHand"));
        document.querySelectorAll("#menu button").forEach ( (el) => { 

            allHands[handFocusIndex].cards.forEach( (obj) => {

                if( obj.identifier === parseInt(el.value)) {

                    el.classList += " inFocusedHand";
                }
            });

        });
    }

}));

// listens for clicks on our card display that we created earlier
// adds that coorisponding card to the hand or board that currently has focus
// adds the classes 'used' and 'inFocusedHand' to the card in the display and displays the cards name in focused hand
// if the card is already in the focused hand then that card is removed from the hand
menu.addEventListener("click", (e) => {
    if ( !e.target.classList.contains("used") && allHands[handFocusIndex].cards.length < 2 ) {

        allHands[handFocusIndex].cards.push(newDeck.copyCard(e.target.value));
        usedCards.push(parseInt(e.target.value)); 
        e.target.classList += " used inFocusedHand";
        allHands[handFocusIndex].print(displayFocus);
        
    }  else if(!e.target.classList.contains("used") && allHands[handFocusIndex].cards.length < 5 && displayFocus.value == 6) {

        allHands[handFocusIndex].cards.push(newDeck.copyCard(e.target.value));
        usedCards.push(parseInt(e.target.value)); 
        e.target.classList += " used inFocusedHand";
        allHands[handFocusIndex].print(displayFocus);

    }  else if (allHands[handFocusIndex].cards.some( obj => obj.identifier == parseInt(e.target.value) )) {

        e.target.classList.remove("used");
        e.target.classList.remove("inFocusedHand");
        allHands[handFocusIndex].cards = allHands[handFocusIndex].cards.filter( obj => obj.identifier != e.target.value);
        allHands[handFocusIndex].print(displayFocus);
        usedCards = usedCards.filter( obj => obj != e.target.value);
    }
});



