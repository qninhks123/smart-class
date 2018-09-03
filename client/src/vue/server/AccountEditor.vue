<template>
    <div class="subject-editor">
        <hr>
        <el-form ref="form" label-align="left" label-width="120px">
            <!-- NAME -->
            <el-form-item label="Tên">
                <el-input v-model="name" class="col-lg-6"></el-input>
            </el-form-item>
            <!-- CODE -->
            <el-form-item label="Mã">
                <el-input v-model="code" class="col-lg-6"></el-input>
            </el-form-item>
            <!-- COLOR -->
            <el-form-item label="Mật khẩu">
                <el-input v-model="password" class="col-lg-6" show-alpha></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="post">Tạo</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import ajax from "axios";

    export default {
        data(){
            return {
                name: '',
                code: '',
                password: '',
            };
        },
        methods:{
            async post(){
                if(this.name==''||this.code==''||this.password=='') return;
                let wait = this.$message.info({
                    message:'Dang gui ...',
                    duration:0,
                });
                let status = (await ajax.post("/db/accounts/",{
                    name: this.name,
                    code: this.code,
                    password: this.password
                })).data.status;

                wait.close();
                if(status == 'success'){
                    this.$message.success("Tạo thành công !");
                    this.name = '';
                    this.code = '';
                    this.password = '';
                } else {
                    this.$message.error("Lỗi dữ liệu !");
                }
            }
        }
    }
</script>
