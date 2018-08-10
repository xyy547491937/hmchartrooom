
<template>
  <div>
    <!-- 华猫头部 -->
      <IndexHeader/>
        <!-- 最近联系人 -->
      <divider>最近联系人 </divider>
    <!-- 引入联系人列表 -->
    <CustomList/>
   
  </div>
</template>



<script>
import { Group, Cell,Divider } from 'vux'
import CustomList from './CustomList'
import HmHeader from './HmHeader'
import IndexHeader from './IndexHeader'

export default {
  components: {
    Group,
    Cell,
    Divider,
    CustomList,
    HmHeader,
    IndexHeader

  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  methods:{

  },
  computed:{
    
  },
  mounted(){
    console.log()
  }
  

}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
