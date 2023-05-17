<template>
    <!-- MENU-BAR -->
    <el-menu id="Menu"
        fixed default-active="home" 
        style="font-size:12px"
        class             = "el-menu-vertical-demo" 
        background-color  = "#343a40" 
        text-color        = "#889097" 
        active-text-color = "white">
        <!-- AVATAR -->
        <el-menu-item index="avatar" style="padding:0px;height:110px">
            <div class="avatar-img">
                <img :src="$store.state.account.src" style="width:100%;heigh:120px;" />
            </div>
            <div class="avatar-shadow">
                <p>{{ account.name }}</p>
            </div>
        </el-menu-item>
        <!-- HOME -->
        <el-menu-item index="home" @click="$router.push('/')"><i class="el-icon-menu"></i><span>Trang chủ</span></el-menu-item>

        <!-- TEST -->
        <el-menu-item index="test" @click="$router.push('/test')"><i class="el-icon-document">
            </i><span>Kiểm tra</span>
        </el-menu-item>

        <!-- RANK -->
        <el-menu-item index="rank" @click="$router.push('/rank')"><i class="material-icons">assessment</i>
            <span>Xếp hạng</span>
        </el-menu-item>

        <!-- DATABASES -->
        <el-menu-item index="databases-1"  @click="$router.push('/accounts')"> 
            <i class="material-icons">contacts</i>Tài khoản
        </el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        computed: {
            account(){
                return this.$store.state.account;
            }
        }
    }
</script>


