<template>
    <div class="window">
        <!-- HEADER -->
       <Header></Header> 
       <el-row class="" style="padding:0px">
           <!-- MENU -->
            <el-col :span="3" id="menu"><Menu></Menu></el-col>
            <!-- CONTENT -->
            <el-col :span="21" id="view" v-loading='$store.state.loading'>
                <ViewHeader></ViewHeader>
                <router-view id="view-content" :key="$route.fullPath"></router-view>
            </el-col>
            <div>
                <Info></Info>
            </div>
       </el-row>
    </div>
</template>
<script>
    import ajax from "axios";

    export default {
        async beforeCreate(){
            console.log(this.$store.state.account = (await ajax.get("/my-account")).data);
        },
        
    }
</script>


