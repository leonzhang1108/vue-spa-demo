<template>
    <div class="vue-breadcrumb">
        <i class="fa fa-map-marker"></i>
        <span>{{$route.name}}</span>
    </div>
</template>
<script>
    var storeAction =  require('../../vuex/shell/actions')
    var breadcrumbChange = storeAction.breadcrumbChange
    var headSticker = require('../../common/jquery-head-sticker.js')
    module.exports = {
        vuex: {
            getters: {
                currentMenu: function (state) {
                    return state.currentMenu
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
                    height: event.height - $('#shell-header').height() - $('.vue-breadcrumb').height() - 1
                })
                headSticker()
            }
        }
    }
</script>
<style>
    .vue-breadcrumb{
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