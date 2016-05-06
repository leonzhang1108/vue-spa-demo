<template>
    <div class="single-tab" v-bind:class={'current-tab':current} @click="clickToCurrent" id={{id}} >
        {{id}} {{name}}  {{component}}  {{current}}<i class="fa fa-times" aria-hidden="true" @click.stop.prevent="deleteTab"></i>
    </div>
</template>
<script>

    var actions = require('../../vuex/shell/actions');
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
    .current-tab{
        background: #cdcdcd;
    }
</style>