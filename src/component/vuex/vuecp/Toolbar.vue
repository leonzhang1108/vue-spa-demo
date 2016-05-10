<template>
    <div id="toolbar">
        <i @click="addNote" class="glyphicon glyphicon-plus"></i>
        <i @click="toggleFavorite"
           class="glyphicon glyphicon-star"
           :class="{starred: activeNote.favorite}"></i>
        <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
    </div>
</template>

<script>
    var actions = require('../../../js/vuex/vuexapp/actions');

    module.exports = {
        vuex: {
            getters: {
                activeNote: function(state) {
                    return state.activeNote
                }
            },
            actions: {
                addNote: actions.addNote,
                deleteNote: actions.deleteNote,
                toggleFavorite: actions.deleteNote
            }
        }
    }
</script>
