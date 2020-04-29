//联动饼状图数据格式
var formatPiesData={
    choosed:0,//默认为选中第一组数据
    title:[],
    totalData:{
        legend:[],
        series:[],
    },
    detailData:[]
       
};
//饼状图数据
var formatPieData2={
    title:'',
    legend:[],
    series:[]
};
//第一类型柱状图
var formatBarData={
    title:'',
    dataSet:[]
}
//第二类型柱状图
var formatBarData2={
    title:'',
    dataSet:[]
}
//数据处理
function handleData(){
    //联动饼状图数据处理
    formatPiesData.title.push(piesData.name);
    for (var item of piesData.itemlist) {
        formatPiesData.totalData.legend.push({name:item.itemname});
        formatPiesData.totalData.series.push({value:item.value,name:item.itemname});
        formatPiesData.detailData.push({title:[],legend:[],series:[]});
        for (var detail  of item.itemlist) {
            formatPiesData.detailData[formatPiesData.detailData.length-1].legend.push({name:detail.itemname});
            formatPiesData.detailData[formatPiesData.detailData.length-1].series.push({value:detail.value,name:detail.itemname});
        }
    }
     //第一类柱状图数据处理
     formatBarData.title=barData.name;
     var cont=barData.itemlist[0];
     var barlist= barData.itemlist;
     var xaxisname=['xaxisname',cont.balance.name,cont.badRate.name,cont.overduerRate.name];
     formatBarData.dataSet[0]=xaxisname;
     for (var index in barlist) {
         var data= [barlist[index].bankname,barlist[index].balance.value,barlist[index].badRate.value,barlist[index].overduerRate.value];
         formatBarData.dataSet.push(data)
     }
     console.log(formatBarData);
    //第二类柱状图数据处理
    formatBarData2.title=barData2.name;
    var cont2=barData2.itemlist[0];
    var barlist2= barData2.itemlist;
    var xaxisname2=['xaxisname',cont2.consume.name,cont2.credit.name,cont2.retail.name];
    formatBarData2.dataSet[0]=xaxisname2;
    for (var index in barlist2) {
        var data= [barlist2[index].time,barlist2[index].consume.value,barlist2[index].credit.value,barlist2[index].retail.value];
        formatBarData2.dataSet.push(data)
    }
    //饼状图数据处理
    formatPieData2.title=pieData2.name;
    for (var item of pieData2.itemlist) {
        formatPieData2.legend.push(item.itemname);
        formatPieData2.series.push({value:item.value,name:item.itemname});
    }
}
handleData();

var piesContainer = echarts.init(document.getElementById('pies_container'));
var pieContainer2 = echarts.init(document.getElementById('pie_container2'));
var barContainer = echarts.init(document.getElementById('bar_container'));
var barContainer2 = echarts.init(document.getElementById('bar_container2'));

