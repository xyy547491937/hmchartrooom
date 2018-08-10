<template>
  <div class="hello">
    <!-- 联系人点击去的对话框 -->
    <!-- 1头部 -->
    <HmHeader/>  
    <!-- 2聊天列表 -->
    <ChartList :messageDate="messageArr" @showbox="toshow" />
    <!-- 3输入框 -->
    <ChartInput :messageDate="messageArr"  />
  </div>
</template>

<script>
// 加载头部模块
import HmHeader from "./HmHeader"
import ChartList from "./CHartList"
import ChartInput from "./chartInput"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      messageArr:[
                   
                ],
            
    }
  },
  methods:{
       toshow(msg){
         this.msg=msg;
         console.log(this.msg)
      },
      //接受子组件相机发送的参数
  },
  mounted(){
   
  },
  components:{
    HmHeader,
    ChartList,
    ChartInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
