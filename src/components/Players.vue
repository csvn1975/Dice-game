<template>
 <div>
    <div v-bind:class="classPlayerPanel(0)" >
        <div class="player-name"> {{getPlayerName(0)}}</div>
        <div class="player-score">{{scores[0]}}</div>
        <div class="player-current-box" :style="{backgroundColor: bg_color}">
            <div class="player-current-label">Current</div>
            <div class="player-current-score"> {{(activePlayer==0) ? currentScore : 0}} </div>
        </div>
    </div>
    <div v-bind:class="classPlayerPanel(1)">
        <div class="player-name"> {{getPlayerName(1)}}</div>
        <div class="player-score">{{scores[1]}}</div>
        <div class="player-current-box">
            <div class="player-current-label">Current</div>
            <div class="player-current-score"> {{(activePlayer==1) ? currentScore : 0}}  </div>
        </div>
    </div>
 </div>
</template>

<script>
import { eventBus } from '../main';
export default {

    name: 'players',

    props:{
        activePlayer:Number,
        scores: {type: Array, default: [0,0]},
        currentScore: Number,
        isWin:Boolean,
    },

    data(){
        return{
           bg_color:"#42B982",
        }
    },

    methods:{
         classPlayerPanel(player){
          return {
             'player-panel': true,
              active: (this.activePlayer == player),
              winner: (this.isWin && this.activePlayer == player)
          } 
         },

         getPlayerName(player){
            let {isWin, activePlayer} = this;
            return  (isWin && activePlayer == player) ? "Winner" : `Player ${player +1}`
        },
    },

    created() {
            eventBus.$on('changeColor', (color) => {
                this.bg_color = color;
            })
        },

    computed:{
        
    }
}
</script>

<style>

/**********************************************
*** PLAYERS
**********************************************/
.player-panel {
    width: 50%;
    float: left;
    height: 600px;
    padding: 100px;
    transition: all .3s ease;
    background-color: #fff;
}

.player-name {
    font-size: 40px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 100;
    margin-top: 20px;
    margin-bottom: 10px;
    position: relative;
}

.player-score {
    text-align: center;
    font-size: 80px;
    font-weight: 100;
    color: #42b983;
    margin-bottom: 130px;
}

.active { background-color: #f7f7f7; }
.active .player-name { font-weight: 300; }

.active .player-name::after {
    content: "\2022";
    font-size: 47px;
    position: absolute;
    color: #42b983;
    top: -7px;
    right: 10px;
    
}

.player-current-box {
    background-color: #42b983;
    color: #fff;
    width: 40%;
    margin: 0 auto;
    padding: 12px;
    text-align: center;
}

.player-current-label {
    text-transform: uppercase;
    margin-bottom: 10px;
    font-size: 12px;
    color: #222;
}

.player-current-score {
    font-size: 30px;
}

.winner { background-color: #f7f7f7; }
.winner .player-name { font-weight: 300; color: red; }

</style>