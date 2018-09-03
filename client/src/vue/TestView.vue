<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="Kết quả" name="first">
                <div class="test-view-area row">
                    <!-- PROPS - AREA -->
                    <div class="test-view-props col-lg-4">
                        <!-- Tên Điểm TB Mã Điểm Câu hỏi  -->
                        <div class="props thread-dark">
                            <p><span class="key">Tên</span><i class="value">{{ test.name }}</i></p>
                            <p><span class="key">Mã</span><i class="value">{{ test.testcode }}</i></p>
                            <p><span class="key">Điểm</span><i class="value">{{ test.score }}</i></p>
                            <p><span class="key">Thời gian</span><i class="value">{{ time() }}</i></p>
                        </div>
                        <div class="props">
                            <p><span class="key">Điểm cao</span><i class="value">{{ total.filter(t=>t.total>=90).length }}</i></p>
                            <p><span class="key">Điểm TB</span><i class="value">{{ ave }} (%)</i></p>
                        </div>
                        <PieChart
                            v-if="!this.$store.state.loading"
                            :data="pie">
                        </PieChart>
                    </div>

                    <!-- TABLE - AREA -->
                    <div class="test-view-table col-lg-8">
                        <div class="test-view-table-header">Kết quả</div>
                        <table ref="table" data-pagination="true" data-search="true">
                            <thead>
                                <tr>
                                    <th data-sortable="true" data-field="id">ID</th>
                                    <th data-field="name">Tên</th>
                                    <th data-sortable="true" data-field="total">Điểm (%)</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Câu hỏi" name="second">
                <!-- QUESTION - VIEW -->
                <el-row style="margin-top:20px">
                    <!-- QUESTION - AREA -->
                    <el-col :span="20">
                        <div class="question-area">
                            <!-- SLIDE - SHOW -->
                            <div class="question-index">
                                <h2>Câu {{ edit+1 }} / {{ test.question}}</h2>
                            </div>
                            <el-carousel ref="slide" :interval="999999" :autoplay="false" arrow="always" class="slide" @change="i=>edit=i">
                                <el-carousel-item v-for="(q,i) in question" :key="i" class="question">
                                    <div class="question-content" v-html="q.content"></div>
                                    <el-row style="margin-top:20px;margin-left:10%">
                                        <el-col :span="11" ><div :class="{ answer:true,['answer-active']:q.correct=='A' }" v-html="q.A"></div></el-col>
                                        <el-col :span="11" ><div :class="{ answer:true,['answer-active']:q.correct=='B' }" v-html="q.B"></div></el-col>
                                    </el-row>
                                    <el-row style="margin-top:20px;margin-left:10%">
                                        <el-col :span="11" ><div :class="{ answer:true,['answer-active']:q.correct=='C' }" v-html="q.C"></div></el-col>
                                        <el-col :span="11" ><div :class="{ answer:true,['answer-active']:q.correct=='D' }" v-html="q.D"></div></el-col>
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
            </el-tab-pane>
        </el-tabs> 
    </div>
</template>
<script>
    import ajax from "axios";
    import { Message } from "element-ui";

    export default {
        props: ['side'],
        data(){
            return{
                activeName: 'first',
                edit: 0,
                test: {}, 
                total: [],
                history: [],
                pie: [0,0,0,0],
                accounts: [],
                ave: 0,
                question: [],
            };
        },
        methods:{
            change(i){
                this.edit = i;
                this.$refs.slide.setActiveItem(i);
            },
            time(){
                let __time = this.test.time;
                let days  = Math.floor(__time/86400); __time -= days*86400;
                let hours = Math.floor(__time/3600);  __time -= hours*3600;
                let mins  = Math.floor(__time/60);    __time -= mins*60;
                let secs  = __time;
                let data = days + ' : '
                    + (hours<=9?'0'+String(hours):hours) + ' : '
                    + (mins<=9?'0'+String(mins):mins) + ' : '
                    + (secs<=9?'0'+String(secs):secs);
                return data;
            }
        },
        async mounted(){
            this.test = ( await ajax.get(`/db/tests/${ this.$route.params.testcode }`) ).data;
            this.question = ( await ajax.get(`/db/tests/${ this.$route.params.testcode }/question`) ).data;
            this.accounts = ( await ajax.get(`/db/accounts`) ).data
            this.total = ( await ajax.get(`/db/tests/${ this.$route.params.testcode  }/total`) ).data;
            
            // DANH_GIA
            let tg = [0,0,0,0];
            this.total.map(t=>{
                if(t.total >= 85) return tg[0] += 1;
                if(t.total >= 55) return tg[1] += 1;
                if(t.total >= 25) return tg[2] += 1;
                return tg[3] += 1;
            });
            this.pie = tg;

            // DIEM TB
            this.ave = Math.round(
                this.total.reduce((a,b)=>a+b.total,0)/
                this.total.length
            );

            // 
            let self = this;

            $(this.$refs.table).bootstrapTable({
                data: this.total.map((t,i)=>{
                    return {
                        id: i+1,
                        name: this.accounts.find(a=>a.code==t.code).name,
                        total: t.total
                    };
                }),
                onClickRow(row){
                    let {code} = self.accounts.find(a=>a.name==row.name);
                    self.$router.push(`/test/${ self.$route.params.testcode }/info/${ code }`);
                }
            });

            this.$store.state.loading = false;

        }
    }
</script>

