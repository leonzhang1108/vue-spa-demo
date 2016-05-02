'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state = {
    currentMenu: 'index'
};

var mutations = {
    BREADCRUMB_CHANGE: function BREADCRUMB_CHANGE(state, text) {
        state.currentMenu = text;
    }
};

module.exports = new Vuex.Store({
    state: state,
    mutations: mutations
});
