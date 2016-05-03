<template>
    <button @click="changeLocalize('ja')">JA</button>
    <button @click="changeLocalize('zh')">ZH</button>
    <button @click="changeLocalize('en')">EN</button><br/>
    <div style="margin:20px 0px;"></div>
    <my_input input-type="dropdown" input-name="收货单位" input-id="consignee" data-option='{"dataPath":"../src/js/component/data/consignee.json"}'></my_input>
    <my_input input-type="text" input-name="生产订单号" input-id="orderNumber" data-option='{"dataPath":"../src/js/component/data/vesselName.json"}'></my_input>
    <my_input input-type="text" input-name="子项号" input-id="subNumber" data-option='{"dataPath":"../src/js/component/data/vesselName.json"}'></my_input>
    <my_input input-type="dropdown" input-name="船名" input-id="vessel" data-option='{"dataPath":"../src/js/component/data/vesselName.json"}'></my_input>
    <my_input input-type="text" input-name="航次" input-id="voyage" data-option='{"dataPath":"../src/js/component/data/vesselName.json"}'></my_input>
    <date_input input-type="date" input-name="船期" input-id="etd"></date_input>

    <my_table data-option='{"dataPath":"../src/js/component/data/table-page1.json"}' data-columns="{title: 'message.productItemTrackStatus',display: 'productItemTrackStatus'},{title:'message.consignee',display:'consignee'},{title:'message.dimension',display:'dimension'},{title:'message.itemNumber',display:'itemNumber'},{title:'message.material',display:'material'},{title:'message.productOrderNumber',display:'productOrderNumber'},{title:'message.productName',display:'productName'},{title:'message.pod',display:'pod'}"></my_table>    

</template>
<script>

var my_table = require('bundle?lazy!./tablecp/table.vue');
var my_input = require('bundle?lazy!./tablecp/input.vue');
var date_input = require('bundle?lazy!./tablecp/date_input.vue');

var jquery_ui = require('jquery-ui')

module.exports = {    
    components: {
        my_table,
        my_input,
        date_input
    },
    methods:{
        changeLocalize: function (e) {
            Vue.config.lang = e;
        },
        showJqueryUI: function (e) {
            console.log(jquery_ui)
        }
    }
}
</script>
