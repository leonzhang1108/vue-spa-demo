<template>
    <div class="container-fluid" id="menu">
        <div class="pure-menu">
            <a class="pure-menu-heading" href="#">VUE - DEMO</a>
            <ul class="pure-menu-list">
                <li class="pure-menu-item" v-for="menu in menus">
                    <a class="pure-menu-link" v-link="{ path: menu.path }" @click="clickToCurrent(this)">{{menu.name}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function(){
            return {
                menus: [{
                    path:'/services',
                    name:'货物状态'
                },{
                    path:'/home',
                    name:'货物详情'
                },{
                    path:'/about',
                    name:'账单制作'
                },{
                    path:'/calender',
                    name:'账单详情'
                },{
                    path:'/test',
                    name:'场站物料管理'
                }, {
                    path: '/table',
                    name: '表格demo'
                }]
            }
        },
        methods: {
            clickToCurrent: function (e) {
                console.log(e)
            }
        }
    }

</script>



