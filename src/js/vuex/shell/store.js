'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state = {
    currentMenu: 'index',
    menus: [{
        path: '/services',
        name: '货物状态',
        current: false
    }, {
        path: '/home',
        name: '货物详情',
        current: false
    }, {
        path: '/about',
        name: '账单制作',
        current: false
    }, {
        path: '/calender',
        name: '账单详情',
        current: false
    }, {
        path: '/test',
        name: '场站物料管理',
        current: false
    }, {
        path: '/table',
        name: '表格demo',
        current: false
    }, {
        path: '/forbidden',
        name: '',
        current: false
    }]
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
