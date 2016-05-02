'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.breadcrumbChange = function breadcrumbChange(ref, e) {
    var dispatch = ref.dispatch;
    dispatch('BREADCRUMB_CHANGE', e.target.hash);
};
