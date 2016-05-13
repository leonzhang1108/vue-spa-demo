/**
 * Created by leon on 2016/5/2.
 */
module.exports = function (router) {
    var Index = require('bundle?lazy!../../../component/shell/index.vue')
    var Control = require('bundle?lazy!../../../component/vue-control.vue');
    var Services = require('bundle?lazy!../../../component/services.vue');
    var Watch = require('bundle?lazy!../../../component/watch.vue');
    var Vuex = require('bundle?lazy!../../../component/vuex/vuexapp.vue');
    var Table = require('bundle?lazy!../../../component/demo-project/tableapp.vue');
    var Form = require('bundle?lazy!../../../component/form/form.vue');
    var Brotherhood = require('bundle?lazy!../../../component/brotherhood.vue');
    router.map({
        '/': {
            name: "index",
            component: Index
        },
        '/home': {
            name: "home",
            component: Brotherhood
        },
        '/about': {
            name: "about",
            component: Control
        },
        "/services": {
            name: "services",
            component: Services
        },
        "/calender": {
            name: "calender",
            component: Vuex
        },
        "/test": {
            name: "test",
            component: Watch
        },
        "/table": {
            name: "table",
            component: Table
        },
        "/form": {
            name: "form",
            component: Form
        },
        '/forbidden': {
            name: 'forbidden',
            component: require('../../../component/shell/forbidden.vue')
        },
        '*': {
            component: require('../../../component/shell/not_found.vue')
        }
    })

    window.routeList = [];
    router.beforeEach(function (transition) {
        console.log('before---------------');

        //可以通过在路由中的自定义字段来验证用户是否需要登陆
        if (!transition.to.auth) {
            console.log('通过配置路由中自定义的字段验证是否需要登陆');
        }

        if(!transition.to.query.currentPage){
            transition.to.query.currentPage = Math.random()
        }
        console.log(transition.to.query)
        //如果是中止，这里可以判断用户登录
        if (transition.to.name == 'forbidden') {
            router.app.authenticating = false
            alert('此路由在全局中设置为中止');
            transition.abort();
        }

        if (routeList.length > 1 && transition.to.name == routeList[routeList.length - 2]['name']) {
            router.app.effect = 'back';
            routeList.splice(routeList.length - 1, 1);
            console.log(routeList);
        } else {
            router.app.effect = 'fade';
            routeList.push({
                name: transition.to.name,
                path: transition.to.path,
                query: transition.to.query,
                params: transition.to.params,
                timer: +new Date
            });
        }

        transition.next();
    });


    //可以记录访问路径
    router.afterEach(function (transition) {
        console.log('-----------------after');

        for (var i = 0; i < routeList.length; i++) {
            console.log(routeList[i].name);
        }
        ;
    });
}