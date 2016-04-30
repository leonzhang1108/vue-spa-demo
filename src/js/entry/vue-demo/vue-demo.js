/**
 * Created by leon on 2016/4/23.
 */

//global.$ = global.jQuery = require('jquery');
//global.bootstrap = require("bootstrap/dist/js/bootstrap.min.js");
require("bootstrap/dist/css/bootstrap.css");
global.DC = require('../../common/ui')
require("../../../css/vue-demo.css");
require.ensure(['vue', 'vue-router','../../component/demo-grid.vue','../../component/about.vue'], function (require) {
    var Vue = require('vue')
    var VueRouter = require('vue-router')
    //var DC = require('../../common/ui')
    var About = require('bundle?lazy!../../component/about.vue')
    Vue.use(VueRouter)

    DC.ui.input({
        el: 'demo-leon'
    })

    var Bar = Vue.extend({
        template: '<p>This is bar!</p>'
    })

    var App = Vue.extend({})

    var router = new VueRouter()

    router.map({
        '/foo': {
            component: require('bundle?lazy!../../component/first.vue')
        },
        '/bar': {
            component: About
        }
    })

    router.start(App, '#app')


    DC.show()

    var img1 = document.createElement("img");
    img1.src = require("../../../pic/SAAS_logo.png");
    document.body.appendChild(img1);
})
