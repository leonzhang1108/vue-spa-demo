'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var addNote = exports.addNote = function addNote(ref) {
    var dispatch = ref.dispatch;

    dispatch('ADD_NOTE');
};
