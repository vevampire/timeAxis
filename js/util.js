//数字判断
function u_Num(para){
    if(typeof(para)=='number'&&!isNaN(para)){
        return true
    }else{
        return false
    }
}
//是否为空值判断
function u_empty(para){
    if(para=="" || para==undefined){
        return false
    }else{
        return true
    }
}
