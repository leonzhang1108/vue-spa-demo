<template>
    <div id="toolbar">
        <button type="button" class="btn" @click="addNote">
            <i class="glyphicon glyphicon-plus">新建邮件</i>
        </button>
        <button type="button" class="btn" @click="toggleFavorite" :class="{starred: activeNote.favorite}">
            <i class="glyphicon glyphicon-star">关注</i>
        </button>
        <button type="button" class="btn" @click="deleteNote">
            <i class="glyphicon glyphicon-remove">删除</i>
        </button>
    </div>
</template>

<script>
    //import { addNote, deleteNote, toggleFavorite } from '../../../vuex/actions'
    var actions = require('../../../vuex/vuexapp/actions');
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
