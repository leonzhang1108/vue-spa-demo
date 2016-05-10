<template>
    <input_select id="select" name="select" :data-list="dataList"></input_select>
    <vue_input id="input" name="input"></vue_input>
</template>
<script>
    var input_select = require('./input/select.vue')
    var vue_input = require('./input/input.vue')
    export default{
        data(){
            return{
                dataList:[{
                    display:'全部',
                    value: 'all'
                },{
                    display:'是',
                    value: 'yes'
                },{
                    display:'否',
                    value: 'no'
                }]
            }
        },
        components:{
            input_select,
            vue_input
        }
    }
</script>