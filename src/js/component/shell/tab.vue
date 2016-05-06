<template>
    <div class="single-tab" v-bind:class={'current-tab':current} @click="clickToCurrent" id={{id}} >
        {{id}} {{name}}  {{component}}  {{current}}
    </div>
</template>
<script>

    var actions = require('../../vuex/shell/actions');
    module.exports = {
        vuex: {
            actions: {
                clickToCurrent: actions.clickToCurrent
            }
        },
        props:['id', 'name', 'component', 'current']
    }
</script>
<style>
    .single-tab {
        float: left;
        margin-right: 10px;
    }
    .current-tab{
        background: blue;
    }
</style>