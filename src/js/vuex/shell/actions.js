'use strict';

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

exports.deleteTab = function deleteTab(ref, e) {
    var dispatch = ref.dispatch;
    dispatch('DELETE_TAB', e.target);
};
