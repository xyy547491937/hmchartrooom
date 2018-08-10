<script>
/*
    1.定义一些公共方法，以及公共常量
    2.main.js 
          improt xxx form xxxs
          Vue.use(xxx)

*/ 
    exports.install = function (Vue, options) {
    Vue.prototype.text1 = function (){//全局函数1
        alert('执行成功1');
        };
    Vue.prototype.text2 = ()=>{//全局函数2
        alert('执行成功2');
        };
    Vue.prototype.baseConfig={
        baseImgUrl:'http://zzhtwl.oss-cn-qingdao.aliyuncs.com/',
        URL:'http://192.168.3.151:8080/'
    },
    Vue.prototype.orImg=function(src){
    if(src){
        if(src.indexOf('http')==-1){
            src=this.baseConfig.baseImgUrl+src
        }else{
            src=src
        }

    }

    return  src
    },

     /*获取url参数*/
  Vue.prototype.getUrlParam=function(name, str) {
      var url;
      if (str) {
          url = str.split("?")[1];
      } else {
          url = window.location.search.replace("?", "");
      }
      url = url.split("&");
      var ret = {};
      url.forEach(function (o, i) {
         // console.log(o)
          var d = o.split("=");
          ret[d[0]] = decodeURI(d[1]);
      });
      if (name)
          return ret[name];
      else
          return ret;
  } 


};
</script>