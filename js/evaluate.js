
const sortRestOfHand = (hand, startingIndex ) => {
    for( let i = startingIndex ; i < hand.length  ; i++ ) {
        for( let j = i+1 ; j < hand.length ; j++ ) {
            if ( hand[i].rank < hand[j].rank ) {
                hand[i] = hand.splice( j , 1 , hand[i] )[0];
            }
        }
    }
};

//evaluates if you have a single pair in your hand
//then moves that pair to front of the hand and
//sorts the rest of the hand by rank (high to low)
const isPair = (hand) => {
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (hand[i].rank === hand[j].rank) {
                hand.unshift(hand.splice(i, 1)[0]);
                hand.unshift(hand.splice(j, 1)[0]);
                sortRestOfHand(hand, 2);
                return true;
            }
        }
    }
};


//evaluates hand to see if you have two pairs
const isTwoPair = (hand) => {
    //sorting the whole hand ensures that the first pair we find will be the largesst;
    sortRestOfHand(hand, 0);
    //1. checks for 1 pair and moves it to the front of the hand
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (hand[i].rank === hand[j].rank) {
                hand.unshift(hand.splice(i, 1)[0]);
                hand.unshift(hand.splice(j, 1)[0]);
                //2. checks for a 2nd pair and moves them after the first pair
                //remainder of the deck is still sorted by rank
                for (let a = 2; a < hand.length; a++) {
                    for (let b = a + 1; b < hand.length; b++) {
                        if (hand[a].rank === hand[b].rank) {
                            hand.splice(2, 0, hand.splice(a, 1)[0]);
                            hand.splice(3, 0, hand.splice(b, 1)[0]);
                            return true;
                        }
                    }
                }
            }
        }
    }
};


//evalutes hand to see if it has three of a kind
const isTrips = (hand) => {
    //sorting the hand insures that set pair we find will be the largest pair in the hand  
    sortRestOfHand(hand, 0);       
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            for (let a = j + 1; a < hand.length; a++) {
                if (hand[i].rank === hand[j].rank && hand[j].rank === hand[a].rank) {
                    //moves the 3 of a kind to the front of the hand and sorts the remainder of the cards (high to low)
                    hand.unshift(hand.splice(i, 1)[0]);
                    hand.unshift(hand.splice(j, 1)[0]);
                    hand.unshift(hand.splice(a, 1)[0]);
                    sortRestOfHand(hand, 3)
                    return true;
                }
            }
        }
    }
    //return false;

};


//checks to see if there is a straight
const isStraight = (hand) => {
    let consecutiveRank = []; //used to load possible straight rankings from hand
    let consecutiveIndex = []; //used to load position of cards that might by part of a straight
    sortRestOfHand(hand, 0); //sorts entire hand by rank (high to low)

    //loads first cards info into index's 
    for (let i = 0; i < hand.length; i++) {
        consecutiveRank.push(hand[i].rank);
        consecutiveIndex.push(i);
        //looks through remaining cards and adds them to index's if they are 1 rank higher than the previously indexed card
        for (let j = i + 1; j < hand.length; j++) {
            if (consecutiveRank[consecutiveRank.length - 1] - hand[j].rank === 1) {
                consecutiveRank.push(hand[j].rank);
                consecutiveIndex.push(j);
            }
        }
        //if indexs have 5 cards info them there is a confirmed straight
        if (consecutiveRank.length >= 5) {
            //starts at end of hand a pulls every card not indexed out and moves it to end of the deck
            //the remaining cards will be the 5 card straight (in order) at the begining of the hand
            for (let a = hand.length - 1; a >= 0; a--) {
                if (!consecutiveIndex.includes(a)) {
                    hand.push(hand.splice(a, 1)[0]);
                }
            }
            return true;
            //Ace only has a rank of 14 so this is to check if an Ace can be used as a low in an A - 5 straight
            //this evalates if there is a 4 card straight (2-3-4-5) and checks to see if there is an Ace to complete the straight
        } else if (consecutiveRank.length === 4 && hand[consecutiveIndex[3]].rank === 2 && hand[0].rank === 14) {
            //starts at end of hand a pulls every card not indexed out and moves it to end of the deck
            for (let a = hand.length - 1; a >= 0; a--) {
                if (!consecutiveIndex.includes(a)) {
                    hand.push(hand.splice(a, 1)[0]);
                }
            }
            //moves the nonindexed Ace into postion in the hand
            hand.splice(4, 0, hand.pop());
            return true;

        } else {
            //if the index's length is less than 5 then this clears the indexs to be used again starting at the next card
            consecutiveRank = [];
            consecutiveIndex = [];
        }
    }
};

