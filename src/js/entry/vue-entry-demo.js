/**
 * Created by leon on 2016/4/23.
 */

//global.$ = global.jQuery = require('jquery');
require("bootstrap/dist/css/bootstrap.css");
global.ES = require('../common/ui')
global._ = require('underscore')
require("../../css/vue-demo.css");
global.Vue = require('vue')
require("bootstrap/dist/js/bootstrap.min.js");
require('../../../node_modules/purecss/build/pure-min.css');
require('../../css/layouts/side-menu.css');
//国际化
global.localize_en = require('../common/localize/en');
global.localize_zh = require('../common/localize/zh');
global.localize_ja = require('../common/localize/ja');

require.ensure(['vue', 'vue-router','vue-i18n'], function (require) {

    // init shell
    var vueHead = require('bundle?lazy!../component/shell/head.vue')
    var vueMenu = require('bundle?lazy!../component/shell/menu.vue')
    var vueBreadcrumb = require('bundle?lazy!../component/shell/breadcrumb.vue')
    Vue.component('vue-head', vueHead)
    Vue.component('vue-menu', vueMenu)
    Vue.component('vue-breadcrumb', vueBreadcrumb)

    // Locale
    var VueLocale = require('vue-i18n')

    var localize = {};
    localize.ja = localize_ja;
    localize.zh = localize_zh;
    localize.en = localize_en;
    Vue.use(VueLocale,{locales:localize});
    Vue.config.lang = 'zh';

    //init all components
    var VueRouter = require('vue-router')
    var Home = require('bundle?lazy!../component/home.vue');
    var About = require('bundle?lazy!../component/about.vue');
    var Services = require('bundle?lazy!../component/services.vue');
    var Parent = require('bundle?lazy!../component/leon/parent.vue');
    var Watch = require('bundle?lazy!../component/watch.vue');
    var Vuex = require('bundle?lazy!../component/vuex/vuexapp.vue');
    var Table = require('bundle?lazy!../component/table/tableapp.vue');
    var paging = require('../component/paging/paging.vue')
    var zPagenav = require('vue-pagenav')

    Vue.use(require('vue-resource'))

    zPagenav.default.template = paging.template
    Vue.use(zPagenav)
    Vue.use(VueRouter)

    var Bar = Vue.extend({
        template: '<p>This is bar!</p>'
    })

    var App = Vue.extend({})

    var router = new VueRouter()

    router.map({
        '/home': {
            component: Home,
            subRoutes: {
                '/services': {
                    component: Services
                },
                '/calender': {
                    component: Home
                }
            }
        },
        '/about': {
            component: About
        },
        "/contact": {
            component: Bar
        },
        "/services": {
            component: Services
        },
        "/calender": {
            component: Vuex
        },
        "/test": {
            component: Watch
        },
        "/table": {
            component: Table
        }
    })

    router.start(App, '#app')


})
