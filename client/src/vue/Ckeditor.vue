<template>
    <div ref="editor" class="ckeditor" :style="{ height, width:'100%' }">

    </div>
</template>
<script>
    export default {
        props : ['height','inline','value'],
        data(){
            return {
                ck:{},
            }
        },
        mounted(){
            CKEDITOR.disableAutoInline = true;
            if(this.inline){
                CKEDITOR.inline(this.$refs.editor,{
                    height:'25px',
                    toolbar: [{ 
                        name: 'basicstyles', 
                        groups: [ 'basicstyles', 'cleanup' ], 
                        items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat', 'PasteFromWord', '-','BidiLtr', 'BidiRtl' , 'Undo', 'Redo' ] 
                    }]
                });
            } else {
                
                this.ck = CKEDITOR.replace(this.$refs.editor,{height : "120px",});
                window.ck = this.ck;
                ck.on('change',v=>this.$emit('input',v.editor.getData()));

                ck.setData(this.value);
            }
        },
        // watch:{
        //     value(to, from){
        //         if(!this.hasChanged){
        //             this.ck.setData(to);
        //             this.hasChanged = true;
        //         };
        //     }
        // }
    }
</script>