//evaluates the possibility of a flush
const isFlush = (hand) => {
    let spades = 0;
    let hearts = 0;
    let diamonds = 0;
    let clubs = 0;

    //adds up the total number of each suit
    hand.forEach((e) => {
        if (e.suit === "spade") {
            spades += 1;
        } else  if (e.suit === "heart") {
            hearts += 1;
        } else  if (e.suit === "club") {
            clubs += 1;
        } else  if (e.suit === "diamond") {
            diamonds += 1;
        }
    });
    //if a hand contains more than 4 of any suit then a flush is established
    //first the hand is sorted by rank (high to low)
    //then, starting at the end of the deck, each non flush suit is removed and placed at the end of the deck
    //the remaining flush will be at the begining of the hand in order of rank (high to low)
    if (spades > 4) {
        sortRestOfHand(hand, 0);
        for (let i = hand.length - 1; i >= 0; i--) {
            if (hand[i].suit !== "spade") {
                hand.push(hand.splice(i, 1)[0]);
            }
        }
        return true;
    } else if (diamonds > 4) {
        sortRestOfHand(hand, 0);
        for (let i = hand.length - 1; i >= 0; i--) {
            if (hand[i].suit !== "diamond") {
                hand.push(hand.splice(i, 1)[0]);
            }
        }
        return true;
    } else if (hearts > 4) {
        sortRestOfHand(hand, 0);
        for (let i = hand.length - 1; i >= 0; i--) {
            if (hand[i].suit !== "heart") {
                hand.push(hand.splice(i, 1)[0]);
            }
        }
        return true;
    } else if (clubs > 4) {
        sortRestOfHand(hand, 0);
        for (let i = hand.length - 1; i >= 0; i--) {
            if (hand[i].suit !== "club") {
                hand.push(hand.splice(i, 1)[0]);
            }
        }
        return true;
    } 
};

//evaluates hand for a possible Full House
const isFullHouse = (hand) => {
    //sorting the hand insures that any set we find will be the largest set in the hand
    sortRestOfHand(hand, 0);
    //first it checks for three of a kind
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            for (let a = j + 1; a < hand.length; a++) {
                //if found it moves them to the beginning of the hand
                if (hand[i].rank === hand[j].rank && hand[j].rank === hand[a].rank) {
                    hand.unshift(hand.splice(i, 1)[0]);
                    hand.unshift(hand.splice(j, 1)[0]);
                    hand.unshift(hand.splice(a, 1)[0]);
                    //sorting the hand insures that any pair we find will be the largest pair in the hand  
                    sortRestOfHand(hand, 3);       
                    //then it starts at the 4th card and checks for a pair
                    for (let b = 3; b < hand.length; b++) {
                        for (let d = b + 1; d < hand.length; d++) {
                            //if found it moves them after the three of a kind and returns a true value
                            if (hand[b].rank === hand[d].rank) {
                                hand.splice(3, 0, hand.splice(b, 1)[0]);
                                hand.splice(4, 0, hand.splice(d, 1)[0]);
                                return true;
                            }
                        }
                    }

                }
            }
        }
    }
};

//evaluates hand for Four of a kind
const isQuads = (hand) => {
    //checks for 4 of a kind
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            for (let a = j + 1; a < hand.length; a++) {
                for (let b = a + 1; b < hand.length; b++) {
                    //if found it moves them to the front of the hand and sorts the remaining cards by rank (high to low)
                    if (hand[i].rank === hand[j].rank && hand[b].rank === hand[a].rank && hand[i].rank === hand[a].rank) {
                        hand.unshift(hand.splice(i, 1)[0]);
                        hand.unshift(hand.splice(j, 1)[0]);
                        hand.unshift(hand.splice(a, 1)[0]);
                        hand.unshift(hand.splice(b, 1)[0]);
                        sortRestOfHand(hand, 4);
                        return true;
                    }
                }
            }
        }
    }
};

