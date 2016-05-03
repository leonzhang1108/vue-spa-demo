/**
 * Created by leon on 2016/4/23.
 */

global.ES = require('../common/ui')
global._ = require('underscore')
global.Vue = require('vue')
global.Vuex = require('vuex')
require("jquery-ui")
require("../../css/vue-demo.css");
require("bootstrap/dist/css/bootstrap.css");
require("bootstrap/dist/js/bootstrap.min.js");
require("font-awesome-webpack");
require('../../../node_modules/purecss/build/pure-min.css');
require('../../css/layouts/side-menu.css');
//国际化
global.localize = {};
require.ensure(['vue', 'vue-router', 'vue-i18n'], function (require) {

    // init shell
    var vueShell = require('../component/shell/shell.vue')
    Vue.component('vue-shell', vueShell)

    // Locale
    var VueLocale = require('vue-i18n')
    localize.ja = require('../common/localize/ja');
    localize.zh = require('../common/localize/zh');
    localize.en = require('../common/localize/en');
    Vue.use(VueLocale, {locales: localize});
    Vue.config.lang = 'zh';

    var VueRouter = require('vue-router');

    var paging = require('../component/paging/paging.vue')
    var zPagenav = require('vue-pagenav')

    Vue.use(require('vue-resource'))

    zPagenav.default.template = paging.template
    Vue.use(zPagenav)
    Vue.use(VueRouter)

    var Vuex = require('vuex')
    Vue.use(Vuex)
    var router = new VueRouter({
        hashbang: true,  //为true的时候 example.com/#!/foo/bar ， false的时候 example.com/#/foo/bar
        //abstract:true,  //地址栏不会有变化
        //以下设置需要服务端设置
        //history: false,   //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
        //saveScrollPosition: false
        linkActiveClass: 'menu_current' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
    })

    require('./routers.js')(router);

    router.start(Vue.extend(), '#app')
})
