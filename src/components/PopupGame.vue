<template>

    <div class="box-popup-game" :class="{'active': popupOpen}">
    <div class="popup">
        <h3 class="heading">Game</h3> 
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, animi. Aut sequi quidem atque ipsam, dolor dolorum. Corporis, 
            eius est eaque alias architecto inventore odio! Eos aliquam ab numquam nulla!</p>
        <button class="btn" v-on:click="handleGameStart">Start</button>    
    </div>
    </div>

</template>

<script>
export default {
    name:'popup-game',

    props:{
        popupOpen:Boolean
    },
    methods:{
        handleGameStart: function(){
            /* console.log('handleGameStart')  */
            this.$emit("handleGameStart")
        }
    }

}
</script>

<style>
.box-popup-game{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity:0.9;
    visibility:hidden;
    background-color: rgba(0,0,0,0.8);
    transition: all 0.5s;
    animation: popHidden linear .5s; 
    
    
}

.active{
  visibility:visible;
  transition: all 0.8s;
  animation: popShow linear 1s;
}

@keyframes popShow {
    0% {
        opacity:0;
    }
    100% {
         opacity:1;
    }
}

@keyframes popHidden {
    0% {
        opacity:1;
        transform: rotate(0) scale(1);
    }
    100% {
         opacity:0;
         transform: rotate(360Deg) scale(0.1);;
    }
}


.popup{
    width: 400px;
    height: 200px;
    top: 50%;
    left: 50%;
    position: relative;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    line-height: 20px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px 6px rgb(0 0 0 / 80%);
}
.heading{
    margin-bottom:2px;
    color:red;
}

.btn{
    margin-top: 10px;
    padding: 8px 25px;
    background-color:#42b983;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 2px;
    transition: all 0.8s;
}

.btn:hover{
    cursor: pointer;
    background-color: rgb(66, 185, 100);
    box-shadow: 1px 1px 5px #C2C2C2;
    transform: scale(0.9);
    
}

</style>