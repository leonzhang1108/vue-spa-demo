<template>
    <div class="container-fluid" id="menu">
        <div class="pure-menu">
            <a class="pure-menu-heading" href="#">VUE - DEMO</a>
            <ul class="pure-menu-list">
                <li class="pure-menu-item" v-bind:class="{'menu_current': menu.current}" v-for="menu in menus">
                    <div class="current_menu_color_bar"></div>
                    <a class="pure-menu-link" v-link="{ path: menu.path }" @click="clickToCurrent">{{menu.name}}</a>
                    <span class="trangle"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    module.exports = {
        mixins: [require('vue-resize-mixin')],
        events: {
            'resize': 'onResize'
        },
        data: function () {
            return {
                menus: [{
                    path: '/services',
                    name: '货物状态',
                    current: false
                }, {
                    path: '/home',
                    name: '货物详情',
                    current: false
                }, {
                    path: '/about',
                    name: '账单制作',
                    current: false
                }, {
                    path: '/calender',
                    name: '账单详情',
                    current: false
                }, {
                    path: '/test',
                    name: '场站物料管理',
                    current: false
                }, {
                    path: '/table',
                    name: '表格demo',
                    current: false
                }]
            }
        },
        methods: {
            clickToCurrent: function (item) {
                console.log(item.target.hash)
                var current = item.target.hash
                var currentMenus = this.menus
                $.each(this.menus, function (index, menu) {
                    if (current.indexOf(menu.path) > 0) {
                        currentMenus[index].current = true
                    } else {
                        currentMenus[index].current = false
                    }
                })
                this.menus = currentMenus
            },
            onResize: function(event) {
                $('#router-view').css({
                    height: event.height
                })
            }
        }
    }

</script>



