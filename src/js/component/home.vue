/**
* Created by WangMing on 15/12/9.
*/

<template>
    <div class="home-panel">
        <h1>{{msg}}</h1>
        <h2>路由地址 {{location_hash}}</h2>
        <h3>方法： window.location.hash</h3>
        <li class="pure-menu-item"><a v-link="{path:'/home/services'}" class="pure-menu-link">table 表格</a></li>
        <li class="pure-menu-item"><a v-link="{path:'/home/calender'}" class="pure-menu-link">table 表格</a></li>
        <router-view></router-view>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                msg:"主页",
                location_hash: window.location.hash,
                location_pathname: window.location.pathname
            }
        }
    }

</script>
