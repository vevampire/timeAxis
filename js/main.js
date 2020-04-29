//获取数据

//处理数据
var yearData=[];//时间选择器
var timeContent=[];//时间轴内容
var currentYear=new Date().getFullYear();//当前日期
var chooseYear=new Date().getFullYear();//默认选择当前日期
var timeitem_width=170;//轴上一个item宽度
var visble_num;//轴上可见item个数量
var all_timeitem;//轴所有元素个数
//轴滚动信息
var scroll_num=7 ;//默认滚动一次一个item
var scroll_opt={
    current_num:0,//当前滚动起始距离个数
    current_distance:0,//当前位置距起始距离
    scroll_left:true,//是否可继续滚动,默认为可滚
    scroll_right:false//是否可向右滚动,默认为不可滚动
};
var contractTimeContent=[];//查询内容
var currentBodyData="all";//默认为全部
var bodyContent=[];//轴体
//数据获取失败
if(!(data.length>0)){
    $("timeShow").hide();
}

//数据获取成功
for (var yearvalue of data) {
    yearData.push(yearvalue.year)
    for (var dayvalue of yearvalue.dayContent) {
        dayvalue.year=yearvalue.year
        timeContent.push(dayvalue)
    }
}
//动态添加时间选择器选项
function addTimeOption(){
    if(yearData.length>0){
        $("#timeYChoose").children().remove();
        var option_items="<option value=''></option><option value='all'>全部</option>";
        $(yearData).each(function(index) {
            var option_item="<option value="+yearData[index]+">"+yearData[index]+"</option>"
            option_items=option_items+option_item
        });
        $("#timeYChoose").append(option_items).find("option[value="+currentYear+"]").attr("selected",true);//默认选中
       
    }
}

//渲染时光轴
function creadBody() {
    //创建案件历史
    bodyContent=[];
    if(currentBodyData==="all"){
        timeContent.forEach(function(val, ind, arr){
            bodyContent.push(val);
        })
        all_timeitem=timeContent.length;
        scroll_opt={
            current_num:0,//当前滚动起始距离个数
            current_distance:0,//当前位置距起始距离
            scroll_left:true,//是否可继续滚动,默认为可滚
            scroll_right:false//是否可向右滚动,默认为不可滚动
        };
        $(".container").timeAxis(timeContent);
    }else if(currentBodyData=="contract"){
        contractTimeContent.forEach(function(val, ind, arr){
            bodyContent.push(val);
        })
        all_timeitem=contractTimeContent.length;
        scroll_opt={
            current_num:0,//当前滚动起始距离个数
            current_distance:0,//当前位置距起始距离
            scroll_left:true,//是否可继续滚动,默认为可滚
            scroll_right:false//是否可向右滚动,默认为不可滚动
        };
        $(".container").timeAxis(contractTimeContent);
    }

   
}
creadBody();

//计算年份对应页面page
function pageCompute(year){
    var firstIndex;
    var allIndex=[]
    allIndex=bodyContent.map(function(val, index,arr){
        if(val.year==year){
            return index
        }
    })
    allIndex=allIndex.filter(function(val, index,arr){
        if(typeof(val)=='number'&&!isNaN(val)){
            if(index===0){
                return "start"
            }
            return index
        }
    });
    firstIndex=allIndex[0];
    var choosePage;
    if(firstIndex=="start"){
        choosePage=0;
        scroll(choosePage);
    }else if(u_Num(firstIndex)){
        choosePage=firstIndex;
        scroll(choosePage);
    }

}

//查看选择的年份,并跳转到对应页面
function choosedYear(){
    var option = $("#timeYChoose option:selected").val();
    if(option==="all"){
        if(currentBodyData!==option){
              currentBodyData="all";
              creadBody();
              return
        }else{
            option=yearData[0]
        }
    }
    chooseYear=option;
    pageCompute(chooseYear);
}

