<template>
    <toolbar></toolbar>
    <notes-list></notes-list>
    <editor></editor>
</template>
<script>

var Toolbar = require('bundle?lazy!./vuecp/Toolbar.vue');
var NotesList = require('bundle?lazy!./vuecp/NotesList.vue');
var Editor = require('bundle?lazy!./vuecp/Editor.vue');
var store = require("../../vuex/vuexapp/store");

module.exports = {
    store,
    components: {
        Toolbar,
        NotesList,
        Editor
    }
}
</script>
