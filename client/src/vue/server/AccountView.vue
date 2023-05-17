<template>
    <div class="accounts-table-area">
        <div class="student-list-header">
            <h2>Danh sách học sinh</h2>
            
        </div>
        <table 
            class="db-table table" 
            data-toolbar="#too_lbar"
            data-pagination="true" 
            data-search="true" 
            style="text-align:center"
            data-url="/db/accounts" 
            ref="table">
            <thead class="">
                <tr>
                    <th data-sortable="true">ID</th>
                    <th>Mã</th>
                    <th data-sortable="true">Tên</th>
                    <th>Mật Khẩu</th>
                    <th>Avatar</th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
    import ajax from "axios";

    export default {
        data(){
            return{
                accounts: [],
            };
        },
        async beforeCreate(){
          //  this.accounts = (await ajax.get("/db/accounts")).data;
        },
        mounted(){
            let self = this;
            this.$nextTick(()=>{ 
                $(this.$refs.table).bootstrapTable({
                    columns: [{
                        field: 'id',
                        title: 'ID'
                    }, {
                        field: 'code',
                        title: 'Mã'
                    }, {
                        field: 'name',
                        title: 'Tên'
                    },{
                        field: 'password',
                        title: 'Mật Khẩu',
                    },{
                        field: 'src',
                        title: 'Avatar',
                        formatter(value, row, index, field) {
                            return `<img class="fixed-img" src="${ value }"/>`
                        }
                    }],
                    onClickRow(row,el,f){
                       // console.log(this);
                        self.$router.push(`/accounts/${ row.code }`);
                    }
                });
                this.$store.state.loading = false;
                
            });
                      
        }
    }
</script>