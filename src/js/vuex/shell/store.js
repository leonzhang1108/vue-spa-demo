'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state = {
    currentMenu: 'index',
    tabId: 0,
    tabMenus: [],
    menus: []
};

var mutations = {
    CLICK_TO_CURRENT: function CLICK_TO_CURRENT(state, current){
        var currentPage = 0
        console.log(current)
        $.each(state.tabMenus, function (index, menu) {
            if (menu.id == current.id) {
                currentPage = index
                state.tabMenus[index].current = true
            } else {
                state.tabMenus[index].current = false
            }
        })
        router.go($(current).data('router')+'?currentPage='+currentPage)
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
        console.log(state.tabMenus)
    },
    GET_MENUS:function GET_MENUS(state, menus) {
        state.menus = menus
    }
};

module.exports = new Vuex.Store({
    state: state,
    mutations: mutations
});
