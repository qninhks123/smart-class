<template>
    <el-row>
        <!-- STEPS -->
        <el-col :span="2" style="margin:auto;height:fit-content;">
            <el-steps :space="260" :active="step" finish-status="success" direction="vertical" align-center>
                <el-step name="props">   <i slot="title" class="step-icon el-icon-edit"></i></el-step>
                <el-step name="question"><i slot="title" class="step-icon el-icon-edit-outline"></i></el-step>
                <el-step name="post">    <i slot="title" class="step-icon el-icon-upload"></i></el-step>
            </el-steps>
        </el-col>

        <!-- CONTENT -->
        <el-col :span="22" id="editor" style="height:80vh;" >
            <!-- PROPS -->
            <div class="container-fluid col-lg-10 form" v-show="page=='props'" >
                <h3>Thông Tin</h3>
                <el-form id="form" :model="form" label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="Tên"><el-input  v-model="test.name"></el-input ></el-form-item>
                            <el-form-item label="Mã"><el-input v-model="test.testcode"></el-input></el-form-item>
                            <el-form-item label="Câu hỏi"><el-input-number controls-position="right" v-model.lazy="test.question"></el-input-number ></el-form-item>
                        </el-col>
                        <el-col :span="12" class="score-setting">
                            <el-form-item><i style="color:gray;">Cài đặt điểm nhanh</i></el-form-item>
                            <el-form-item label="Điểm"><el-input-number controls-position="right" v-model="score_setting"></el-input-number></el-form-item>
                            <el-form-item label=""><el-button @click="changeScore">Thay đổi</el-button></el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="Môn" >
                        <el-select placeholder="Chọn môn" v-model="test.subject">
                            <el-option v-for="s in subject" :key="s" :label="s.name" :value="s.subject"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Thời gian">
                        <el-col :span="5">
                            <el-input-number controls-position="right" placeholder="Ngày" v-model.number="time[0]"></el-input-number>
                        </el-col><el-col :span="1">&nbsp;</el-col>
                        <el-col :span="5">
                            <el-input-number controls-position="right" placeholder="Giờ" v-model.number="time[1]"></el-input-number>
                        </el-col><el-col :span="1">&nbsp;</el-col>
                        <el-col :span="5">
                            <el-input-number controls-position="right" placeholder="Phút" v-model.number="time[2]"></el-input-number>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>

            <!-- QUESTION -->
            <div class="container-fluid row " v-show="page=='question'">
                <!-- EDITOR -->
                <div class="editor col-lg-8">
                    <div class="editing">Câu hỏi &nbsp;{{ edit+1 }}</div><hr>
                    <!-- SLIDE - SHOW -->
                    <el-carousel ref="slide" :interval="999999" :autoplay="false" arrow="always" class="slide" @change="changeQuestion">
                        <el-carousel-item v-for="q in question" :key="q">
                            <div class="question">
                                
                                <div class="question-props row">
                                    <el-input placeholder="Diem" class="col-lg-7" v-model.number="q.score"></el-input>
                                    <el-select placeholder="Dap An" class="col-lg-5" v-model="q.correct">
                                        <el-option 
                                            v-for="a in ['A','B','C','D']"
                                            :key="a" :label="a" :value="a">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="question-edit" >
                                    <Ckeditor v-model="q.content"></Ckeditor>
                                    <el-row style="margin-top:20px;">
                                        <el-col class="answer answer-edit" :span="11"><input v-model="q.A" /></el-col>
                                        <el-col class="answer answer-edit" :span="11"><input v-model="q.B" /></el-col>
                                    </el-row>
                                    <el-row style="margin-top:20px;">
                                        <el-col class="answer answer-edit" :span="11"><input v-model="q.C" /></el-col>
                                        <el-col class="answer answer-edit" :span="11"><input v-model="q.D" /></el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel></div>
                <!-- MENU -->
                <div class="col-lg-2">
                    <QuestionMenu 
                        @change="i=>change(i)"
                        :active='edit'
                        :data="question.map((q,i)=>kt(i)?'success':'warning')">
                    </QuestionMenu>
                </div>
            </div> 


            <!-- POST -->
            <div class="container-fluid row" v-show="page=='post'">
                <div class="post-test-area col-lg-8 row" style="margin-left:15%">
                    <el-button @click="post">POST</el-button>
                    <el-button @click="save">SAVE</el-button>
                </div>
            </div>

            <!-- BUTTON -->
            <el-button-group style="margin-left:40%;margin-top:30px;">
                <el-button type="primary" @click="page=prev()" icon="el-icon-arrow-left">Trước</el-button>
                <el-button type="primary" @click="page=next()" >&nbsp;Sau&nbsp;<i class="el-icon-arrow-right el-icon-right"></i></el-button>
            </el-button-group>
        </el-col>
    </el-row>
