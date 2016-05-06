'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state = {
    currentMenu: 'index',
    tabId: 1,
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
    CLICK_TO_CURRENT: function CLICK_TO_CURRENT(state, current){
        $.each(state.tabMenus, function (index, menu) {
            if (menu.id == current.id) {
                state.tabMenus[index].current = true
            } else {
                state.tabMenus[index].current = false
            }
        })
        console.log($(current).data('router'))
        router.go($(current).data('router'))
    },
    ADD_TAB_MENU: function ADD_TAB_MENU(state, current){
        $.each(state.tabMenus, function(index, menu){
            state.tabMenus[index].current = false
        })
        state.tabMenus.push({
            id: state.tabId++,
            name: current.innerHTML,
            component: $(current).parent().attr('href').replace('#!/',''),
            current: true
        })
    },
    DELETE_TAB: function DELETE_TAB(state, current){
        var id = $(current).parent().attr('id')
        $.each(state.tabMenus, function(index, menu){
            if(id == menu.id){
                state.tabMenus.splice(index, 1)
                return false
            }
        })
        console.log(id)
    }
};

module.exports = new Vuex.Store({
    state: state,
    mutations: mutations
});
