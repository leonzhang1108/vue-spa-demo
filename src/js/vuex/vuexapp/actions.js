'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var addNote = exports.addNote = function addNote(ref) {
    var dispatch = ref.dispatch;

    dispatch('ADD_NOTE');
};

var editNote = exports.editNote = function editNote(ref, e) {
    var dispatch = ref.dispatch;

    dispatch('EDIT_NOTE', e.target.value);
};

var deleteNote = exports.deleteNote = function deleteNote(ref) {
    var dispatch = ref.dispatch;

    dispatch('DELETE_NOTE');
};

var updateActiveNote = exports.updateActiveNote = function updateActiveNote(ref, note) {
    var dispatch = ref.dispatch;

    dispatch('SET_ACTIVE_NOTE', note);
};

var toggleFavorite = exports.toggleFavorite = function toggleFavorite(ref) {
    var dispatch = ref.dispatch;
    console.log(ref);
    dispatch('TOGGLE_FAVORITE');
};
