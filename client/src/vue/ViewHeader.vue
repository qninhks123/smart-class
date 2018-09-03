<template>
    <div class="view-header">
        <span>{{ header[link[0]] }}</span>
        <el-breadcrumb separator="/" class="path" style="float:right">
            <el-breadcrumb-item :to="{ path:'/' }">Trang Chủ</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(p,i) in _path" :key="i" :to="{ path:link[i] }">{{ p }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
    export default {
        created(){
        },
        data(){
            return{
                header:{
                    "/"         :  'Trang Chủ',
                    '/test'     :  'Bài Kiểm Tra',
                    '/accounts' :  'Tài khoản',
                    '/rank'     :  'Xếp hạng'
                },
                translate:{
                    'test'    :  'Kiểm Tra',
                    'tools'   :  'Công cụ',
                    'accounts':  'Tài khoản',
                    'info'    :  'Thông tin',
                    'work'    :  'Làm Bài',
                    'rank'    :  'Xếp hạng',
                }
            };
        },
        computed:{
            _path(){
                let list = this.$route.path.split('/');
                list.splice(0,1);
                return list.map(l=>{
                    return this.translate[l]==undefined?l:this.translate[l];
                });
                
            },
            link(){
                let list = this.$route.path.split('/');
                list.splice(0,1);
                let str  = '';
                return list.map(v=>{
                    str+="/"+v;
                    return str;
                })
                
            }
        }
        
    }
</script>