//滚动计算
function scroll(count,dirction){
    var sign= -1;//向左挪动为“-”；向右挪动为“+”
    var flag;
    //参数判空处理
    if(!u_Num(count)){
        return
    }
    //如果未传输方向，则计算相对移动个数
    if(!u_empty(dirction)){
        var  result=Math.abs(count)-Math.abs(scroll_opt.current_num)
        if(result==0){
            return
        }else if(result>0){
            dirction="left";
            scroll_opt.scroll_left=true;
        }else{
            //result=result+1;
            dirction="right";
            scroll_opt.scroll_right=true;
        }
        count = Math.abs(result)
    }
    if(dirction=="left"){
        scroll_opt.scroll_right=true;
        if(!scroll_opt.scroll_left){
            $(".rig").addClass("stop")
        }else{
            $(".rig").removeClass("stop");
            //可挪动情况下分情况;
            var canscrollcount=all_timeitem+scroll_opt.current_num;  
            if(count<canscrollcount){
                scroll_opt.current_num=sign*count+scroll_opt.current_num;
                scroll_opt.current_distance=scroll_opt.current_num*timeitem_width;
                var cssStyle={"left":scroll_opt.current_distance+"px","transition":"left ease 0.3s"}
                $(".container .bd>ul").css(cssStyle);
                var nextscrollcount=all_timeitem+scroll_opt.current_num; 
                if(nextscrollcount>visble_num){
                    scroll_opt.scroll_left=true;
                }else{
                    $(".rig").addClass("stop")
                    scroll_opt.scroll_left=false;
                }
            }else{
                $(".rig").addClass("stop")
                scroll_opt.scroll_left=false;
                scroll_opt.current_num=parseInt(canscrollcount/visble_num)*visble_num+scroll_opt.current_num;
                scroll_opt.current_distance=scroll_opt.current_num*timeitem_width;
                var cssStyle={"left":scroll_opt.current_distance+"px","transition":"left ease 0.3s"}
                $(".container .bd>ul").css(cssStyle);
            }                    

        }
        
        
    }
    if(dirction=="right"){
        sign= 1;
        scroll_opt.scroll_left=true;
        if(!scroll_opt.scroll_right){
            $(".lef").addClass("stop")
        }else{
            $(".lef").removeClass("stop");
            var canscrollcountR= Math.abs(scroll_opt.current_num);
            if(canscrollcountR>0){
                if(count<canscrollcountR){
                    scroll_opt.current_num=scroll_opt.current_num+count;
                    scroll_opt.current_distance=scroll_opt.current_num*timeitem_width;
                    var cssStyle={"left":scroll_opt.current_distance+"px","transition":"left ease 0.3s"}
                    $(".container .bd>ul").css(cssStyle);
                    if(Math.abs(scroll_opt.current_num)>0){
                        scroll_opt.scroll_right=true;
                        $(".lef").removeClass("stop");
                    }else{
                        scroll_opt.scroll_right=false;
                        $(".lef").addClass("stop");
                    }
                }else{
                    scroll_opt.scroll_right=false;
                    $(".lef").addClass("stop");
                    scroll_opt.current_num=0;
                    scroll_opt.current_distance=0;
                    var cssStyle={"left":scroll_opt.current_distance+"px","transition":"left ease 0.3s"};
                    $(".container .bd>ul").css(cssStyle);
                }
            }else{
                scroll_opt.scroll_right=false;
                $(".lef").addClass("prevStop");
            }
        }
    }
    computeYear();
}

//计算轴移动时轴原点的年份
function computeYear(){
    var index=Math.abs(scroll_opt.current_num);
    var timeYear=bodyContent[index].year;
    $("#timeYChoose").find("option[value="+chooseYear+"]").attr("selected",false);
    chooseYear=timeYear
    $("#timeYChoose").find("option[value="+timeYear+"]").attr("selected",true);
}

//合同选择反向形成新的轴体
function computeBody(arg){
    if(currentBodyData=="contract"){
        contractTimeContent=timeContent.filter(function(item,index,arr){
            var retFlag=false;
            item.contractInfo.forEach(function(currentValue, currentindex, currentarr){
                if(currentValue.sum==arg){
                    retFlag=true
                }
            })
            if(retFlag){
                return item
            }
        })
    }
    if(contractTimeContent.length>0){
        creadBody()
    }
}

//页面渲染完成调用时间选择添加、监听年度变更
$(document).ready(function(){
    all_timeitem=timeContent.length;//轴体内容个数首次渲染默认
    addTimeOption();
    choosedYear();
    $("#timeYChoose").change(function(value) {
        event.preventDefault();
        choosedYear();
    })
    $(".circleC").live('click',function(){
        event.preventDefault();
        $(".circleC").removeClass("circle_choose");
        $(".boxC").removeClass("boxC_choose");
        $(this).addClass("circle_choose");
        $(this).siblings('.boxC').addClass("boxC_choose");
    });
    $(".boxC").live('click',function(){
        event.preventDefault();
        $(".boxC").removeClass("boxC_choose boxC_bg");
        $(".circleC").removeClass("circle_choose");
        $(this).addClass("boxC_choose boxC_bg");
        $(this).siblings(".circleC").addClass("circle_choose");
    })
    $('.lef').live('click', function(){
        event.preventDefault();
        scroll(scroll_num,"right");
    });
    $(".rig").live('click',function(){
        event.preventDefault();
        scroll(scroll_num,"left");
    })
    $("#contractChooseBtn").click(function(){
        event.preventDefault();
        var sum=$("#contractChoose").val();
        currentBodyData="contract";
        computeBody(sum);
        $("#timeYChoose").find("option[value="+chooseYear+"]").attr("selected",false);
        $("#timeYChoose").find("option[value='']").attr("selected",true);
    })
});

// window.οnresize=function(){  
//     $(window).width();
//     $(function creadBody() {
//         //创建案件历史
//         $(".container").timeAxis(timeContent);
//     });
// }  

