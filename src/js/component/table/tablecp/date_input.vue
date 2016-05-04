<script>
    require('jquery-ui/themes/base/jquery-ui.css')
    module.exports = {
        props: ["inputId", "inputName"],
        data: function () {
            return {
                elId: this.inputId,
                name: this.inputName,
            }
        },
        ready: function () {
            var config = {
                dateFormat: 'yy-mm-dd',
                yearSuffix: '年',
                monthNamES: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                dayNamES: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                dayNamESShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                dayNamESMin: ['日', '一', '二', '三', '四', '五', '六']
            }
            $('#'+this.elId).datepicker(config)
        }
    }
</script>

<template>
    <div class="input-item">
        <label style="display: inline-block;" class="input-label">{{name}}：</label>
        <input type="text" id="{{elId}}"/>
    </div>
</template>

<style>

</style>
