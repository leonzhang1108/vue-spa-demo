<template>
    <header-component/>
    <div>this is template body</div>
    <other-component/>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>

    var table = require('bundle?lazy!./table.vue')
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            table
        }
    }
</script>