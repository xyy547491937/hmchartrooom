// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import HelloWorld from './components/HelloWorld'
import CommentGlobal from './comment/CommentGlobal'
import VueSocketio from 'vue-socket.io';
//import io from 'socket.io-client';
import axios from 'axios'
import Base from './comment/base'
Vue.prototype.$http = axios
Vue.prototype.$CommentGlobal=CommentGlobal
Vue.prototype.$URL="http://192.168.3.151:8080/"
const userId=5
Vue.use(VueSocketio, `http://192.168.3.151:8081`);//?clientid=${this.$route.params.sid}
Vue.use(VueRouter)
Vue.use(Base)
//const io = io('http://192.168.3.151:8081?clientid=5');
//sid :用户id tid-->tragetID 目标id
const routes = [{
  path: '/chartlist/:sid/:tid',
  name:"Home",
  component: Home
},{
  path:'/chart/:sid/:tid',
  name:'HelloWorld',
  component:HelloWorld,
  // watch: {
  //   '$route' (to, from) {
  //     console.log(to)
  //     console.log(from)
  //       this.$router.go(0);
  //   }
  // },
}

]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false
let vm = new Vue(); //创建一个新实例
Vue.prototype.vm=vm;
Vue.prototype.targetId=5
/* eslint-disable no-new */
new Vue({

  router,
  render: h => h(App)
}).$mount('#app-box')
