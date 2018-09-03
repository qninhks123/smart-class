<template>
    <el-dialog class="info" width="25%" ref="info" title="" :visible.sync="$store.state.dialog.info">
        <div class="" slot="title">
            <img v-if="mode=='view'" :src="account.src">
            <img v-if="mode=='edit'" :src="_src">   
        </div>
        <el-form label-position="left" label-width="100px">
            <el-form-item label="Tên">
                <i>{{ account.name }}</i>
            </el-form-item>
            <el-form-item label="Mã">
                <i>{{ account.code }}</i>
            </el-form-item>
            <el-form-item label="Mật khẩu">
                <el-input v-show="mode=='edit'" v-model="_password"></el-input>
                <i v-show="mode=='view'">{{ account.password }}</i>
            </el-form-item>
            <el-form-item label="Avatar">
                <el-select v-show="mode=='edit'" v-model="_src">
                    <el-option v-for="i in img" :key="i" :value="i">
                        {{ i }}
                    </el-option>
                </el-select>
                <i v-show="mode=='view'">{{ account.src }}</i>
            </el-form-item>
            <el-row v-show="mode=='view'">
                <el-button type="success" @click="$store.state.dialog.info=false" plain>OK</el-button>
                <el-button type="primary" @click="mode = 'edit'" plain>Thay đổi</el-button>
            </el-row>
            <el-row v-show="mode=='edit'">
                <el-button type="success" @click="put" plain>Lưu</el-button>
                <el-button type="danger"  @click="mode='view'" plain>Hủy</el-button>
            </el-row>
        </el-form>
    </el-dialog>
</template>
<script>
    import ajax from "axios";

    export default {
        data(){
            return{
                _password: "",
                _src:      "",
                mode: 'view',
                account: {},
                img: [ 
                    '/img/nature_1.jpg',
                    '/img/nature_2.jpg',
                    '/img/nature_3.jpg',
                    '/img/nature_4.jpg',
                    '/img/nature_5.jpg',
                    '/img/nature_6.jpg',
                ]
            };
        },
        computed:{
            
        },
        methods:{
            async put(){
                let wait = this.$message.info({
                    message:'Dang gui ...',
                    duration:0,
                });
                
                let { status } = (await ajax.put(`/db/accounts/${ this.account.code }`,{
                    password: this._password,
                    src: this._src,
                })).data;
                wait.close();
                if(status=='success'){
                    this.account.password = this._password;
                    this.account.src = this._src;
                    this.$message.success("Sửa thành công !");
                    this.mode = 'view';
                }
            }
        },
        mounted(){
            this.account = this.$store.state.account;
        },
        watch:{
            '$store.state.account'(to,from){
                this.account = to;
                this._src = to.src;
                this._password = to.password;
            },
            _src(to){
                console.log(to);
            },
            
        }

    }
</script>
