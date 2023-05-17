<template>
    <div class="rank-area">
        <div class="rank">
            <table ref="table" class="rank-table" data-pagination="true" data-search="true">
                <thead>
                    <tr>
                        <th data-sortable="true" data-field="stt">STT</th>
                        <th data-field="code">Mã</th>
                        <th data-field="name">Tên</th>
                        <th data-sortable="true" data-field="ave">Điểm (%)</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</template>
<script>
    import ajax from "axios";

    export default {
        data(){
            return {
                ave: [],
                total: [],
                accounts: [],
                test: [],
            };
        },
        async mounted(){
            this.total    = (await ajax.get("/db/total")).data;
            this.accounts = (await ajax.get("/db/accounts")).data;
            this.test     = (await ajax.get("/db/tests")).data;

            // GET AVE
            this.ave = this.accounts.map(a=>{
                return {
                    name: a.name,
                    code: a.code,
                    ave : Math.round(
                        this.total.filter(t=>t.code==a.code).reduce((a,b)=>a+b.total,0) / 
                        this.test.length
                    )
                }
            }).sort((a,b)=>b.ave-a.ave);

            // SET TABLE
            let self = this;
            $(this.$refs.table).bootstrapTable({
                data: this.ave.map((a,i)=>{ a.stt=i+1; return a }),
                columns: [{
                    field: 'stt',
                    formatter(value, row, index, field) {
                        if([1,2,3,4,5].indexOf(value)!=-1){
                            return `<i class="rank-icon rank${ value } material-icons">filter_${ value }</i>`
                        } else {
                            return `<b class="rank-stt">${value}</b>`
                        }
                    },
                }],
                onClickRow(row){
                    self.$router.push(`/accounts/${ row.code }`);
                }
            });

            this.$store.state.loading = false;
        }
    }
</script>
