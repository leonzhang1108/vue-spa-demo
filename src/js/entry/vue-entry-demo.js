/**
 * Created by leon on 2016/4/23.
 */

global._ = require('underscore')
global.Vue = require('vue')
global.Vuex = require('vuex')
global.ES = require('../common/ui.js')
global.localStorage = window.localStorage
global.interfacePort = require('../interface/interface.js');
require("jquery-ui")
require("../../css/vue-demo.css");
require("bootstrap/dist/css/bootstrap.css");
require("bootstrap/dist/js/bootstrap.min.js");
require("font-awesome-webpack");
require('../../../node_modules/purecss/build/pure-min.css');
//国际化
global.localize = {};
require.ensure(['vue', 'vue-router', 'vue-i18n', 'vuex', 'vue-form'], function (require) {

    localStorage.clear()
    // init shell
    var vueShell = require('../../component/shell/shell.vue')
    Vue.component('vue-shell', vueShell)

    // Locale
    var VueLocale = require('vue-i18n')
    localize.ja = require('../common/localize/ja');
    localize.zh = require('../common/localize/zh');
    localize.en = require('../common/localize/en');
    Vue.use(VueLocale, {locales: localize});
    Vue.config.lang = 'zh';
    var paging = require('../../component/paging/paging.vue')
    var zPagenav = require('vue-pagenav')

    Vue.use(require('vue-resource'))
    Vue.use(require('vue-form'))

    zPagenav.default.template = paging.template
    var VueRouter = require('vue-router');
    Vue.use(zPagenav)
    Vue.use(VueRouter)

    Vue.use(require('vuex'))
    global.router = new VueRouter({
        hashbang: true,
        transitionOnLoad: true,
        linkActiveClass: 'menu_current' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
    })

    require('./routers.js')(router);

    router.start(Vue.extend(), '#app')

})
