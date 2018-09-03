<template>
    <div class="__test-area">
        <!-- ROW -->
        <div class="row">
            <div class="__test-area-1 col-lg-6">
                <!-- ACTIVE -->
                <div class="__test-item __test-active">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" >
                            <i class="el-icon-upload"></i><span>Đang Hoạt động</span>
                            <span class="__test-counter">{{ active.length }}</span>
                        </div>
                        <div class="__test-list">
                            <div v-for="t in active" :key="t" class="__test-text" @click="$router.push(`/test/${t.testcode}`)">
                                <span class="__test-name">{{ t.name }}</span>
                                <span class="__test-time">{{ t.createdAt }}</span>
                            </div>
                        </div>
                        
                    </el-card>
                </div>
                <!-- SAVE -->
                <div class="__test-item __test-save">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <i class="el-icon-edit"></i><span>Đang hoàn thiện</span>
                            <span class="__test-counter">{{ save.length }}</span>
                        </div>
                        <div class="__test-list">
                            <div v-for="t in save" :key="t" class="__test-text" @click="$message.warning('Đang hoàn thiện')">
                                <span class="__test-name">{{ t.name }}</span>
                                <span class="__test-time">{{ t.createdAt }}</span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <div class="__test-area-2 col-lg-6">
                <!-- DONE -->
                <div class="__test-item __test-done">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <i class="el-icon-edit-outline"></i><span>Đã hoàn thành</span>
                            <span class="__test-counter">{{ done.length }}</span>
                        </div>
                        <div class="__test-list">
                            <div v-for="t in done" :key="t" class="__test-text" @click="$router.push(`/test/${t.testcode}`)">
                                <span class="__test-name">{{ t.name }}</span>
                                <span class="__test-time">{{ t.createdAt }}</span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>                                                  
</template>
<script>
    import ajax from "axios";

    export default {
        data(){
            return {
                test: [],
                save: [],
                done: [],
                active: [],
            };
        },
        async mounted(){
            this.test = (await ajax.get("/db/tests")).data;

            this.test.map(t=>{
                this[t.status].unshift(t);
            });

            this.$store.state.loading = false;
        }
    }
</script>
