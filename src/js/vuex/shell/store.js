'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state = {
    currentMenu: 'index',
    tabMenus: [],
    menus: [{
        path: '/services',
        name: '货物状态'
    }, {
        path: '/home',
        name: '货物详情'
    }, {
        path: '/about',
        name: '账单制作'
    }, {
        path: '/calender',
        name: '账单详情'
    }, {
        path: '/test',
        name: '场站物料管理'
    }, {
        path: '/table',
        name: '表格demo'
    }, {
        path: '/form',
        name: '表单DEMO'
    }, {
        path: '/forbidden',
        name: 'forbidden'
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
