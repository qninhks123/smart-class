<template>
    <div class="area-404">
        <div class="icon-404">
            <img src="/img/404.svg">
        </div>
        <div class="text-404">
            <h1>404</h1>
            <h3>PAGE NOT FOUND</h3>
        </div>
    </div>
</template>
<script>
export default {
    mounted(){
        this.$store.state.loading = false;
    }
}
</script>

