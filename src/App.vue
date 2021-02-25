<template>
  <div id="app">
    <div class="wrapper clearfix">
      <players
        :isWin="isWin"
        :activePlayer="activePlayer"
        :scores="scores"
        :currentScore="currentScore"
      />

      <controllers
        :finalScore="finalScore"
        v-bind:winable="winable"
        @newGame="newGame"
        @changeScore="changeScore"

        :handleRollDice="handleRollDice"
        :handleHold="handleHold" 
      />

      <dices v-bind:dices="dices" />

      <popup-game v-bind:popupOpen="popupOpen"
            @handleGameStart="handleGameStart"
      />

    </div>
  </div>
</template>

<script>
import Dices from "./components/Dices";
import Players from "./components/Players";
import Controllers from "./components/Controllers";
import PopupGame from "./components/PopupGame";

export default {
  name: "app",

  data: function () {

    return {
      msg: "Welcome to Your Vue.js App",
      isPlaying: false,
      activePlayer: -1,
      scores: [0, 0],
      dices: [1, 1],
      currentScore: 0,
      finalScore: 50,
      popupOpen:false,
    };
  },

  methods: {
    handleGameStart(){
        this.popupOpen = false;
        this.gameInit();
    },

    gameInit(){
      this.isPlaying = true;
      this.activePlayer = (this.activePlayer == 0) ? 1 : 0;      
      this.currentScore = 0;

      this.finalScore = 50;
      this.scores = [0, 0];
      this.dices = [1, 1];
    },

    newGame: function () {
      this.popupOpen = true;
    },


    nextPlayer(){
        this.activePlayer = this.activePlayer == 0 ? 1 : 0;
        this.currentScore = 0;
    },
  
    handleRollDice: function () {
      if (!this.isPlaying) {
        alert("Please click NewGame");
        return;
      }

      let {activePlayer} = this;
      let newDices = [... this.dices]
        newDices[0] = this.diceRandom();
        newDices[1] = this.diceRandom();

      this.dices = newDices;
      /* next Player */
      if (newDices[0] == 1 || newDices[1] == 1) {
         this.nextPlayer();
      } else {
        this.currentScore += newDices[0] + newDices[1];
      }
    },

    handleHold: function () {
      if (this.currentScore>0){
        let {activePlayer, scores, currentScore}  = this;
        let newScores = [... scores];

        newScores[activePlayer] += currentScore;
        this.scores = newScores;      
    
        if (this.isWin) {
            this.isPlaying = false;
        } else {
            this.nextPlayer()
        }
      }
    },

    changeScore(data) {
      
      this.finalScore = parseInt(data)
    },

      diceRandom(){
        return Math.ceil(Math.random() * 6);
    },
    
  },

  computed: {
     winable(){
        let {isPlaying, scores, activePlayer, currentScore, finalScore} = this;
        return isPlaying && (scores[activePlayer] + currentScore >= finalScore);
     },

     isWin(){
       let {activePlayer, finalScore, scores} = this;
       return (scores[activePlayer] >= finalScore);
     },

   
  },

  components: {
    Dices,
    Players,
    Controllers,
    PopupGame,
     //component_name : PopupGame,
  },
};
</script>

<style>
/**********************************************
*** GENERAL
**********************************************/

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

body {
  background-image: linear-gradient(
      rgba(62, 20, 20, 0.4),
      rgba(62, 20, 20, 0.4)
    ),
    url(/public/assets/images/back.jpg);
  background-size: cover;
  background-position: center;
  font-family: Lato;
  font-weight: 300;
  position: relative;
  height: 100vh;
  color: #555;
}

.wrapper {
  width: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>
