<template>
    <vue_form id='test_form'>
        <vue_select id="select" name="select" label="test_select"  :data-list="dataList"></vue_select>
        <vue_input id="input" name="input" label="test_input"></vue_input>
    </vue_form>

</template>
<script>
//    var vue_select = require('bundle?lazy!./input/vue_select.vue')
//    var vue_input = require('bundle?lazy!./input/vue_input.vue')
    var vue_form = require('bundle?lazy!./input/form.vue')
    export default{
        data: function(){
            return{
                dataList:[{display:'全部',value: 'all'},{display:'是',value: 'yes'},{display:'否',value: 'no'}]
            }
        },
        components:{
            vue_form/*,
            vue_input,
            vue_select*/
        }
    }
</script>