</template>
<script>
    import Vue  from "vue";
    import ajax from "axios";

    export default {
        data(){
            return{
                edit:0,
                score_setting: 0,
                content:'',
                page:'props',
                time:[0,0,0],
                test:{
                    name:'',
                    testcode:'', 
                    question:'',
                    subject:'',
                    time:0,
                    score:0
                },
                question:[],
                subject: [],
            };
        },
        async mounted(){
            this.subject = (await ajax.get("/db/subject")).data;
            this.$store.state.loading = false;
        },
        computed:{
            step(){
                if(this.page=="props")    return 1;
                if(this.page=="question") return 2;
                if(this.page=="post")     return 3;
                
            },
            done(){
                let props = this.time.every(v=>typeof v=='number') 
                    && this.test.name != '' 
                    && this.test.code != '' 
                    && this.test.question >= 1 
                    && this.test.subject != '';
                let question = this.question.every(q=>this.kt(q));
                return props && question;
            },
            __time(){
                return this.time[0]*86400+this.time[1]*3600+this.time[2]*60;
            }
        },
        methods:{
            next(){
                switch (this.page) {
                    case "props":    return "question"
                    case "question": return "post"
                }
                return this.page;
            },
            prev(){
                switch (this.page) {
                    case "question": return "props"
                    case "post":     return "question"
                }
                return this.page;
            },
            changeQuestion(e){
                this.edit = e;

            },
            change(e){
                this.edit = e;
                this.$refs.slide.setActiveItem(e);
            },
            kt(i){
                let q = this.question[i];
                return q.score != 0 &&
                    q.A != '' && q.B != '' &&
                    q.C != '' && q.D != '' &&
                    q.content != '' &&
                    typeof q.score == 'number'
            },
            changeScore(){
                this.question.map(q=>q.score=this.score_setting);
            },
            async save(){
                let wait = this.$message.info({
                    message:'Dang gui ...',
                    duration:0,
                });
                let { data } = await ajax.put(`/db/tests/${this.test.testcode}`,{
                    test : JSON.stringify({ test:this.test, question:this.question })
                });

                if(data.status == "success"){
                    wait.close();
                }
                this.$router.push("/tools/test/"+String(this.test.testcode));

            },
            async post(){
                let wait = this.$message.info({
                    message:'Dang gui ...',
                    duration:0,
                });
                let send;
                this.test.time = this.__time;
                this.test.score = 0;
                this.question.map(q=>this.test.score+=q.score);

                let { data } = await ajax.post('/db/tests',{test:JSON.stringify(send = {
                    test : this.test,
                    question: this.question,

                })});
                wait.close();
                if(data.status == 'success'){
                    this.$message.success("Danh thanh cong !");
                } else{
                    this.$notify.error({ title:'',
                        dangerouslyUseHTMLString: true,
                        message: '<h6>Lỗi dữ liệu !!</h6>'
                    });
                }
            },
        },
        watch:{
            ['test.question'](val){
                this.question = [];
                for(let i=0;i<val;i++){
                    this.question.push({
                        correct:'A',
                        content:'',
                        A:'', B:'',
                        C:'', D:''
                    });
                }
            
            }
        },
    }
</script>

