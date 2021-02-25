import Vue from 'vue'
import App from './App.vue'
export const eventBus = new Vue({
  methods:{
    changeColor(color){
      console.log("changeColor")
      this.$emit("changeColor", color)
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
