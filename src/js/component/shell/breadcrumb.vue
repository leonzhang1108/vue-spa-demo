<template>
    <div class="vue-breadcrumb">
        <i class="fa fa-map-marker"></i>
        <span>{{$route.name}}</span>
    </div>
</template>
<script>
    require('../../../css/layouts/breadcrumb.css')
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