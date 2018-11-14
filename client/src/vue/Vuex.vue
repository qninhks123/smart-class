<template>
    <div>
        {{ data.count }}
        <button
            @click="inc">A
        </button>
    </div>
</template>
<script>
import { mapState } from "vuex";

export default { 
    computed : mapState(["data"]),
    created(){
        this.$store.state.loading = false;
    },
    methods : {
        inc(){
            
            this.data.count += 1;
        }
    }
}
</script>

