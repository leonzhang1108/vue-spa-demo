<template>
    <input type="text" v-model="lastName" />
    <!--<div>{{lastName}}</div>-->
</template>
<script>
    module.exports = {
        data: function(){
            return{
                lastName:'hello vue'
            }
        },
        methods:{
            changeChild:function(){

            }
        }
    }
</script>