'use strict';

var vueUtil = require('../../../component/util/vue-util.vue').methods
Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.clickToCurrent = function clickToCurrent(ref, e) {
    var dispatch = ref.dispatch;
    dispatch('CLICK_TO_CURRENT', e.target);
};

exports.addTabMenu = function addTabMenu(ref, e) {
    var dispatch = ref.dispatch;
    dispatch('ADD_TAB_MENU', e.target);
};

exports.getMenus = function getMenus(ref) {
    var dispatch = ref.dispatch;
    console.log('action start')
    vueUtil.ajax_get({
        requestData: {},
        url: 'src/component/data/menu.json',
        scope: this,
        cbFunc: function (res) {
            console.log(res)
            dispatch('GET_MENUS',res.data);
        }
    })
};

exports.deleteTab = function deleteTab(ref, e) {
    var dispatch = ref.dispatch;
    dispatch('DELETE_TAB', e.target);
};
