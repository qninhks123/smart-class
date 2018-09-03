<template>
    <div class="window">
        <!-- HEADER -->
       <Header></Header> 
       <el-row class="" style="padding:0px">
           <!-- MENU -->
            <el-col :span="3" id="menu"><Menu></Menu></el-col>
            <!-- CONTENT -->
            <el-col :span="21" id="view" v-loading='$store.state.loading' element-loading-background="rgba(0, 0, 0, 0)">
                <ViewHeader></ViewHeader>
                <router-view id="view-content"></router-view>
            </el-col>
            <div class="dialog-area">
                <el-dialog ref="terminal" title="Máy chủ" :visible.sync="$store.state.dialog.terminal" >
                    <div class="console-area">
                        <Console></Console>
                    </div>
                </el-dialog>
                <el-dialog ref="subjecte_editor" title="Tạo môn học" :visible.sync="$store.state.dialog.subject_editor" >
                    <div class="">
                        <SubjectEditor></SubjectEditor>
                    </div>
                </el-dialog>
                <el-dialog ref="account_editor" title="Tạo học sinh" :visible.sync="$store.state.dialog.account_editor" >
                    <div class="">
                        <AccountEditor></AccountEditor>
                    </div>
                </el-dialog>
                <Info></Info>
            </div>
       </el-row>
    </div>
</template>
<script>
    import ajax from "axios";

    export default {
        async beforeCreate(){
            
        },
        
    }
</script>



