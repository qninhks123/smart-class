<template>
    <el-row style="background:white;"> 
        <!-- MENU -->
        <el-col class="chart-menu" :span="2" style="min-height:100%;">
            <!-- <el-popover placement="right" ref="choices" width="150" trigger="hover" clearable>
                <el-select placeholder="Hien Thi" v-model="mode" @input="change" filterable>
                    <el-option  value="Tat Ca">Tat ca</el-option>
                    <el-option  v-for="i in subject" :key="i" :value="i.name">{{ i.name }}</el-option>
                </el-select>
            </el-popover>
            <div class="chart-menu-item" @click="reload"><i class="material-icons" >replay</i></div>
            <div class="chart-menu-item"><i class="material-icons" v-popover:choices>attach_file</i></div>

            <div class="chart-menu-item" style="bottom:0px;"><i class="material-icons">setting</i></div> -->
            <el-menu class="el-menu-vertical-demo" :collapse="true">
                <el-menu-item></el-menu-item>
                
                <!-- RELOAD -->
                <el-menu-item index="1" @click="changeData(sub.subject)">
                    <i class="material-icons">replay</i>
                    <span slot="title">Tai Lai</span>
                </el-menu-item>
                

                <!-- CHANGE - SUBJECT -->
                <el-submenu index="2">
                    <template slot="title"><i class="material-icons">attach_file</i></template>
                    <el-menu-item-group>
                        <span slot="title">Hien Thi</span>
                        <el-menu-item index="Tat Ca" @click="changeData('tat_ca')">Tất cả</el-menu-item>
                        <el-menu-item v-for="s in subject" :key="s.name" :index="s.name" @click="changeData(s.subject)">{{ s.name }}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                
                <!-- CHANGE - TYPE -->
                <el-submenu index="3">
                    <template slot="title"><i class="material-icons">assessment</i></template>
                    <el-menu-item-group>
                        <span slot="title">Bieu Do</span>
                        <el-menu-item index="1-1" @click="changeType('line')">Đường thẳng</el-menu-item>
                        <el-menu-item index="1-2" @click="changeType('column')">Cột</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-menu-item></el-menu-item>
            </el-menu>
        </el-col>

        <!-- LINE - CHART wfwfwf-->
        <el-col :span="22">
            <div class="" ref="chart"></div>
        </el-col>
    </el-row>
        
    
</template>
<script>
      
    export default {
        props : ['data','subject','a'],
        model:{
            prop  : 'a',
            event : 'input',
        },
        data(){
            return{
                sub:{},
                type: 'line'
            }
        },
        mounted(){this.$nextTick(()=>{
            this.changeData("tat_ca");
        })},
        methods:{
            changeType(type){
                this.type = type;
                this.a += 1;
                this.$emit("input",this.a);
                this.reload();
            }, 
            changeData(sub){
                if(sub == "tat_ca"){
                    this.sub = { subject:'tat_ca',name:'Tất cả' }
                } else {
                    this.sub = this.subject.find(v=>v.subject==sub);
                }
                this.reload()
            },
            reload(){
                $(this.$refs.chart).html('');
                // Create
                this.chart = Highcharts.chart(this.$refs.chart, {
                    // SETTING
                    
                    chart:    {type : this.type,backgroundColor: 'rgb(255,255,255)',height:'37.5%'},
                    title:    { text: "Biểu đồ học tập" },
                    subtitle: { text: this.sub.name},
                    
                    tooltip: {
                        crosshairs: [true]
                    },
                    xAxis:    {
                        categories: this.sub.subject == "tat_ca"
                            ? this.data.map(d=>d.name)
                            : this.data.filter(d=>d.subject==this.sub.subject).map(v=>v.name),
                        visible:true,
                        labels: {enabled:false}
                    },
                    yAxis: {min: 0, max: 100,title:'% tra loi dung'},
                    series: [{
                        color: this.sub.color,
                        name:  this.sub.name,
                        data:  this.sub.subject == "tat_ca"
                            ? this.data.map(d=>d.total)
                            : this.data.filter(d=>d.subject==this.sub.subject).map(v=>v.total)
                    }],
                });
                $('.highcharts-credits').html(``);
                
            }
        }
    }
</script>


