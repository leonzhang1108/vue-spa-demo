<template>
    <div class="single-tab">{{id}} {{name}}  {{component}}  {{current}}</div>
</template>
<script>
    module.exports = {
        props:['id', 'name', 'component', 'current'],
        data: function(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
<style>
    .single-tab {
        float: left;
        margin-right: 10px;
    }
</style>