<template>
    <button @click="changeLocalize('ja')">JA</button>
    <button @click="changeLocalize('zh')">ZH</button>
    <button @click="changeLocalize('en')">EN</button><br/>
    <div style="margin:20px 0px;"></div>
    <label>收货单位：</label>
    <my_input input-type="dropdown" data-option='{"dataPath":"../src/js/component/data/consignee.json"}'></my_input>
    <label>生产订单号：</label>
    <my_input input-type="text" data-option='{"dataPath":"../src/js/component/data/vesselName.json"}'></my_input>
    <label>子项号：</label>
    <my_input input-type="text" data-option='{"dataPath":"../src/js/component/data/vesselName.json"}'></my_input>
    <label>船名：</label>
    <my_input input-type="dropdown" data-option='{"dataPath":"../src/js/component/data/vesselName.json"}'></my_input>
    <label>航次：</label>
    <my_input input-type="text" data-option='{"dataPath":"../src/js/component/data/vesselName.json"}'></my_input>
    <label>船期：</label>
    <my_input input-type="text" data-option='{"dataPath":"../src/js/component/data/vesselName.json"}'></my_input>

    <my_table data-option='{"dataPath":"../src/js/component/data/table-page1.json"}' data-columns="{title: 'message.productItemTrackStatus',display: 'productItemTrackStatus'},{title:'message.consignee',display:'consignee'},{title:'message.dimension',display:'dimension'},{title:'message.itemNumber',display:'itemNumber'},{title:'message.material',display:'material'},{title:'message.productOrderNumber',display:'productOrderNumber'},{title:'message.productName',display:'productName'},{title:'message.pod',display:'pod'}"></my_table>    

</template>
<script>

var my_table = require('bundle?lazy!./tablecp/table.vue');
var my_input = require('bundle?lazy!./tablecp/input.vue');

var jquery_ui = require('jquery-ui')

module.exports = {    
    components: {
        my_table,
        my_input
    },
    methods:{
        changeLocalize: function (e) {
            Vue.config.lang = e;
        }
    }
}
</script>
