<template>
    <my_table data-option='{"dataPath":"../src/js/component/data/table-page1.json"}' data-columns="[{title: '物流状态',display: 'productItemTrackStatus'},{title:'收货单位',display:'consignee'},{title:'规格',display:'dimension'},{title:'物料号',display:'itemNumber'},{title:'钢牌号',display:'material'},{title:'生产订单号',display:'productOrderNumber'},{title:'品名',display:'productName'},{title:'目的港',display:'pod'}]"></my_table>
</template>
<script>

var my_table = require('bundle?lazy!./tablecp/table.vue');

module.exports = {    
    components: {
        my_table
    }
}
</script>
