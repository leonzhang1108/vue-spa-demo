<template>
    <vue-head></vue-head>
    <div id="shell-content">
        <vue-menu></vue-menu>
        <div id="main">
            <vue-breadcrumb></vue-breadcrumb>
            <div id="router-view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    var vueHead = require('bundle?lazy!./head.vue')
    var vueMenu = require('bundle?lazy!./menu.vue')
    var vueBreadcrumb = require('bundle?lazy!./breadcrumb.vue')
    var store = require("../../../js/vuex/shell/store");
    var headSticker = require('../../../js/common/jquery-head-sticker.js')
    module.exports = {
        store,
        components: {
            vueHead,
            vueMenu,
            vueBreadcrumb
        }
    }

    //全局滚动事件 触发自由表头
    $(document).scroll(function () {
        if($('.sticky-thead:visible').length==0){
            headSticker()
        }
        if ($('thead:visible').eq(0).offset()) {
            //活动表头
            var affix = $('.sticky-thead:visible')
            //滚动高度
            var scrollHeight = $(window).scrollTop()
            var theadHeight = $('thead:visible').eq(0).offset().top
            var listHeight = $('.sticky-enabled:visible').outerHeight()
            var topNavHeight = $('#shell-header').outerHeight() + $('.vue-breadcrumb').outerHeight()
            if (scrollHeight + topNavHeight > theadHeight) {
                affix.css({
                    top: scrollHeight - listHeight - theadHeight + topNavHeight
                })
            } else {
                affix.css({
                    top: -listHeight
                })
            }
        }
    })

</script>
<style>
    #router-view {
        margin-top: 100px;
        background: #ececec;
        padding: 20px;
    }
</style>
