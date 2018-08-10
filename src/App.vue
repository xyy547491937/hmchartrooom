<template>
  <div id="app">
    
    <transition :name="transitionName">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  mounted () {
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
    '$route' (to, from) {
      // console.log(to,from )
      if(to.path.indexOf('chartlist')!=-1){
        // alert(1)
        this.transitionName = 'slide-right';
      }else{
        // alert(2)
        this.transitionName = 'slide-left';
      }
    }
  }


}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
