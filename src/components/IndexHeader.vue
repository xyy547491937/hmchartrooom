<template>
    <div class="index-header" >
            <p class="header-img"><img src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" alt=""></p>
            <span> 瓜果旗舰店</span>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        },
        
    }
</script>
<style lang="less">
    .index-header{
        background-color: #2a90ff;
        height: 40px;
        display: flex;
        padding: 0 15px;
        flex-direction: row;
        justify-content: baseline;
        align-items: center;
        &>.header-img{
            width: 24px;
            height: 24px;
           
            &>img{
                max-width: 100%;
                display: block;
                height: auto; 
                border-radius: 50%;
            }
        }
        &>span{
            color: #fff;
            margin-left: 15px;
        }
    }
</style>
