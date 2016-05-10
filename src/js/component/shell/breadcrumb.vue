<template>
    <div class="vue-breadcrumb">
    <i class="fa fa-map-marker"></i>
    <span>{{$route.name}}</span>
    </div>
    <!--<div class="vue-breadcrumb">-->
        <!--<tab v-for="menu in tabMenus"-->
             <!--:name.sync=menu.name-->
             <!--:id.sync=menu.id-->
             <!--:component.sync=menu.component-->
             <!--:current.sync=menu.current-->
        <!--&gt;</tab>-->
    <!--</div>-->
</template>
<script>
    var storeAction = require('../../vuex/shell/actions')
    var headSticker = require('../../common/jquery-head-sticker.js')
    var tab = require('./tab.vue')
    module.exports = {
        vuex: {
            getters: {
                currentMenu: function (state) {
                    return state.currentMenu
                },
                tabMenus: function (state) {
                    return state.tabMenus
                }
            }
        },
        mixins: [require('vue-resize-mixin')],
        events: {
            'resize': 'onResize'
        },
        methods: {
            onResize: function (event) {
                $('#router-view').css({
                    height: event.height - $('#shell-header').height() - $('.tab-row').height() - 1
                })
                headSticker()
            }
        },
        components: {
            tab
        }
    }
</script>
<style>
    .vue-breadcrumb,
    .tab-row {
        float: left;
        width: 100%;
        height: 30px;
        padding-left: 10px;
        line-height: 30px;
        overflow: hidden;
        font-size: 12px;
        position: fixed;
        background: #dedede;
        z-index: 100;
        top: 69px;
    }
</style>