var piesOption = {
    title:[{
        id:'totalTitle',
        top: '0%',
        left: '0%',
        text:formatPiesData.title[0],
    },{
        id:'detailTitle',
        top: '55%',
        left: '0%',
        text:formatPiesData.totalData.legend[formatPiesData.choosed].title,
    }],
    grid: {
        top: '0%',
        bottom:'100%',
        left: '0%'
    },
    legend: [
        {
            id:'totalLegend',
            bottom: '45%',
            left: 'center',
            textStyle: {
                fontSize: 14,
                fontFamily: "微软雅黑"
            },
            itemWidth: 10,
            itemHeight: 16,
            itemGap: 15,
            padding: [15, 20],
            data: formatPiesData.totalData.legend
        },
        {
            id:'detailLegend',
            bottom: '0%',
            left: 'center',
            textStyle: {
                fontSize: 14,
                fontFamily: "微软雅黑"
            },
            itemWidth: 10,
            itemHeight: 16,
            itemGap: 15,
            padding: [5, 20],
            data: formatPiesData.detailData[formatPiesData.choosed].legend
        }
    ],
    tooltip: {},
    series: [{
        id:'totalPie',
        name:formatPiesData.title[0],
        type: 'pie',
        radius: 75,
        width: '100%' ,
        height: 'auto' ,
        center: ['center', '25%'],
        selectedMode: 'single',
        data: formatPiesData.totalData.series,
        color:['rgba(52,116,214,1)','rgba(52,212,120,1)','rgba(249,203,21,1)'],
        itemStyle:{
            normal:{
               borderWidth: 2,
               borderColor: '#fff'
            },
         emphasis: {
               borderWidth: 0,
               shadowBlur: 10,
               shadowOffsetX: 0,
               shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
        }   
    }, {
        id:'detailPie',
        name:formatPiesData.totalData.legend[formatPiesData.choosed].title,
        type: 'pie',
        radius: 75,
        width: '100%' ,
        height: 'auto' ,
        center: ['center', '75%'],
        data:formatPiesData.detailData[formatPiesData.choosed].series,
        color:['#1380E5','rgba(19,128,229,.6)','rgba(19,128,229,.3)'],
        itemStyle:{
            borderWidth: 2,
            borderColor: '#fff',
        }

    }]
}

var pieOption2={
    title: {
        text: formatPieData2.title,
        left: '0%'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    legend: {
        top:'10%',
        right: '0%',
        orient: 'vertical',
        textStyle: {
            fontSize: 14,
            fontFamily: "微软雅黑"
        },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
        padding: [15, 10],
        data:  formatPieData2.legend
    },
    series: [
        {
            type: 'pie',
            radius: [20, 130],
            right:'20%',
            roseType: 'area',
            label: {
                show: true,
                formatter: [
                    '{h|{b}}',
                    '{h|{d}%}'
                ].join('\n'),
                rich: {
                    h: {
                        lineHeight: 20,
                        align:'center'
                    }
                }
            },
            color:['rgba(52,116,214,1)','rgba(52,212,120,1)','rgba(249,203,21,1)'],
            data: formatPieData2.series
        }
    ]
};

var barOption = {
    title: {
        top: '0%',
        left: '0%',
        text: formatBarData.title
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        textStyle: {
            color: '#A6A6A6'
        },
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#D3D3D3'
            }
        }
    },
    legend: [
        {
            top: '8%',
            left: '0%',
            textStyle: {
                fontSize: 14,
                fontFamily: "微软雅黑"
            },
            itemWidth: 33,
            itemHeight: 16,
            itemGap: 0,
            padding: [5, 40],
            backgroundColor: '#F7F7F9'
        }
    ],
    dataset: {
        source:formatBarData.dataSet
    },
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 40
        },
        {
            type: 'slider',
            show: false,
            xAxisIndex: 0,
            start: 0,
            end: 40,
            filterMode: 'filter'
        }
    ],
    grid: {
        top: '18%',
        left: '12%'
    },
    xAxis: [
        {
            type: 'category',
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            min: 0,
            max: 1000,
            interval: 50,
            axisLabel: {
                formatter: '{value} 亿元',
                align: 'right',
                width: 110,
                padding: [5, 0]
            }
        },
        {
            type: 'value',
            min: 0,
            max: 100,
            interval: 5,
            axisLabel: {
                formatter: '{value} %'
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        }
    ],
    series: [
        {
            type: 'bar',
            yAxisIndex: 0,
            color: "#017AFF"
        },
        {
            type: 'line',
            yAxisIndex: 1,
            color: '#F7C803'
        },
        {
            type: 'line',
            yAxisIndex: 1,
            color: '#27D16D'
        }
    ]
};

var barOption2 = {
    title: {
        top: '0%',
        left: '0%',
        text: formatBarData2.title
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        textStyle: {
            color: '#A6A6A6'
        },
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#D3D3D3'
            }
        }
    },
    legend: {
        top: '8%',
        textStyle: {
            fontSize: 14,
            fontFamily: "微软雅黑"
        },
        itemWidth: 33,
        itemHeight: 16,
        itemGap: 40,
        padding: [5, 20],
        backgroundColor: '#F7F7F9'
    },
    dataset: {
        source:formatBarData2.dataSet
    },
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 40
        },
        {
            type: 'slider',
            show: false,
            xAxisIndex: 0,
            start: 0,
            end: 40,
            filterMode: 'filter'
        }
    ],
    grid: {
        top: '18%',
        left: '12%'
    },
    xAxis: [
        {
            type: 'category'
        }
    ],
    yAxis:{
        type: 'value',
        min: 0,
        max: 10000,
        interval: 1000,
        axisLabel: {
            formatter: '{value}',
            align: 'right',
            width: 110,
            padding: [5, 0]
        }
    },
    series: [
        {
            type: 'bar',
            borderWidth:5,
            itemStyle:{
                color: '#017AFF',
		        barBorderRadius: [10, 10, 0, 0],
            }
        },
        {
            type: 'bar',
            borderWidth:5,
            itemStyle:{
                color: '#F7C803',
		        barBorderRadius: [10, 10, 0, 0],
            }
        },
        {
            type: 'bar',
            borderWidth:5,
            itemStyle:{
                color: '#27D16D',
		        barBorderRadius: [10, 10, 0, 0],
            }
        }
    ]
};



// 使用刚指定的配置项和数据显示图表。
piesContainer.setOption(piesOption);
pieContainer2.setOption(pieOption2);
barContainer.setOption(barOption);
barContainer2.setOption(barOption2);

//联动饼状图事件
piesContainer.on('click', {seriesId: 'totalPie'}, function (params) {
    // 控制台打印数据的名称
    console.log(params.dataIndex);
    formatPiesData.choosed=params.dataIndex;
    piesContainer.setOption({
        title:{
            id:'detailTitle',
            text:formatPiesData.totalData.legend[formatPiesData.choosed].title
        },
        legend: {
            id:'detailLegend',
            data:  formatPiesData.detailData[formatPiesData.choosed].legend
        },
        series:{
            id:'detailPie',
            name:formatPiesData.totalData.legend[formatPiesData.choosed].title,
            data:formatPiesData.detailData[formatPiesData.choosed].series
        }

    });
});