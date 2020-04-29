$.fn.timeAxis = function(data) {
    var colors = ['#F89782', '#1A84CE', '#F7A259', '#43A6DA', '#F9BF3B','#88C7CC','#EF6D5F','#60A96E','#F03852','#3A9284'];
    /**入口*/
    //1.创建dom
    $(this).children().remove();
    $(this).append(creataTimeAxis(data));
    //2.自适应
    var rowcount = fixWindow();

    //小tip框的翻动效果
    jQuery(".boxC").slide({
        titCell: ".hd ul",
        mainCell:".detailContain",
        pnLoop:false,
        autoPage: true,
        effect: "left",
        autoPlay: false,
        scroll: 1,
        vis: 1,
        defaultIndex:0,
        trigger:"click"
    });
    
    
    /**自适应 平均分布*/
    function fixWindow() {
        //item所占的宽度 = 自身宽度+marginleft
        var item = $(".timeAxis .bd .item");
        var marginleft = parseInt(item.css('margin-left'))
        var item_w = item.width() + marginleft;

        //显示区域
        var bd_w = $(".timeAxis .bd").width();
        //能显示的个数 取整
        var rowcount = parseInt(bd_w / item_w);
        if (rowcount > item.size()) {
            //rowcount = item.size();
            $(".timeAxis .prev,.timeAxis .next").hide()
        }
        //设置新的宽度使其平均分布
        var item_w_temp = bd_w / rowcount - marginleft;
        item.width(item_w_temp);
        visble_num=rowcount;
        timeitem_width=item_w_temp;
        return rowcount;
    };
    
    /**创建dom结构*/
    function creataTimeAxis(data) {
        var timeAxis = $("<div class='timeAxis'/>");
        var wrapper = $("<div class='wrapper'></div>");
        var bd = $("<div class='bd'></div>");
        var ul_item = $("<ul/>");
        //遍历数据
        for (var value of data) {
             //生成一个item（一个完整的案件）
            var li_item = $("<li class='item'></li>");
            var content = $("<div class='content'></div>");
            var circleC = $("<a class='circleC'></a>");
            var daytimeC = $("<div class='daytime'>"+value.daytime+"</div>");
            //获取content轴上下两侧内容
            var itemnodeobj=itemNode(value);
            if(itemnodeobj.top){
                itemnodeobj.topC.appendTo(content)
            }
            if(itemnodeobj.bottom){
                itemnodeobj.bottomC.appendTo(content)
            }
             circleC.appendTo(content);
             daytimeC.appendTo(content);
             content.appendTo(li_item);
             li_item.appendTo(ul_item);
        }
        
        ul_item.appendTo(bd);
        bd.appendTo(wrapper);

        var lef = $("<a class='scrollbtn lef'><</a>");
        var rig = $("<a class='scrollbtn rig'>></a>");
        var line = $("<div class='line'/>")

        timeAxis.append(wrapper).append(lef).append(rig).append(line);
        return timeAxis;
    };
    /**显示在上方或下方的节点拼接*/
    function itemNode(value) {
        var topCount=value.customerInfo.length;
        var bottomeCount=value.contractInfo.length;
        var result={
            top:false,
            bottom:false,
            topC:jQuery("<div class='boxC topC'></div>"),
            bottomC:jQuery("<div class='boxC bottomC'></div>")
        };
        var detailC_top=$("<div class='detailContain'></div>");
        var detailC_bottom=$("<div class='detailContain'></div>");
        for (var cus of value.customerInfo) {
            var detail=$("<div class='detail'></div>")
            var tip=$("<div class='tip'></div>")
            var text=$("<div class='text'>"+cus.info+"</div>")
            detail.append(tip).append(text);
            detail.appendTo(detailC_top);
            detailC_top.appendTo(result.topC);
        }

        for (var contr of value.contractInfo) {
            var detail=$("<div class='detail'></div>")
            var tip=$("<div class='tip'></div>")
            var text=$("<div class='text'>贷款种类"+contr.contractType+"，贷款金额"+contr.sum+"</div>")
            detail.append(tip).append(text);
            detail.appendTo(detailC_bottom);
            detailC_bottom.appendTo(result.bottomC);
        }
        if(topCount==1){
            result.top=true;
            result.topC.css('height','50px');
        }else if(topCount>1){
            result.top=true;
            var pagebtn=$("<div class='pagebtn'><a class='prev'><</a><a class='next'>></a></div>");
            pagebtn.appendTo(result.topC)
        }else{
            result.top=false;
        }

        if(bottomeCount==1){
            result.bottom=true;
            result.bottomC.css('height','50px')
        }else if(bottomeCount>1){
            result.bottom=true;
            var pagebtn=$("<div class='pagebtn'><a class='prev'><</a><a class='next'>></a></div>");
            pagebtn.appendTo(result.bottomC)
        }else{
            result.bottom=false;
        }
        return result
    }
}