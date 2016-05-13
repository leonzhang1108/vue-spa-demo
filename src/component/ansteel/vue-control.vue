<template>
    <vue_form id='test_form' @click="formClick" v-my-directive="">
        <vue_select id="select" name="select" label="test_select" :data-list="dataList"></vue_select>
        <vue_input id="input" name="input" label="test_input"></vue_input>
        <div style="clear: both;"></div>
    </vue_form>
</template>
<script>
    var vue_form = require('bundle?lazy!./../widget/form.vue')
    var actions = require('../../js/vuex/table/actions')
    var store = require('../../js/vuex/table/store')
    module.exports = {
        ready: function(){
            console.log('rrrrrrrrrrrrrrrrrrready')
            console.log(ES.ui.get('select'))
        },
        data: function(){
            return{
                dataList:[{display:'全部',value: 'all'},{display:'是',value: 'yes'},{display:'否',value: 'no'}]
            }
        },
        components:{
            vue_form
        },
        methods: {
            formClick: function(){
                var childItems = []
                $.each(this.$children[0].$children, function(_, item){
                    childItems.push(ES.ui.get(item.$el.id))
                })
                this.$children[0].bindForm(childItems)
                console.log('done')
            }
        }
    }
</script>