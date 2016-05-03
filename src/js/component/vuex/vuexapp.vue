<template>
  <div id="app">
    <toolbar></toolbar>
    <notes-list></notes-list>
    <editor></editor>
  </div>
</template>

<script>
  var Toolbar = require('./vuecp/Toolbar.vue');
  var NotesList = require('./vuecp/NotesList.vue');
  var Editor = require('./vuecp/Editor.vue');
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
