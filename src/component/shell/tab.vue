<template>
    <div class="single-tab" v-bind:class={'current-tab':current} @click="clickToCurrent" id={{id}} data-router={{component}} >
        {{id}} {{name}}  {{component}}<i class="fa fa-times" aria-hidden="true" @click.stop.prevent="deleteTab"></i>
    </div>
</template>
<script>

    var actions = require('../../js/vuex/shell/actions');
    module.exports = {
        vuex: {
            actions: {
                clickToCurrent: actions.clickToCurrent,
                deleteTab: actions.deleteTab
            }
        },
        props:['id', 'name', 'component', 'current']
    }
</script>
<style>
    .single-tab {
        float: left;
        margin-right: 10px;
        cursor: pointer;
    }
    .current-tab,
    .single-tab:hover{
        background: #cdcdcd;
    }
</style>