<template>
    <div class="subject-editor">
        <hr>
        <el-form ref="form" label-width="120px">
            <!-- NAME -->
            <el-form-item label="Tên">
                <el-input v-model="name" class="col-lg-6"></el-input>
            </el-form-item>
            <!-- CODE -->
            <el-form-item label="Mã">
                <el-input v-model="code" class="col-lg-6"></el-input>
            </el-form-item>
            <!-- COLOR -->
            <el-form-item label="Màu">
                <el-color-picker v-model="color" show-alpha></el-color-picker>
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
            return{
                color: 'rgba(65, 177, 247, 1)',
                name : '',
                code : ''
            };
        },
        mounted(){
            // this.$message.error("Lỗi dữ liệu");
        },
        methods:{
            async post(){
                if(this.color==''||this.name==''||this.color=='') return this.$message.error("Lỗi dữ liệu");
                

                let status = (await ajax.post("/db/subject",{
                    color: this.color,
                    name : this.name,
                    subject: this.code,
                })).data.status;
                console.log(status);
                if (status=='error'){
                    this.$message.error("Lỗi dữ liệu");
                } else {
                    this.$message.success("Tạo thành công");
                }
            }
        }
    }
</script>

