<template>
    <div>
        <div class="view-content">
            <!-- PROPS --> 
            <div class="row props-area" style="margin-bottom:30px">
                <!-- I --><!-- Tên Điểm TB Mã Điểm Câu hỏi  -->
                <div class="col-lg-4 props-1">   
                    <p><i class="material-icons">school</i><span class="key">Tên</span><i class="value">{{ account.name }}</i></p>
                    <p><i class="material-icons">insert_comment</i><span class="key">Mã</span><i class="value">{{ account.code }}</i></p>
                    <p><i class="material-icons">speaker_notes</i><span class="key">Điểm TB</span><i class="value">{{ ave }}</i></p>
                    <p><i class="material-icons">stars</i><span class="key">Lực học</span><b class="value" style="font-size: 18px">{{ luc_hoc }}</b></p>           
                </div>
                <!-- II -->
                <div class="col-lg-8 " style="padding-right: 0px">
                    <div class="props-2">
                        <table class="subject-area">
                            <!-- HEADER -->
                            <thead>
                                <tr>
                                    <th v-for="s in subject" :key="s">
                                        <div class="subject-header">{{ s.name }}</div>
                                    </th>
                                </tr>
                            </thead>
                            <!-- CONTENT -->
                            <tbody>
                                <tr>
                                    <td v-for="s in subject" :key="s">
                                        <div class="subject-body">
                                            <div 
                                                v-for="i in getStatus(s.subject)" 
                                                :key="i" data-toggle="title"
                                                :title="i.testname+' - '+i.total"
                                                :class="[ i.inc<0?'subject-status-error':(i.inc==0?'subject-status-warning':'subject-status-success') ]"
                                                class="subject-status">
                                                <span>
                                                    <b><i style="padding-top:5px;" class="no-white material-icons">{{ i.inc>=0?'file_upload':'file_download' }}</i> {{ abs(i.inc) }} đ</b>
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                           <!-- FOOTER -->
                           <tfoot>
                               <tr>
                                   <td v-for="s in subject" :key="s">
                                       <div class="subject-footer" >
                                           <b>TB</b> <i style="float:right;color:black;">{{ s.ave }}</i>
                                       </div>
                                   </td>
                               </tr>
                           </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <!-- CHART -->
            <div class="chart-area row">
                <div class="line-chart col-lg-8">
                    <Chart v-if="!this.$store.state.loading" type="spline" :data="test_data" :subject="subject"></Chart>
                </div>
                <div class="pie-chart col-lg-4">
                    <PieChart v-if="!this.$store.state.loading" :data="pie"></PieChart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ajax from "axios";

    export default {
        props : ['route'],
        data(){
            return{
                test_data:[],
                subject: [],
                done: false,
                status: [],
                account: {},
                ave:'',
                total: [],
                pie: [0,0,0,0],
                
            };
        },

        methods:{
            abs: v=>Math.abs(v),
            getStatus(sub){
                let total = this.total.filter(t=>t.subject==sub);
                let list = [];

                // CREATING LIST ...
                total.map((t,i)=>{
                    let change = t.total;
                    // GET TOTAL
                    if(i!=0){
                        change = t.total - total[i-1].total;
                    }
                    list.unshift({
                        inc: change,
                        testname: t.testname,
                        total: t.total,
                    });
                });
                return list;
            },
        },
        async mounted(){
            // GET
            if(this.$route.params.code==undefined){
                this.account = (await ajax.get(`/my-account`)).data;
            } else {
                this.account = (await ajax.get(`/db/accounts/${ this.$route.params.code }`)).data;
            }
            let test   = (await ajax.get("/db/tests")).data;
            this.total = (await ajax.get(`/db/total/${ this.account.code }`)).data.filter(tt=>{
                let rc = test.find(t=>t.testcode==tt.testcode);
                if(rc==undefined){
                    return false;
                }
                return rc.status == 'done';
            }); 
            // if (this.account == null) this.$router.push('/*');
            // DIEM_TB
            this.ave = Math.round(
                this.total.reduce((a,b)=>a+b.total,0)
                /this.total.length
            );

            // TEST
            

            this.test_data = this.total.map((t,i)=>{
                let __test = test.find(__t=>__t.testcode==t.testcode);
                if(__test==undefined){
                    console.log(t.testcode);
                    this.total[i].subject = 'None';
                    this.total[i].testname= 'None';
                }else{
                    this.total[i].subject = __test.subject;
                    this.total[i].testname= __test.name;
                }
                
                return {
                    total: t.total,
                    subject: this.total[i].subject,
                    name: this.total[i].testname
                };
            });

            // SUBJECT
            this.subject = (await ajax.get("/db/subject")).data;
            this.subject.map(s=>{
                let test = this.total.filter(t=>t.subject==s.subject);
                let ave = Math.round(test.reduce((a,b)=>a+b.total,0)/test.length);
                s.ave = ave==NaN?0:ave;
            });
            

            // PIE
            let tg = [0,0,0,0];
            this.total.map(t=>{
                if(t.total >= 75) return tg[0] += 1;
                if(t.total >= 50) return tg[1] += 1;
                if(t.total >= 25) return tg[2] += 1;
                return tg[3] += 1;
            });
            this.pie = tg;


            this.$store.state.loading = false;
        },
        computed:{
            luc_hoc(){
                if( this.ave>=75 ) return 'Tốt';
                if( this.ave>=50 ) return 'Khá';
                if( this.ave>=25 ) return 'TB';
                return 'Kém';
            }
        },
        watch:{

        } 
    }
</script>



