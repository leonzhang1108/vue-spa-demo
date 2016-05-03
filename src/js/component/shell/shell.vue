<template>
    <vue-head></vue-head>
    <div id="shell-content">
        <vue-menu></vue-menu>
        <div id="main">
            <vue-breadcrumb></vue-breadcrumb>
            <div id="router-view" class="jumbotron">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    var vueHead = require('bundle?lazy!./head.vue')
    var vueMenu = require('bundle?lazy!./menu.vue')
    var vueBreadcrumb = require('bundle?lazy!./breadcrumb.vue')
    var store = require("../../vuex/shell/store");
    module.exports = {
        store,
        components: {
            vueHead,
            vueMenu,
            vueBreadcrumb
        }
    }
</script>
