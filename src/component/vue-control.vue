<template>
    <input_select id="select" name="select" :data-list="dataList"></input_select>
</template>
<script>
    var input_select = require('./input/select.vue')
    export default{
        data(){
            return{
                msg:'hello vue',
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
            input_select
        }
    }
</script>