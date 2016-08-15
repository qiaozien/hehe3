var homeTpl=require("../templates/home.string");

// 引入util
var util = require("../util/util");

SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
           vm.livedata=[];
		}
	}],
	// 初始化
	init:{
       mySlider:null,
       formatData:function(data){
          var tempArr = [];
          for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
              tempArr[i] = [];
              tempArr[i].push(data[2*i]);
              tempArr[i].push(data[2*i+1]);
          }
          return tempArr;
       }
	},
	bindEvents:{
		beforeShow:function(){
		   // 获取视图
		   var that = this;
		   // 获取vm
		   var vm=this.getVM();
           $.ajax({
           	   url:"/footballApp/mock/livelist.json",
           	   // url:"/api/livelist.php",
               data:{
               	   rtype:"refresh"
               },
               success:function(rs){
                  // 将JSON数据挂接到vm上
                  // http://avalonjs.github.io/  
                  // http://cn.vuejs.org/
                  // https://angularjs.org/
                  vm.livedata = that.formatData(rs.data);
               },
               error:function(){
               	   console.log("请求失败");
               }
           })
		},
		show:function(){
			this.mySlider=new Swiper("#swiper-slide",{
                loop:false,
                onSlideChangeStart:function(swiper){
                    var index = swiper.activeIndex;
                    var $tags = $(".m-home nav li");
                    util.setFocus($tags.eq(index));
                }
			})
		}
	},
	bindActions:{
       "tap.slide":function(e){
           var index=$(e.el).index();
           this.mySlider.slideTo(index);
       }
	}
})