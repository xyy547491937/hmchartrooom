<template>
  <div> 
    <scroller lock-x height="-46" ref="scrollerBottom" :scroll-bottom-offst="200">
  <div class="vux-1px-t">
   
    <swipeout >

      <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow" v-for=" (o,i) in chartList" :key="i">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{('收藏')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{('删除')}}</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
            <!-- 路由跳转 -->
         <div class="item-list" is-link link="/chart" @click="jump(o)">
             <!-- 引入联系人 -->                  
            <img slot="restricted-label" style="display:inline-block;vertical-align:middle;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24" v-if="o.userPhoto==''||undefined||null">
            <img slot="restricted-label" style="display:inline-block;vertical-align:middle;" :src="orImg(o.userPhoto)" width="24" height="24" v-else>
                <span>{{o.nickName}} </span>
               <badge :text="o.text"></badge>        
         </div>
        </div>
      </swipeout-item>
    </swipeout>
  </div>
  </scroller>
  </div>
</template>
<script>

import {
  GroupTitle,
  TabbarItem,
  Tabbar,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XButton,
  Badge, 
  Group, 
  Cell,
  Scroller
  
} from "vux";
import HelloWorldVue from './HelloWorld.vue';

export default {
  components: {
    GroupTitle,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton,
    Badge, 
    TabbarItem,
    Tabbar,
    Group, 
    Cell,
    Scroller
    
  },
  mounted(){
    this.$nextTick(()=>{
      this.getSourceId()
      this.getChartList()
     console.log(this.$route.params.tid )
    })
  },
  methods: {
    jump(item){
     console.log(item.userReceiveId) 
        this.$router.push({path:`/chart/${this.$route.params.sid}/${item.userReceiveId}`});
      },
    onButtonClick(type) {
      alert("on button click " + type);
    },
    handleEvents(type) {
      console.log("event: ", type);
    },
    
    getSourceId(){
      console.log(localStorage.userId)
      //获取当前自己的id,以及聊天的商家ID
      this.$http.get(this.baseConfig.URL+'mongodb/getPicture',{params:{userId:this.$route.params.tid}}).then((res)=>{
        // console.log(res)
      })
    },
    getChartList(){
      this.$http.get(this.baseConfig.URL+'mongodb/chatLog',{params:{userSendId :this.$route.params.sid}}).then((res)=>{
        //console.log(res)
        if(res.data.messageCode==200){
          
          res.data.entity.forEach((v,i)=>{
            this.$set(v,'text',0)
          })
          this.chartList=res.data.entity
        }
      })
    }

  },
   sockets: {
        connect: function(){
          console.log('已经连接服务器')
 
        },
      
        message_event(data){
          //监视发来的信息
          //1 如果信息的targetID跟当前的商家id相同，text+=1
          //2信息来的时候，遍历所有的聊天客户（商家）
          this.chartList.forEach(v => {
               if(data.targetClientId==v.userReceiveId) {
                  v.text+=1
               }


          });
            
        }
   },
 
  data() {
    return {
      disabled: false,
      chartList:[]
    }
  },
  
};
</script>

<style lang="less">
.demo-content {
  padding: 10px 10px;
}
.item-list{
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center
}
</style>
