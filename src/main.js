import Vue from 'vue'
import App from './App.vue'
export const eventBus = new Vue({
  data:{
   
  },

  methods:{
    setColor(color){
      this.$emit("changeColor", color)
    }, 
  }

})

new Vue({
  el: '#app',
  render: h => h(App)
})
