'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state = {
    currentMenu: 'index',
    tabMenus: [{
        id: 1,
        name: 'leon',
        component: 'component1',
        current: true
    },{
        id: 2,
        name: 'cissy',
        component: 'component2',
        current: false
    }],
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
    CLICK_TO_CURRENT: function CLICK_TO_CURRENT(state, current){
        var currentId = current.id
        console.log(current.id)
        //var currentMenus = state.tabMenus
        $.each(state.tabMenus, function (index, menu) {
            if (menu.id == currentId) {
                state.tabMenus[index].current = true
            } else {
                state.tabMenus[index].current = false
            }
        })
        //state.tabMenus = currentMenus
        console.log(state.tabMenus)
    }
};

module.exports = new Vuex.Store({
    state: state,
    mutations: mutations
});
