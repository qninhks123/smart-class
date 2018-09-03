<template>
    <div>
    
        <div class="test-view-area row">
            <!-- PROPS - AREA -->
            <div class="test-view-props col-lg-4">
                <!-- Tên Điểm TB Mã Điểm Câu hỏi  -->
                <div class="props thread-dark">
                    <p><span class="key">Tên</span><i class="value">{{ test.name }}</i></p>
                    <p><span class="key">Mã</span><i class="value">{{ test.testcode }}</i></p>
                    <p><span class="key">Điểm</span><i class="value">{{ test.score }}</i></p>
                </div>
                <div class="props">
                    <p><span class="key">Trả lời đúng</span><i class="value">{{ correct }} / {{ test.question }}</i></p>
                    <p><span class="key">Điểm</span><i class="value">{{ total.total }} (%)</i></p>
                </div>
            </div>

            <!-- TABLE - AREA -->
            <div class="test-view-table col-lg-8">
                <div class="test-view-table-header">Kết quả</div>
                <table ref="table" data-pagination="true" data-search="true">
                    <thead>
                        <tr>
                            <th data-sortable="true" data-field="id">STT</th>
                            <th data-field="choice">Câu trả lời</th>
                            <th data-sortable="true" data-field="correct">Đáp án</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>           
    </div>
</template>
<script>
    import ajax from "axios";
    import { Message } from "element-ui";

    export default {
        props: ['side'],
        data(){
            return{
                test: {}, 
                total: {},
                history: [],
                question: [],
                correct: 0,
            };
        },
        methods:{
        },
        async mounted(){
            this.test     = ( await ajax.get(`/db/tests/${ this.$route.params.testcode }`) ).data;
            this.question = ( await ajax.get(`/db/tests/${ this.$route.params.testcode }/question`) ).data;
            this.history  = ( await ajax.get(`/db/tests/${ this.$route.params.testcode }/history/${ this.$route.params.code }`) ).data;
            this.total    = ( await ajax.get(`/db/tests/${ this.$route.params.testcode }/total/${ this.$route.params.code }`) ).data[0];
            
            // CORRECT
            let correct = 0;
            this.question.map(q=>{
                let choice = this.history.find(h=>h.index==q.index).choice;
                if(choice == q.correct){
                    correct += 1;
                }
                q.choice = choice;
            });
            this.correct = correct;

            $(this.$refs.table).bootstrapTable({
                data: this.question.map((q,i)=>{{
                    q.id = i+1;
                    return q;
                }}),
            });

            this.$store.state.loading = false;

        }
    }
</script>

