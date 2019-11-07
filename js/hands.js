class Hand {

    constructor () {
        this.cards = [];
        this.value = 0;
        this.wins = 0;
        this.handsPlayed = 0;
        this.ties = 0;
        this.displayEl;
    }


    getCards(deck, amount=1 ) {
        this.cards = this.cards.concat(deck.dealCard(amount));
    };

    copyHand(){
        return this.cards;
    }


    

    show() {
        let str = "";
        this.cards.forEach((e) => { str += "<span style='color: " + e.color +"'>" + e.name + "</span>  " });
        return str;
    };

    

    muck() {
        this.cards = [];
    };

    swapCards( i , j ) {
        this.cards[i] = this.cards.splice( j , 1 , this.cards[i] )[0];
    }

    sort() {
        this.cards.sort( (a,b) =>  { return b.rank - a.rank });
    }

    print(el) {
        el.innerHTML = this.show();
    }

    evaluate() {

        // this.value = evaluateHand(this.cards);

        

        this.sort();
        
        if (this.isStraightFlush()) {
    
        } else if (this.isQuads()) {
    
        } else if (this.isFullHouse()) {
    
        } else if (this.isFlush()) {
    
        } else if (this.isStraight()) {
    
        } else if (this.isTrips()) {
    
        } else if (this.isTwoPair()) {
    
        } else if (this.isPair()) {
    
        } else {
            this.value =  0 + (this.cards[0].rank * 100)  + (this.cards[1].rank) + (this.cards[2].rank * .01) + (this.cards[3].rank * .0001) + (this.cards[4].rank * .000001);
        }
    }

    isPair() {
        for (let i = 0; i < this.cards.length; i++) {
            for (let j = i + 1; j < this.cards.length; j++) {
                if (this.cards[i].rank === this.cards[j].rank) {
                    this.cards.unshift(this.cards.splice(i, 1)[0]);
                    this.cards.unshift(this.cards.splice(j, 1)[0]);
                    this.value = 10000 + (this.cards[0].rank * 100)  + (this.cards[2].rank) + (this.cards[3].rank * .01) + (this.cards[4].rank * .0001);
                    return true;
                }
            }
        }
    }

    isTwoPair() {
        for (let i = 0; i < this.cards.length-1 ; i++) {

            if (this.cards[i].rank === this.cards[i+1].rank) {

                for (let j = i+2; j < this.cards.length-1; j++) {

                    if (this.cards[j].rank === this.cards[j+1].rank) {

                        this.cards.unshift(this.cards.splice(i  , 1)[0]);
                        this.cards.unshift(this.cards.splice(i+1, 1)[0]);            
                        this.cards.splice(2,0,this.cards.splice(j  , 1)[0]);            
                        this.cards.splice(2,0,this.cards.splice(j+1, 1)[0]);

                        this.value = 20000 + (this.cards[0].rank * 100)  + (this.cards[2].rank) + (this.cards[4].rank * .01);                        
                        
                        return true;
                    }
                }
            }
        }
    }
    
    isTrips() {
        for (let i = 0; i < this.cards.length-2; i++) {

            if (this.cards[i].rank === this.cards[i+1].rank && this.cards[i].rank === this.cards[i+2].rank) {

                this.cards.unshift(this.cards.splice(i, 1)[0]);
                this.cards.unshift(this.cards.splice(i+1, 1)[0]);
                this.cards.unshift(this.cards.splice(i+2, 1)[0]);

                this.value = 30000 + (this.cards[0].rank * 100)  + (this.cards[3].rank) + (this.cards[4].rank * .01);
                return true;
            }
        }
    }

    isStraight() {

        for ( let i = 0; i < this.cards.length-3; i++ ) {
            let straightLength = 1;

            for ( let j = i+1; j < this.cards.length; j++) {
                if (this.cards[i].rank === this.cards[j].rank ) {
                    // do nothing
                } else if ( this.cards[i].rank - this.cards[j].rank === 1) {
                    straightLength++;

                    if ( straightLength === 5 ) {
                        this.value = 40000 + (this.cards[j].rank + 4 * 100);
                        return true;
                    }
        
                    if (straightLength === 4 && this.cards[j].rank === 2 && this.cards[0].rank === 14) {
                        this.value = 40500;
                        return true;
                    }        
                    i = j;

                } else {
                    j = this.cards.length;
                    straightLength = 1;
                }
                
            }

        }
    }


    isFlush() {

        let multiplier = 100;
        let allSuits = [ "spade", "heart", "diamond", "club" ];

        for( let i=0; i<allSuits.length; i++) {
            if( this.cards.filter( e => e.suit === allSuits[i]).length > 4 ) {

                this.value = 50000;
                let cardCount = 1;
                this.cards.forEach( ( e ) => { 
                    if (e.suit === allSuits[i] && cardCount <= 5) {
                        this.value += e.rank * multiplier;
                        multiplier /= 100;
                        cardCount++;
                    }
                });
                return true;
            }
        }
    }

    isFullHouse() {
        for (let i = 0; i < this.cards.length-2; i++) {

            if (this.cards[i].rank === this.cards[i+1].rank && this.cards[i].rank === this.cards[i+2].rank) {

                this.cards.unshift(this.cards.splice(i, 1)[0]);
                this.cards.unshift(this.cards.splice(i+1, 1)[0]);
                this.cards.unshift(this.cards.splice(i+2, 1)[0]);

                for( let j=3; j < this.cards.length -1; j++) {

                    if( this.cards[j].rank === this.cards[j+1].rank) {

                        this.value = 60000 + (this.cards[0].rank * 100)  + (this.cards[j].rank);
                        return true;
                    }
                }
            }            
        }
        this.sort();
    }
    
    isQuads() {
        for (let i = 0; i < this.cards.length-3; i++) {

            if (this.cards[i].rank === this.cards[i+1].rank && this.cards[i+2].rank === this.cards[i+3].rank  && this.cards[i].rank === this.cards[i+3].rank ) {
                
                if (i > 0) {
                this.value = 70000 + (this.cards[i].rank * 100) + (this.cards[0].rank)
                return true;
                } else {
                    this.value = 70000 + (this.cards[0].rank * 100) + (this.cards[4].rank)
                    return true;
                    }
            }
        }
    }


    isStraightFlush() {
        let consecutiveRank = []; //used to index the rank of possible straight flush cards
        let consecutiveIndex = []; //used to index the position, in the hand, of possible straight flush cards
        let suit; //holds the suit that is currently being evaluated
    
        //indexs a card to begin checking for straight flush
        for (let i = 0; i < this.cards.length-3; i++) {
            consecutiveRank.push(this.cards[i].rank);
            consecutiveIndex.push(i);
            suit = this.cards[i].suit;
            //compares each following card to see if it is the next ranking card and of same suit and indexs that cards rank a poistion
            for (let j = i + 1; j < this.cards.length; j++) {
                if (consecutiveRank[consecutiveRank.length - 1] - this.cards[j].rank === 1 && suit === this.cards[j].suit) {
                    consecutiveRank.push(this.cards[j].rank);
                    consecutiveIndex.push(j);
                }
            }
    
            //if 5 or more cards were indexed then a straight flush is confirmed
            if (consecutiveRank.length >= 5) {
                //starting at the end of the hand, each card that is not indexed will be moved to the end of the hand and out of the way
                //the remaining cards will the straight flush, in order, at the front of the hand
                for (let a = this.cards.length - 1; a >= 0; a--) {
                    if (!consecutiveIndex.includes(a)) {
                        this.cards.push(this.cards.splice(a, 1)[0]);
                    }
                }
                this.value = 80000 + (this.cards[0].rank * 100);
                return true;
                //Ace only has a rank of 14 so this is to check if an Ace can be used as a low in an A - 5 straight
                //this evalates if there is a 4 card straight (2-3-4-5) and checks to see if there is an Ace to complete the straight
            } else if (consecutiveRank.length === 4 && this.cards[consecutiveIndex[3]].rank === 2) {
    
                //since there are 3 remaing cards each one needs to be checked to see if they are the Ace of the proper suit to complete the straight flush
                for (let b = 0; b < 3; b++) {
                    if (this.cards[b].rank === 14 && this.cards[b].suit === suit) {
                        //if found we remove the nonindexed (nonstraightflush) cards from the hand starting at the end of the hand
                        for (let a = this.cards.length - 1; a >= 0; a--) {
                            if (!consecutiveIndex.includes(a)) {
                                this.cards.push(this.cards.splice(a, 1)[0]);
                            }
    
                        }
                        //the ace was never indexed so this moves the the ace into position
                        this.cards.splice(4, 0, this.cards.splice(this.cards.length - 1 - b, 1)[0]);
                        this.value = 80000 + (this.cards[0].rank * 100);
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
    }
}