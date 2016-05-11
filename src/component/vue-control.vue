<template>
    <vue_form id='test_form' :items=items></vue_form>
    <vue_input id="input_2" name="input_2" label="test_input_2"></vue_input>
</template>
<script>
    var vue_select = require('bundle?lazy!./input/vue_select.vue')
    var vue_input = require('bundle?lazy!./input/vue_input.vue')
    var vue_form = require('bundle?lazy!./input/form.vue')
    export default{
        data(){
            return{
                items:[
                    '<vue_select id="select" name="select" label="test_select"></vue_select>',
                    '<vue_input id="input" name="input" label="test_input"></vue_input>'
                ]
            }
        },
        components:{
            vue_select,
            vue_input,
            vue_form
        }
    }
</script>