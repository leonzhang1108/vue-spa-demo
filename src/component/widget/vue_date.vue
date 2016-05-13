<script>
    require('jquery-ui/themes/base/jquery-ui.css');
    module.exports = {
        props: ["id", "lableName","name","className"],
        data:function (){
            return {
                input_id:this.id
            }
        },
        ready: function () {
            var config = {
                dateFormat: 'yy-mm-dd',
                yearSuffix: '年',
                monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
                dayNamesMin: ['日','一','二','三','四','五','六']
            }
            $('#'+this.input_id).datepicker(config)
        }
    }
</script>

<template>
    <div class="ag--input-wrap {{className}}">
        <label>{{lableName}}：</label>
        <input type="text" id="{{input_id}}" data-type="date" name="{{name}}"/>
    </div>
</template>

<style>
    .ag--input-item label{
        display: inline-block;
    }
</style>
