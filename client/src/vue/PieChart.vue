<template>
    <el-row style="background:white">
        <div ref="pie" ></div>
    </el-row>
</template>
<script>
      
    export default {
        props : ['data'],
        data(){
            return{
            }
        },
        mounted(){this.$nextTick(()=>{
            // console.log(this.data);
            this.chart = Highcharts.chart(this.$refs.pie, {
                    // SETTING
                    
                    chart:    {
                        type : 'pie',
                        backgroundColor: 'rgb(255,255,255)',
                        height:'70%',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                    },
                    title:    { text: "Đánh giá" },
                    tooltip: {
                        crosshairs: [true],
                        pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
                    },
                    series: [{
                        name: '(%)',
                        data:[
                            {  name: "Tốt", y : this.data[0],sliced: true,selected: true },
                            {  name: "Khá", y : this.data[1] },
                            {  name: "TB",  y : this.data[2] },
                            {  name: "Kém", y : this.data[3] }
                        ]
                    }],
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false,
                            },
                            showInLegend: true,
                            colors: ['lightskyblue','lightgreen','#ffff00','#ff9900'], 
                        }
                    },
                });
                $('.highcharts-credits').html(``);
        })},

    }
</script>



