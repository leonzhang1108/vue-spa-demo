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
        name: 'forbidden',
        current: false
    }]
};

var mutations = {
    BREADCRUMB_CHANGE: function BREADCRUMB_CHANGE(state, current) {
        var currentMenus = state.menus
        $.each(state.menus, function (index, menu) {
            if (current.indexOf(menu.path) > 0) {
                currentMenus[index].current = true
            } else {
                currentMenus[index].current = false
            }
        })
        state.menus = currentMenus
    }
};

module.exports = new Vuex.Store({
    state: state,
    mutations: mutations
});
