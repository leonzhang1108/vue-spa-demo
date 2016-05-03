<template>
    <div id="note-editor">
        <!-- <input :value="count"/> -->
        <textarea :value="activeNoteText" @input="editNote" class="form-control">
        </textarea>
    </div>
</template>

<script>
    import { editNote } from '../../../vuex/vuexapp/actions'

    module.exports = {
        vuex: {
            getters: {
                activeNoteText: function(state) {
                    return state.activeNote.text
                },
                count: function(state) {
                    return state.count
                }
            },
            actions: {
                editNote
            }
        },
        data: function (){
            return {
                counts: 10
            }
        }
    }
</script>
