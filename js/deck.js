class Deck {

    copyCard(index){
        return cards[index];
    }


    constructor() {

        this.cards = [
            { name: "A&hearts;", color: "red", rank: 14, suit: "heart", identifier: 0 , img: "url(../img/cards/h14.png)" },
            { name: "K&hearts;", color: "red" , rank: 13, suit: "heart", identifier: 1 , img:"url(../img/cards/h13.png)" },
            { name: "Q&hearts;", color: "red" , rank: 12, suit: "heart", identifier: 2 , img:"url(../img/cards/h12.png)" },
            { name: "J&hearts;", color: "red" , rank: 11, suit: "heart", identifier: 3 , img:"url(../img/cards/h11.png)" },
            { name: "10&hearts;", color: "red" , rank: 10, suit: "heart", identifier: 4 , img:"url(../img/cards/h10.png)" },
            { name: "9&hearts;", color: "red" , rank: 9, suit: "heart", identifier: 5 , img:"url(../img/cards/h09.png)" },
            { name: "8&hearts;", color: "red" , rank: 8, suit: "heart", identifier: 6 , img:"url(../img/cards/h08.png)" },
            { name: "7&hearts;", color: "red" , rank: 7, suit: "heart", identifier: 7 , img:"url(../img/cards/h07.png)" },
            { name: "6&hearts;", color: "red" , rank: 6, suit: "heart", identifier: 8 , img:"url(../img/cards/h06.png)" },
            { name: "5&hearts;", color: "red" , rank: 5, suit: "heart", identifier: 9, img:"url(../img/cards/h05.png)"   },
            { name: "4&hearts;", color: "red" , rank: 4, suit: "heart", identifier: 10, img:"url(../img/cards/h04.png)"  },
            { name: "3&hearts;", color: "red" , rank: 3, suit: "heart", identifier: 11, img:"url(../img/cards/h03.png)"  },
            { name: "2&hearts;", color: "red" , rank: 2, suit: "heart", identifier: 12, img:"url(../img/cards/h02.png)"  },
        
            { name: "A&spades;", color: "black", rank: 14, suit: "spade", identifier: 13, img:"url(../img/cards/s14.png)"  },
            { name: "K&spades;", color: "black", rank: 13, suit: "spade", identifier: 14, img:"url(../img/cards/s13.png)"  },
            { name: "Q&spades;", color: "black", rank: 12, suit: "spade", identifier: 15, img:"url(../img/cards/s12.png)"  },
            { name: "J&spades;", color: "black", rank: 11, suit: "spade", identifier: 16, img:"url(../img/cards/s11.png)"  },
            { name: "10&spades;", color: "black", rank: 10, suit: "spade", identifier: 17, img:"url(../img/cards/s10.png)"  },
            { name: "9&spades;", color: "black", rank: 9, suit: "spade", identifier: 18, img:"url(../img/cards/s09.png)" },
            { name: "8&spades;", color: "black", rank: 8, suit: "spade", identifier: 19, img:"url(../img/cards/s08.png)"  },
            { name: "7&spades;", color: "black", rank: 7, suit: "spade", identifier: 20, img:"url(../img/cards/s07.png)"  },
            { name: "6&spades;", color: "black", rank: 6, suit: "spade", identifier: 21, img:"url(../img/cards/s06.png)"  },
            { name: "5&spades;", color: "black", rank: 5, suit: "spade", identifier: 22, img:"url(../img/cards/s05.png)"  },
            { name: "4&spades;", color: "black", rank: 4, suit: "spade", identifier: 23, img:"url(../img/cards/s04.png)"  },
            { name: "3&spades;", color: "black", rank: 3, suit: "spade", identifier: 24, img:"url(../img/cards/s03.png)"  },
            { name: "2&spades;", color: "black", rank: 2, suit: "spade", identifier: 25, img:"url(../img/cards/s02.png)"  },
        
            { name: "A&#9830;", color: "blue", rank: 14, suit: "diamond", identifier: 26, img:"url(../img/cards/d14.png)"  },
            { name: "K&#9830;", color: "blue", rank: 13, suit: "diamond", identifier: 27, img:"url(../img/cards/d13.png)"  },
            { name: "Q&#9830;", color: "blue", rank: 12, suit: "diamond", identifier: 28, img:"url(../img/cards/d12.png)"  },
            { name: "J&#9830;", color: "blue", rank: 11, suit: "diamond", identifier: 29, img:"url(../img/cards/d11.png)"  },
            { name: "10&#9830;", color: "blue", rank: 10, suit: "diamond", identifier: 30, img:"url(../img/cards/d10.png)"  },
            { name: "9&#9830;", color: "blue", rank: 9, suit: "diamond", identifier: 31, img:"url(../img/cards/d09.png)"  },
            { name: "8&#9830;", color: "blue", rank: 8, suit: "diamond", identifier: 32, img:"url(../img/cards/d08.png)"  },
            { name: "7&#9830;", color: "blue", rank: 7, suit: "diamond", identifier: 33, img:"url(../img/cards/d07.png)"  },
            { name: "6&#9830;", color: "blue", rank: 6, suit: "diamond", identifier: 34, img:"url(../img/cards/d06.png)"  },
            { name: "5&#9830;", color: "blue", rank: 5, suit: "diamond", identifier: 35, img:"url(../img/cards/d05.png)"  },
            { name: "4&#9830;", color: "blue", rank: 4, suit: "diamond", identifier: 36, img:"url(../img/cards/d04.png)"  },
            { name: "3&#9830;", color: "blue", rank: 3, suit: "diamond", identifier: 37, img:"url(../img/cards/d03.png)"  },
            { name: "2&#9830;", color: "blue", rank: 2, suit: "diamond", identifier: 38, img:"url(../img/cards/d02.png)"  },
        
            { name: "A&clubs;", color: "green", rank: 14, suit: "club", identifier: 39, img:"url(../img/cards/c14.png)"  },
            { name: "K&clubs;", color: "green", rank: 13, suit: "club", identifier: 40, img:"url(../img/cards/c13.png)"  },
            { name: "Q&clubs;", color: "green", rank: 12, suit: "club", identifier: 41, img:"url(../img/cards/c12.png)"  },
            { name: "J&clubs;", color: "green", rank: 11, suit: "club", identifier: 42, img:"url(../img/cards/c11.png)"  },
            { name: "10&clubs;", color: "green", rank: 10, suit: "club", identifier: 43, img:"url(../img/cards/c10.png)"  },
            { name: "9&clubs;", color: "green", rank: 9, suit: "club", identifier: 44, img:"url(../img/cards/c09.png)"  },
            { name: "8&clubs;", color: "green", rank: 8, suit: "club", identifier: 45, img:"url(../img/cards/c08.png)"  },
            { name: "7&clubs;", color: "green", rank: 7, suit: "club", identifier: 46, img:"url(../img/cards/c07.png)"  },
            { name: "6&clubs;", color: "green", rank: 6, suit: "club", identifier: 47, img:"url(../img/cards/c06.png)"  },
            { name: "5&clubs;", color: "green", rank: 5, suit: "club", identifier: 48, img:"url(../img/cards/c05.png)"  },
            { name: "4&clubs;", color: "green", rank: 4, suit: "club", identifier: 49, img:"url(../img/cards/c04.png)"  },
            { name: "3&clubs;", color: "green", rank: 3, suit: "club", identifier: 50, img:"url(../img/cards/c03.png)"  },
            { name: "2&clubs;", color: "green", rank: 2, suit: "club", identifier: 51, img:"url(../img/cards/c02.png)"  }
        
        ];
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    show() {
        let str = "";
        this.cards.forEach((e) => { str += "<span style='color: " + e.color +"'>" + e.name + "</span>  " });
        return str;
    }

    dealCard(NumOfCards) {
       return this.cards.splice(0,NumOfCards);
    }

    copyCard(index){
        return this.cards[index];
    }


}