<template>
    <!-- HEADER -->
    <el-menu :default-active="activeIndex" style="" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <!-- TITLE -->
        <el-menu-item index="1">
            <router-link to="/" href="index.html" class="navbar-brand" style="margin:0;padding:0px">
                <b>My</b> Class
            </router-link>
        </el-menu-item>
        <!-- TOOLS -->
        <el-submenu index="2" style="margin-left:50px">
            <template slot="title">Tiện ích</template>
            <el-menu-item-group title="Công cụ">
                <router-link to="/tools/test"><el-menu-item index="2-1"><i class="material-icons">add_box</i>Tạo bài kiểm tra</el-menu-item></router-link>
                <el-menu-item index="2-2" @click="$store.state.dialog.account_editor=true"><i class="material-icons">add_box</i>Tạo học sinh</el-menu-item>
                <el-menu-item index="2-3" @click="$store.state.dialog.subject_editor=true"><i class="material-icons">add_box</i>Tạo môn học</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group title="Khác">
                <el-menu-item index="2-4" @click="$store.state.dialog.terminal=true">
                    <i class="material-icons">dns</i>Máy chủ
                </el-menu-item>
            </el-menu-item-group>
            
        </el-submenu>
        <!-- MY-ACCOUNT -->
        <el-submenu class="row" index="3" style="float:right;margin-right:50px" id="account">
            <!-- AVATAR -->
            <template slot="title">
                <img style="width:30px;height:30px;border-radius:50%;" :src="$store.state.account.src">
                <span style="font-size:larger"> Admin </span>
            </template>
            <el-menu-item index="3-1" @click="$store.state.dialog.info = true"><i class="material-icons">info_outline</i>Thông tin</el-menu-item>
            <el-menu-item index="4-2" @click="logout"><i class="material-icons">input</i>Đăng xuất</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
    import ajax from "axios";

    export default {
        computed:{
            account(){
                return this.$store.state.account;
            }
        },
        methods:{
            async logout(){
                let {status} = (await ajax.delete("/login")).data;
                if(status="success"){
                    document.location.href = '/login';
                }
            }
        }
    }
</script>



