'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.clickToCurrent = function clickToCurrent(ref, e) {
    var dispatch = ref.dispatch;
    dispatch('CLICK_TO_CURRENT', e.target);
};