//evalates hand for a straight flush
const isStraightFlush = (hand) => {
    let consecutiveRank = []; //used to index the rank of possible straight flush cards
    let consecutiveIndex = []; //used to index the position, in the hand, of possible straight flush cards
    let suit; //holds the suit that is currently being evaluated
    sortRestOfHand(hand, 0); //sorts hand by rank (high to low)

    //indexs a card to begin checking for straight flush
    for (let i = 0; i < hand.length; i++) {
        consecutiveRank.push(hand[i].rank);
        consecutiveIndex.push(i);
        suit = hand[i].suit;
        //compares each following card to see if it is the next ranking card and of same suit and indexs that cards rank a poistion
        for (let j = i + 1; j < hand.length; j++) {
            if (consecutiveRank[consecutiveRank.length - 1] - hand[j].rank === 1 && suit === hand[j].suit) {
                consecutiveRank.push(hand[j].rank);
                consecutiveIndex.push(j);
            }
        }

        //if 5 or more cards were indexed then a straight flush is confirmed
        if (consecutiveRank.length >= 5) {
            //starting at the end of the hand, each card that is not indexed will be moved to the end of the hand and out of the way
            //the remaining cards will the straight flush, in order, at the front of the hand
            for (let a = hand.length - 1; a >= 0; a--) {
                if (!consecutiveIndex.includes(a)) {
                    hand.push(hand.splice(a, 1)[0]);
                }
            }
            return true;
            //Ace only has a rank of 14 so this is to check if an Ace can be used as a low in an A - 5 straight
            //this evalates if there is a 4 card straight (2-3-4-5) and checks to see if there is an Ace to complete the straight
        } else if (consecutiveRank.length === 4 && hand[consecutiveIndex[3]].rank === 2) {

            //since there are 3 remaing cards each one needs to be checked to see if they are the Ace of the proper suit to complete the straight flush
            for (let b = 0; b < 3; b++) {
                if (hand[b].rank === 14 && hand[b].suit === suit) {
                    //if found we remove the nonindexed (nonstraightflush) cards from the hand starting at the end of the hand
                    for (let a = hand.length - 1; a >= 0; a--) {
                        if (!consecutiveIndex.includes(a)) {
                            hand.push(hand.splice(a, 1)[0]);
                        }

                    }
                    //the ace was never indexed so this moves the the ace into position
                    hand.splice(4, 0, hand.splice(hand.length - 1 - b, 1)[0]);
                    return true;
                } else {

                    consecutiveRank = [];
                    consecutiveIndex = [];
                    suit = "";
                }
            }
        } else {
            //if no straight flush was found this clears the indexs to be used again begining with the next card in the hand
            consecutiveRank = [];
            consecutiveIndex = [];
            suit = "";
        }
    }

};


//this evalutes a hand looking for its strength starting with the strongest possibility and then looking for weaker ones
const evaluateHand = (hand) => {

    if (isStraightFlush(hand)) {
        return 80000 + (hand[0].rank * 100);

    } else if (isQuads(hand)) {
        return 70000 + (hand[0].rank * 100) + (hand[4].rank);

    } else if (isFullHouse(hand)) {
        return 60000 + (hand[0].rank * 100) + (hand[3].rank);

    } else if (isFlush(hand)) {
        return 50000 + (hand[0].rank * 100)  + (hand[1].rank) + (hand[2].rank * .01) + (hand[3].rank * .0001) + (hand[4].rank * .000001);

    } else if (isStraight(hand)) {
        return 40000 + (hand[0].rank * 100);

    } else if (isTrips(hand)) {
        return 30000 + (hand[0].rank * 100)  + (hand[3].rank) + (hand[4].rank * .01);

    } else if (isTwoPair(hand)) {
        return 20000 + (hand[0].rank * 100)  + (hand[2].rank) + (hand[4].rank * .01);

    } else if (isPair(hand)) {
        return 10000 + (hand[0].rank * 100)  + (hand[2].rank) + (hand[3].rank * .01) + (hand[4].rank * .0001);

    } else {
        return 0 + (hand[0].rank * 100)  + (hand[1].rank) + (hand[2].rank * .01) + (hand[3].rank * .0001) + (hand[4].rank * .000001);
    }
};

const tieBreaker = (hand1, hand2) => {
    for (let i = 0; i < 5; i++) {
        if (hand1.cards[i].rank > hand2.cards[i].rank) {
            hand1.value += .5;
            return;
        } else if (hand1.cards[i].rank < hand2.cards[i].rank) {
            hand2.value += .5;
            return;
        }
    }
};






