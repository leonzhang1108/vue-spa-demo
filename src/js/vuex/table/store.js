'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Vue = require('vue');
var Vuex = require('vuex');

Vue.use(Vuex);

var state = {
    requestObj: {}
};

var mutations = {
    ADD_NOTE: function ADD_NOTE(state) {
        var newNote = {
            text: 'New Email',
            favorite: false
        };
        state.notes.push(newNote);
        state.activeNote = newNote;
    }
};

module.exports = new Vuex.Store({
    state: state,
    mutations: mutations
});
