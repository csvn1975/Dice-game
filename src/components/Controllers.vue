<template>
  <div class="box-controller">
       
       <!-- use this.$emit  -->
       <button class="control btn-new"
        @click="gameStart"
       ><i class="ion-ios-plus-outline"></i>New game</button>
       
       <!-- change Color with EventBus -->
       <!-- <button class="control"
        @click="changeColor2"
       ><i class="ion-ios-plus-outline"></i>change_Color</button> -->

        <!-- props function/ callback -->
       <button class="control btn-roll" 
               @click="handleRollDice()">
         <i class="ion-ios-loop"></i>Roll dice</button>

       <!-- here use callback function, handleHoldFn is parent-handler -->
       <button class="control btn-hold" 
              @click="handleHold()" 
              :class="{winanble:winable}">
       <i class="ion-ios-download-outline"></i>Hold-cb</button> 

       <input type="number" ref="score"
            class="final-score"    
            :value = "finalScore"
            @change="changeScore"
           > 
  </div>
</template>

<script>
import {eventBus} from '../main.js'
export default {
    
    name: 'controllers', 
    props:{
        finalScore: [Number, String],
        winable:Boolean,
        handleHold: Function,
        handleRollDice: Function,
    },

    methods:{
        gameStart: function(){
           this.$emit('newGame');
        },

        changeScore(event){
            let data = event.target.value;
            this.$emit('changeScore', data)
        },

        /* eventBus */    
        changeColor() {
            eventBus.$emit('changeColor', 'red');
        },
        /* or */
        changeColor2() {
            eventBus.changeColor('red');
        }

    }
}
</script>

<style>


/**********************************************
*** Control
**********************************************/
.control {
    position: absolute;
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
    color: #555;
    background: none;
    border: none;
    font-family: Lato;
    font-size: 20px;
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 300;
    transition: background-color 0.3s, color 0.3s;
}
.control.disable {
    pointer-events: none;
}

.control:hover { font-weight: 600; }
.control:hover i { margin-right: 20px; }

.control:focus {
    outline: none;
}

.control i {
    color: #42b983;
    display: inline-block;
    margin-right: 15px;
    font-size: 32px;
    line-height: 1;
    vertical-align: text-top;
    margin-top: -4px;
    transition: margin 0.3s;
}

.btn-new { top: 45px;}
.btn-roll { top: 403px;}
.btn-hold { top: 467px;}

.final-score {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 520px;
    color: #555;
    font-size: 18px;
    font-family: 'Lato';
    text-align: center;
    padding: 10px;
    width: 160px;
    text-transform: uppercase;
}

.winanble{
    animation: winnerable 5s infinite;
 }

@keyframes winnerable {
  0% {background-color: yellow;}
  50% {background-color: red;}
  100% {background-color: yellow;}
}

.final-score:focus { outline: none; }
</style>