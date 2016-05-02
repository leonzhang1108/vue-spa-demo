<template>
    <div class="container-fluid" id="menu">
        <div class="pure-menu">
            <a class="pure-menu-heading" href="#" @click="breadcrumbChange">VUE - DEMO</a>
            <ul class="pure-menu-list">
                <li class="pure-menu-item" @click="breadcrumbChange" v-bind:class="{'menu_current': menu.current}" v-for="menu in menus">
                    <div class="current_menu_color_bar"></div>
                    <a class="pure-menu-link" v-link="{ path: menu.path }" @click="clickToCurrent">{{menu.name}}</a>
                    <span class="trangle"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    var storeAction =  require('../../vuex/shell/actions')
    var breadcrumbChange = storeAction.breadcrumbChange
    module.exports = {
        vuex: {
            getters: {
                menus: function (state) {
                    return state.menus
                },
            },
            actions: {
                breadcrumbChange
            }
        },
        methods: {
            clickToCurrent: function (item) {
                var current = item.target.hash
                var currentMenus = this.menus
                $.each(this.menus, function (index, menu) {
                    if (current.indexOf(menu.path) > 0) {
                        currentMenus[index].current = true
                    } else {
                        currentMenus[index].current = false
                    }
                })
            }
        }
    }

</script>



