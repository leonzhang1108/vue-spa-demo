<template>
    <vue_form id='test_form' :items=items>

    </vue_form>

</template>
<script>
    var vue_select = require('./input/vue_select.vue')
    var vue_input = require('./input/vue_input.vue')
    var vue_form = require('./input/form.vue')
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