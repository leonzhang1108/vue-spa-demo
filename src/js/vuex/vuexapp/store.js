'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Vue = require('vue');
var Vuex = require('vuex');

Vue.use(Vuex);

var state = {
    notes: [],
    activeNote: {},
    count: 8
};

var mutations = {
    ADD_NOTE: function ADD_NOTE(state) {
        var newNote = {
            text: 'New Email',
            favorite: false
        };
        state.notes.push(newNote);
        state.activeNote = newNote;
    },
    EDIT_NOTE: function EDIT_NOTE(state, text) {
        state.activeNote.text = text;
    },
    DELETE_NOTE: function DELETE_NOTE(state) {
        state.notes.$remove(state.activeNote);
        state.activeNote = state.notes[0];
    },
    TOGGLE_FAVORITE: function TOGGLE_FAVORITE(state) {
        state.activeNote.favorite = !state.activeNote.favorite;
    },
    SET_ACTIVE_NOTE: function SET_ACTIVE_NOTE(state, note) {
        state.activeNote = note;
    }
};

module.exports = new Vuex.Store({
    state: state,
    mutations: mutations
});
