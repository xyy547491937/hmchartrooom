<template>
<div class="chart-all-input">
    <div class="chart-input">
      <span class="iconfont icon-jiahao" @click="sendCream"></span>
      <!-- 输入框 -->
        <input type="text" v-model="sendMessage" v-on:keyup.enter="goSend" @focus="InputOnfouce">
          <span class="iconfont icon-biaoqing" @click="ge"></span>
          <x-button mini type="primary" @click.native="goSend()">发送</x-button>
    </div>
    <div class="biaoqing" >
        <div v-for="item in list" :key=item class="vux-center-h" @click="sendEmotion($event)">
        <!-- <emotion is-gif>{{item}}</emotion> -->
        <emotion is-gif v-show="isShowEmotion">{{item}}</emotion>
        </div>
    </div>
    <!-- 相机组件 -->
    <div class="chart-cream" v-show="isShowCream" >
        <div class="item-chart-cream">
          
            <!-- 获取相册 -->
            <form id="uploadForm" enctype="multipart/form-data" method="post" > 
             <span class="iconfont icon-xiangji"></span>
                <input type="file" accept="image/*"  name="file" capture="camera" @change="uploadImage()" class="imageBox" v-if="isAndroid()" />
                <input type="file" accept="image/*"  name="file"  @change="uploadImage()" class="imageBox" v-else>
            </form>
           
        
        </div>

        <div class="item-chart-cream" @click="showPosition('middle')"><span class="iconfont icon-wenjian"></span></div>
         <!-- <input type="file" accept="image/*" capture="camera" > -->
    </div>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="开发中..." :position="position">{{ ('Basic Usage') }}</toast>

</div>
</template>
<script>
import { XButton,WechatEmotion as Emotion,Toast } from 'vux'
// import func from './vue-temp/vue-editor-bridge';
    export default{
        data(){
            return {
                sendMessage:'',
                      list: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
                isShowEmotion:false,//是否弹出表情框，默认为FALSE
                isShowCream:false,//相机弹出框，默认FALSE
                showPositionValue:false,
                position: 'default',
                listenMessage:{},
                imgs: [],
                imgData: {
                    accept: 'image/gif, image/jpeg, image/png, image/jpg',
                }
            }
        },
        props:['messageDate'],
        methods:{
            //判断是iOS 韩式android 手机
            isAndroid(){
                 //解决上传图片时capture="camera"在安卓与IOS的兼容性问题（在Android只能拍照，不能选相册）
                 var ua = navigator.userAgent.toLowerCase();//获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
                 var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);//判断是否是苹果手机，是则是true
                return isIos
            },
            // 点击发送
            goSend(){
                // this.messageDate.push(this.sendMessage)
                //message_event 跟后台自定义方法
                this.$socket.emit('message_event', {
                    sourceClientId: this.$route.params.sid,
                    targetClientId:this.$route.params.tid,
                    msg:this.sendMessage
                });
                // console.log('targetId='+this.targetId)
                 this.sendMessage=''
            },
            
            socketMethod(obj){
                this.$socket.emit('message_event',obj)
            },
            //发送表情
            sendEmotion(event){
                // this.messageDate.push(`<img src=${event.currentTarget.children[0].children[0].src}>`)
                 this.$socket.emit('message_event', {
                    sourceClientId: this.$route.params.sid,
                    targetClientId:this.$route.params.tid,
                    msg:`<img src=${event.currentTarget.children[0].children[0].src}>`
                });
            },
            ge() {
                this.isShowEmotion=!this.isShowEmotion;
                this.isShowCream=false;
                // if(this.isShowEmotion){
                    let inputHeight=document.querySelector('.chart-all-input').clientHeight
                    console.log(inputHeight)
                    this.vm.$emit('blur',inputHeight); //触发事件
                // }
              
            },
            sendCream(){
                this.isShowCream=!this.isShowCream
                this.isShowEmotion=false;
                this.$emit('showCream',this.isShowCream)
            },  
            showPosition (position) {
                this.position = position
                this.showPositionValue = true
            },
            //输入框获取焦点时，取消表情以及相机功能
            InputOnfouce(){
                this.isShowEmotion=false;
                this.isShowCream=false;
            },
            //上传图片
            uploadImage(){
                let reader =new FileReader();  
                let img1=event.target.files[0];  
                let type=img1.type;//文件的类型，判断是否是图片  
                let size=img1.size;//文件的大小，判断图片的大小  
                if(this.imgData.accept.indexOf(type) == -1){  
                    alert('请选择我们支持的图片格式！');  
                    return false;  
                }  
                // if(size>3145728){  
                //     alert('请选择3M以内的图片！');  
                //     return false;  
                // }  
                // console.log(img1)
                var uri = ''  
                let form = new FormData();   
                form.append('file',img1,img1.name);  
                //!TODO 测试服务器，正式，需要填写正式服务器地址
                this.$http.post(this.$URL+'imageUpload',form,{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
                   // this.messageDate.push('<img style="width:50px; height:auto;" src='+ res.data.entity+ '>')
                    this.socketMethod({
                        sourceClientId: this.$route.params.sid,
                        targetClientId:this.$route.params.tid,
                        msg:`<img style="width:50px; height:auto;" src=${res.data.entity} >`
                    })
                     
                })

            }
        },
        created(){
            //兄弟组件传参
            this.vm.$on('showCream',(arg)=>{
              //  console.log(arg)
                this.isShowCream=arg
                this.isShowEmotion=arg
            })
        },
        mounted(){
            this.$nextTick(()=>{
                this.isAndroid();
                // console.log(this.isAndroid())
            })
        },
        sockets:{
            connect:function(){
                console.log('已经链接服务器');
            },
            message_event(data){
                // 监视父元素的messageDate
                if(data){
                    //假如目标目标id（targetid）跟地址id一样，就把当前id保存在messageDate
                    if(data.targetClientId==this.$route.tid){
                        this.messageDate.push(data)
                    }
                }else{
                    this.messageDate.push('欢饮来到嘻嘻嘻店')//
                }
            },
            disconnect(data){
                console.log(data)
            }

        },
        components:{
            XButton,
            Emotion,
            Toast
        },
        
    }
</script>
<style lang="less" scoped>
// 引入阿里字体
    @import url('//at.alicdn.com/t/font_715939_vmw5h13g7t.css');
    @import url('../comment/comment.less');
    .chart-input{
        width: 100%;
        background: @baseChart-mebgColor;
        // padding: 0 15px;
        display: flex;
        height: 60px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        &>input[type="text"]{
             width: 50%;
            border: none;
            outline: none;
            padding-left:15px; 
            height: 30px;
            border-radius: 17px;
            margin: 0 auto;
        }
        &>span{
            text-align: center;
             width: 10%;
            display: inline-block;
            font-size: 23px;
            cursor: pointer;
            
        }
        
    }
    .biaoqing{
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }
    @borderWidth:100px;
    .chart-cream{
        display: flex;
        flex-direction: row;
        justify-content: baseline;
        align-items: baseline;
        height: @borderWidth;
        & >.item-chart-cream{
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: @borderWidth/2.5;
            height: @borderWidth/2.5;
            margin: 10px 0 0 20px;
            &:extend(.border1px);//less继承
            &>form{
                 &>span{
                font-size: 20px;
                height: initial;
            }
            &>input[type="file"]{
                
                width: 100%;
                height: 100%;
                position: absolute;
                opacity: 0;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
            }
            }
           
        }
    }
    .chart-all-input{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 10;
        background-color: #fff;
        width: 100%;

    }

</style>
