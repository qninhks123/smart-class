<template>
    <div class="props-item crad col-lg-3">
        <div class="card-body" :id="id" :style="{ backgroundColor }">
            <div class="props-title">
                <div class="props-title row"><i class="props-icon material-icons">{{ icon }}</i></div>
                <h6>{{ top }}</h6><h4>{{ center }}</h4>
                <el-progress :percentage="value" :width="width" color="white" :stroke-width="3"></el-progress>
                <h6>{{ bottom }}</h6>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['height','width','icon','backgroundColor','max','value','id','top','center','bottom']
}
</script>

