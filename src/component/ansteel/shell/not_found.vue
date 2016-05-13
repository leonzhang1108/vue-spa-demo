<template>
    <h1 style="font-size: 30px;font-weight: bold;text-align: center;margin-bottom:20px;">页面竟然找不到，工程师们表示很惊讶，Σ( ° △
        °|||)︴</h1>
    <img style="clear: both;display: block;margin: auto;"
         :src="not_found_page" alt="一海通 Eshipping"
         title="内容没找到，Σ( ° △ °|||)︴">
</template>
<script>
    var not_found_page = require('../../../pic/404.png')
    module.exports = {
        data: function () {
            return {
                title: '404',
                not_found_page: not_found_page
            }
        },
        route: {
            activate: function (transition) {
                transition.next();
            }
        }
    };
</script>