<template>
    <div>
        <!-- ROW - I -->
        <div class="view-content row">
            <!-- PROPS - AREA -->
            <CardView :value="Math.round(db_size/db_max_size*100)" top="Đã sử dụng" :center="db_size+' Mb'" :bottom="`Con ${ db_max_size-db_size } trong ${ db_max_size } Mb`" id="db-prop" icon="storage"></CardView>
            <CardView :value="Math.round(state.online/accounts.length*100)" top="Online" :center="state.online"     :bottom="`Trong ${ accounts.length } h/s`" id="online-prop" icon="school"></CardView>
            <CardView :value="Math.abs(Math.round(inc_ave/pre_ave*100))"  top="Điểm TB" :center="pre_ave+inc_ave" :bottom="(inc_ave>=0?`Tăng `:`Giảm `)+Math.abs(inc_ave)+` điểm so với BKT trước`" id="score-prop"  icon="poll"></CardView>
            <CardView :value="Math.round(inc_high/pre_high*100)" top="Điểm cao" :center="inc_high+pre_high" :bottom="`Tăng `+inc_high+` điểm so với BKT trước`" id="high-prop" icon="show_chart"></CardView>
        </div>

        <!-- ROW - II -->
        <div class="row" style="margin-top:30px;height:300px;" >
            <div class="col-lg-8">
                <Chart v-model="done" v-if="!$store.state.loading" :subject="subject" :data="ave_list" type="spline" ref="chart_line"></Chart> 
            </div>
            <div class="col-lg-4">
                <PieChart v-if="!$store.state.loading" :data="pie"></PieChart> 
            </div>
        </div>
    </div>
</template>
<script>
    import ajax from "axios";
    export default {
        data(){
            return{
                subject    : [],
                test       : [],
                pie        : [],
                accounts   : [],
                pre_ave    : 0,
                inc_ave    : 0,
                ave_list   : [],     
                acc_total  : [],           
                pie        : [0,0,0,0],
                Math       : Math,
                pre_high   : 0,
                inc_high   : 0,
                db_size    : 0,
                db_max_size: 0,
                db         : null,
            };
        },
        methods:{
  
        },
        computed:{
            state(){
                return this.$store.state;
            }
        },
        async mounted(){
            // GET STUDENT COUNT
            
            this.accounts  = (await ajax.get("/db/accounts")).data;
            this.test      = (await ajax.get("/db/tests")).data.filter(t=>t.status=='done');
            this.subject   = (await ajax.get("/db/subject")).data;
            this.db        = (await ajax.get("/db")).data;
            this.db_size = this.db.size;
            this.db_max_size = this.db.max_size;
            
            this.ave_list = this.test.map(t=>{
                return {
                    total: t.ave,
                    name: t.name,
                    subject: t.subject,
                };
            });
            
            let tg = [0,0,0,0];
            this.accounts.map(acc=>{
                switch (acc.luc_hoc) {
                    case 'Tốt': tg[0]++; break;
                    case 'Khá': tg[1]++; break;
                    case 'TB' : tg[2]++; break;
                    case 'Kém': tg[3]++; break;
                }
            });
            this.pie = tg;

            this.pre_ave = Math.round(this.accounts.reduce((a,b)=>a+b.pre_ave,0)/this.accounts.length);
            this.inc_ave = Math.round(this.accounts.reduce((a,b)=>a+b.next_ave,0)/this.accounts.length)-this.pre_ave;

            this.next_high = this.test.reduce((a,b)=>a+b.high,0); this.test.splice(this.test.length-1,1)
            this.pre_high  = this.test.reduce((a,b)=>a+b.high,0);
            this.inc_high  = this.next_high - this.pre_high;
      
            this.$store.state.loading = false;  
        },
        method:{

        }
    }
</script>


