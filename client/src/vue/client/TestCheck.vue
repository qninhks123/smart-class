<template>
    <div>
        <!-- PROPS -->
        <div class="question-check-props row">
            <div class="col-lg-10">
                <div class="question-check-props-header">
                    <h2>{{ test.name }}</h2>
                </div>
                <div class="question-check-props-content">
                    <span class="check-key">Ma : </span><i class="check-value"> {{ test.testcode }}</i> /
                    <span class="check-key">Mon : </span><i class="check-value"> {{ test.subject }}</i> /
                    <span class="check-key">Diem : </span><i class="check-value"> {{ test.score }}</i> 
                </div>
            </div>
            <div class="time-counter col-lg-2">
                <span class="time-item" ref="hour"></span>:
                <span class="time-item" ref="min"></span>:
                <span class="time-item" ref="sec"></span>
            </div>

        </div>
        <el-row>
            <!-- QUESTION - AREA -->
            <el-col :span="20">
                <div class="question-area">
                    <!-- SLIDE - SHOW -->
                    <div class="question-index">
                        <h2>Cau {{ edit+1 }} / {{ test.question}}</h2>
                    </div>
                    <el-carousel ref="slide" :interval="999999" :autoplay="false" arrow="always" class="slide" @change="i=>edit=i">
                        <el-carousel-item v-for="(q,i) in question" :key="i" class="question">
                            <div class="question-content" v-html="q.content"></div>
                            <el-row style="margin-top:20px;margin-left:10%">
                                <el-col :span="11" ><div @click="q.choice='A'" :class="{ answer:true,['answer-active']:q.choice=='A' }" v-html="q.A"></div></el-col>
                                <el-col :span="11" ><div @click="q.choice='B'" :class="{ answer:true,['answer-active']:q.choice=='B' }" v-html="q.B"></div></el-col>
                            </el-row>
                            <el-row style="margin-top:20px;margin-left:10%">
                                <el-col :span="11" ><div @click="q.choice='C'" :class="{ answer:true,['answer-active']:q.choice=='C' }" v-html="q.C"></div></el-col>
                                <el-col :span="11" ><div @click="q.choice='D'" :class="{ answer:true,['answer-active']:q.choice=='D' }" v-html="q.D"></div></el-col>
                            </el-row>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>

            <!-- MENU - AREA -->
            <el-col :span="4">
                <QuestionMenu 
                    :data="question.map(q=>(q.choice=='E' || q.choice==undefined )?'undone':'done')"
                    :active="edit"
                    @change="change">
                </QuestionMenu>
            </el-col>
            
        </el-row>
        <div class="save-area">
            <el-button @click="save" class="save-button" type="success">LƯU BÀI</el-button>
        </div>
    </div>
</template>
<script>
    import ajax from "axios";

    export default {
        data(){
            return{
                edit : 0,
                time : [0,0,0,0],
                test : {},
                question : []
            };
        },
        
        methods:{
            div(bt){
                return Math.floor(bt)
            },
            change(i){
                this.edit = i;
                this.$refs.slide.setActiveItem(i);
            },
            async save(){
                let status = (await ajax.put(`/db/tests/${ this.test.testcode }/history/${ this.$store.state.account.code }`,{
                    choices : JSON.stringify(this.question.map((q,i)=>{
                            return{
                                choice : q.choice,
                                index  : i+1,
                            };
                        }
                    ))
                })).data.status;
                if (status=='success'){
                    this.$message.success('Lưu Thành Công !')
                }
            }
        },
        async beforeCreate(){
            this.test     = (await ajax.get(`/db/tests/${this.$route.params.testcode}`)).data;
            if(this.test.status=='done'){
                this.$router.push(`/test/${ this.$route.params.testcode }/info`);
            }
            this.question = (await ajax.get(`/db/tests/${this.$route.params.testcode}/question`)).data.map(v=>{ v.choice=undefined; return v });
            // GET HISTORY
            let history = (await ajax.get(`/db/tests/${this.$route.params.testcode}/history/${ this.$store.state.account.code }`)).data;
            history.map((h,i)=>this.question[h.index-1].choice=h.choice);

        },
        mounted(){this.$nextTick(()=>{
          
            this.$socket.on("FINISH_TEST",({testcode})=>{
                if(testcode==this.test.testcode){
                    this.$notify.success({
                        message: 'Hết giờ !',
                        duration: 2000
                    });
                    this.save();
                }
            });
            this.$socket.on("END_TEST",({testcode})=>{
                if(testcode==this.test.testcode){
                    this.$router.push("/test");
                }
            });
            this.$socket.on("SETUP_TIME",t=>{
                if (t.testcode==this.test.testcode){

                    let __time = (t.time-=1);
                    let day  = Math.floor(__time/86400); __time-=day*86400;
                    let hour = Math.floor(__time/3600);  __time-=hour*3600;
                    let min  = Math.floor(__time/60);    __time-=min*60;
                    let sec  = Math.floor(__time);

                    $(this.$refs.hour).html(hour<10?'0'+String(hour):hour);
                    $(this.$refs.min).html(min<10?'0'+String(min):min);
                    $(this.$refs.sec).html(sec<10?'0'+String(sec):sec);
                    
                }
            });
            this.$store.state.loading = false;
            
            
        })}
    }
</script>

