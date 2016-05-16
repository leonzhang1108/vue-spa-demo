<script type="text/javascript">

    module.exports = {
        props: {
            "id": String
        },
        init: function(){
            console.log('init')
            Vue.component('vue_select',require('bundle?lazy!./vue_select.vue'))
            Vue.component('vue_input',require('bundle?lazy!./vue_input.vue'))
            Vue.component('vue_filter',require('bundle?lazy!./vue_filter.vue'))
            Vue.component('vue_date_interval',require('bundle?lazy!./vue_date_interval.vue'))
        },
        attached:function(){
            var component = this
            this.$nextTick(function(){
                console.log(component.$children)
            })
        }
    }
</script>
<template>　
    <div id="{{id}}" name="{{name}}" class="vue-form">
        <slot></slot>
    </div>
</template>

<style>
    .input-wrap {
        width: auto;
        float: left;
        margin-right: 10px;
    }
</style>
