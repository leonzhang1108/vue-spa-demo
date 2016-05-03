<template>
    <toolbar></toolbar>
    <notes-list></notes-list>
    <editor></editor>
</template>
<script>

var Toolbar = require('./vuecp/Toolbar.vue');
var NotesList = require('./vuecp/NotesList.vue');
var Editor = require('./vuecp/Editor.vue');

var store = require("./../../vuex/store");
module.exports = {
    store,
    components: {
        Toolbar,
        NotesList,
        Editor
    }
}
</script>
