<template>
    <div class="container-fluid" id="menu">
        <div class="pure-menu">
            <a class="pure-menu-heading" href="#" >VUE - DEMO</a>
            <ul class="pure-menu-list">
                <li class="pure-menu-item" v-for="menu in menus">
                    <a class="pure-menu-link" v-link="{ path: menu.path }">
                        <div class="current_menu_color_bar"></div>
                        <div>{{menu.name}}</div>
                        <span class="trangle"></span>
                    </a>

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
                }
            },
            actions: {
                breadcrumbChange
            }
        },
        route: {
            activate: function (transition) {
                console.log(transition)
            }
        }
    }

</script>



