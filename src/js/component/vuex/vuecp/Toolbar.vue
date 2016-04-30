<template>
    <div id="toolbar">
        <button type="button" class="btn" @click="addNote">
            <i class="glyphicon glyphicon-plus">新建邮件</i>
        </button>
        <button type="button" class="btn" @click="toggleFavorite">
            <i @click="toggleFavorite" class="glyphicon glyphicon-star" :class="{starred: activeNote.favorite}">关注</i>
        </button>
        <button type="button" class="btn" @click="deleteNote">
            <i @click="deleteNote" class="glyphicon glyphicon-remove">删除</i>
        </button>
    </div>
</template>

<script>
    import { addNote, deleteNote, toggleFavorite } from '../../../vuex/actions'

    module.exports = {
        vuex: {
            getters: {
                activeNote: function(state) {
                    return state.activeNote
                }
            },
            actions: {
                addNote,
                deleteNote,
                toggleFavorite
            }
        }
    }
</script>
