<template>
    <vue_form id='test_form' @click="formClick">
        <vue_select id="select" name="select" label="test_select" :data-list="selectData"></vue_select>
        <vue_input id="input" name="input" label="test_input"></vue_input>
        <div style="clear: both;"></div>
    </vue_form>
    <button @click="getData">查询</button>
    <vue_table
            :data="gridData"
            :columns="gridColumns">
    </vue_table>
</template>
<script type="text/javascript">
    var vue_table = require('../widget/vue_table.vue')
    var vueUtil = require('../util/vue-util.vue').methods
    var vue_form = require('bundle?lazy!./../widget/form.vue')
    module.exports = {
        data: function () {
            return {
                gridColumns: [
                    {key: 'consignee', name: '收货单位'},
                    {key: 'dimension', name: '规格'},
                    {key: 'gateInTruckNumber', name: '拖车号'},
                    {key: 'handledFlag', name: '处理结果'},
                    {key: 'itemNumber', name: '订单号'},
                    {key: 'material', name: '材料'},
                    {key: 'orderSubitem', name: '子项号'},
                    {key: 'paymentMethod', name: '付款方式'},
                    {key: 'productItemTrackStatus', name: '物流状态'},
                    {key: 'productLine', name: '产线'},
                    {key: 'productName', name: '品名'},
                    {key: 'productOrderNumber', name: '订单号'},
                    {key: 'receivingWay', name: '交货方式'},
                    {key: 'vesselVoyageInfo', name: '船名航次'},
                    {key: 'weightValue', name: '重量'},
                ],
                gridData: []
            }
        },
        computed: {
            selectData: function () {
                return [{display:'全部',value: 'all'},{display:'是',value: 'yes'},{display:'否',value: 'no'}]
            }
        },
        methods: {
            getData: function () {
                this.formClick()
                var requestData = ES.ui.get('test_form').get_value()||{}
                console.log(requestData)
                vueUtil.ajax_get({
                    requestData: requestData,
                    url: 'src/component/data/table-page2.json',
                    scope: this,
                    cbFunc: function (response) {
                        this.gridData = response.data.items
                    }
                })
            },
            formClick: function () {
                vueUtil.form({
                    el:'test_form',
                    component: this
                })
            }
        },
        components: {
            vue_table,
            vue_form
        },
        ready: function () {
            this.getData()
//            setTimeout(this.formClick, 0)
        }
    }
</script>
