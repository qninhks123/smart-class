<template>
    <div class="question-menu-area">
        <h4>Danh Sach</h4>
        <ul class="list-group question-menu">
            <li 
                class = "list-group-item question-item" 
                v-for = "(t,i) in data"
                :key  = "i"
                @click= "$emit('change',i)"
                :class= "{ ['list-group-item-'+t]:true,'question-item-active': active==i }"><span class="question-item-span">Câu {{ i+1 }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props : ['data','active'],
    }
    
</script>

