<template>
    <div class="chart-list" >
        <!-- liao天列表 -->
        <scroller lock-x scrollbar-y height="-110" ref="scroller" use-pulldown @on-pulldown-loading="loadData" :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新'}">
        <ul class="chart-box" @click="bodyClick">
             <li v-for="(o,index) in chartRecord" :key=index :class="{self:o.userSendId==$route.params.sid}"> 
                <img slot="restricted-label" style="display:inline-block;vertical-align:middle;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                <span v-html="o.content"></span>
            </li>
            <!-- liaotian -->
            <li v-for="(o,index) in messageDate" :key=index :class="{self:o.sourceClientId==$route.params.sid}"> 
                <img slot="restricted-label" style="display:inline-block;vertical-align:middle;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                <span v-html="o.msg"></span>
            </li>


          
        </ul>
        </scroller>
    </div>
</template>
<script type="text/ecmascript-6">
import { Scroller } from 'vux'

    export default{
       data(){
            return {
                // scroll:{},
                chartRecord:[],
                test:0,
                //messageDate:[],
                pageIndex:1 ,//当前页
                pageSize:10,
                totalPage:0,
                scrollTop:46,
                isShowCream:false,
            }
       } ,
       props: ['messageDate',],
       components:{
        Scroller
       },
       created() {
            this.vm.$on('blur', (arg) => { //接受兄弟组件chartInput 的信息
               
                // console.log(arg)
                this.test= arg ; // 接收
            console.log('接收到的数据'+ this.test)
            this.test=this.test==undefined||this.test==0?106:this.test+106
            console.log("inputHeight"+this.test)
            });
        },
       methods:{
            open() {
                this.$emit('showbox','the msg'); //触发showbox方法，'the msg'为向父组件传递的数据,通过事件发送到父组件
            },
            bodyClick(){
                this.isShowCream=false
                this.vm.$emit('showCream',this.isShowCream)
            },
            getChart(pageIndex,pageSize){
                this.$http.get(this.baseConfig.URL+'mongodb/getChat',{params:{currentPage:pageIndex,pageSize:pageSize,userSendId:5,userReceiveId:'8014' }}).then((res)=>{
                     console.log(res)
                    if(res.status==200){
                        this.chartRecord=this.chartRecord.concat(res.data.chats);
                        this.totalPage=parseInt(res.data.totalPages)
                        this.$refs.scroller.reset({top: 0})//
                        
                    }
                })
            },
            loadData(pos) {
                this.pageIndex ++;
                // console.log(this.totalPage)
                if(this.pageIndex <= this.totalPage){
                    this.getChart(this.pageIndex,this.pageSize)
                    // this.$refs.scroller.donePulldown()
                    this.$refs.scroller.reset({top: 0})//
                }else{
                    alert('没有数据了')
                     this.$refs.scroller.reset({top: 0})//
                }
               
            },
            //判断 信息源是否是同一个
            isTarget(){

            }
          
       },
        sockets:{
            connect:function(){
                console.log('已经链接服务器');
            },
            message_event(data){
               //
            }
        },
       computed:{

       },
       mounted() {
           this.$nextTick(()=>{
               this.getChart(this.pageIndex,this.pageSize)
            document.querySelector('.chart-list').style.height=(window.screen.height-106)+'px'
            // console.log('列表高度'+window.screen.height-this.test)
           
           this.open() //页面加载完成发送到父组件
        //    聊天列表 自适应手机的高度 等于设备发哦度-60

          
           
            
           })
       },
       updated(){
           console.log('更新后的数据',this.test)
       }
    }
</script>
<style lang="less" scoped>
@import url('../comment/comment.less');
    .chart-list {
        overflow: auto;
        & .chart-box{
            // width: 100%;
            // height: 100%;
            padding: 10px;
            &>li{
                display: flex;
                flex-direction: row;
                align-items: center;
                
                margin-bottom: 10px;
                &>span{
                    background-color:@baseChart-duibgColor;
                    padding: 5px 20px;
                    font-size: 14px;   
                    border-radius: 6px;
                    white-space: normal;
                    word-wrap: break-word;
                    word-break: break-all;
                }
               &>img{
                   margin: 0 15px;
               }
            }
         
        }
    }
    .bscroll{
        width: 100%;
         height: 500px;
        overflow: hidden;
        }
    // 默认客户发来消息，。self是我自己的对话框模式
       .self{
                flex-direction: row-reverse!important;
                &>span{
                    background-color: @baseChart-mebgColor!important;
                }
                
            }
</style>

