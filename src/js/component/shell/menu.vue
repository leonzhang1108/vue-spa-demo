<template>
    <div class="container-fluid" id="menu">
        <div class="pure-menu">
            <a class="pure-menu-heading" href="#">VUE - DEMO</a>
            <ul class="pure-menu-list">
                <li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/services' }">货物状态</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/home' }">货物详情</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/about' }">账单制作</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/calender' }">账单详情</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/test' }">场站物料管理</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link" v-link="{ path: '/table' }">表格demo</a></li>
            </ul>
        </div>
    </div>
</template>



