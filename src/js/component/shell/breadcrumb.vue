<template>
    <div class="vue-breadcrumb">
        <i class="fa fa-map-marker"></i>
        <span>hello 面包屑  {{currentMenu}}</span>
    </div>
</template>
<script>
    require('../../../css/layouts/breadcrumb.css')
    module.exports = {
        data: function () {
            return {
                currentMenu:'lalala'
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
            }
        }
    }
</script>