<template>

    <div id="search-form">
        <vue_form id='test_form' @click="formClick">
            <vue_select id="select" name="select" label="select" :data-list="selectData"></vue_select>
            <vue_input id="input" name="input" label="input"></vue_input>
            <vue_input id="date" class="date" cls="date" name="date" label="date"></vue_input>
            <vue_filter id="filter" name="filter" label="filter" :data="filterChange"></vue_filter>
            <vue_date_interval id="test_date_input" name="date_input_from" label="date_input"
                               after_labels="['&nbsp;至&nbsp;']" to_name="date_input_to"></vue_date_interval>
            <div class="btn-form">
                <button @click="getData()">查询</button>
            </div>
            <div style="clear: both;"></div>
        </vue_form>

    </div>

    <vue_table :data="gridData" :columns="gridColumns"></vue_table>

    <vue_paging :page="page" :page-size="pageSize" :page-total="pageTotal" event-name="changePage"
                event-page-size="changePageSize"></vue_paging>
</template>
<script type="text/javascript">
    var vue_table = require('../widget/vue_table.vue')
    var vueUtil = require('../util/vue-util.vue').methods
    var vue_form = require('bundle?lazy!./../widget/vue_form.vue')
    var vue_paging = require('bundle?lazy!./../widget/vue_paging.vue')
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
                    {key: 'operation', name: '操作'}
                ],
                gridData: [],
                pageSize: 25,
                page: 1,
                pageTotal: 0,
                maxlink: 10,
                changePage: "changePage"
            }
        },
        events: {
            changePage: function (page) {
                this.getData(page)
            },
            changePageSize: function (value) {
                this.pageSize = parseInt(value)
                this.getData()
            }
        },
        computed: {
            selectData: function () {
                return [{display: '全部', value: 'all'}, {display: '是', value: 'yes'}, {display: '否', value: 'no'}]
            },
            filterChange: function () {
                vueUtil.ajax_get({
                    requestData: {},
                    url: 'src/component/data/vesselName.json',
                    scope: this,
                    cbFunc: function (res) {
                        var dataResT = res.data;
                        var arrayResT = [];
                        for (var i = 0; i < dataResT.length; i++) {
                            arrayResT[i] = dataResT[i].name;
                        }
                        ES.ui.get('filter').data = arrayResT
                    }
                })
            }
        },
        methods: {
            getData: function (page) {
                this.formClick()
                var requestData = ES.ui.get('test_form').get_value() || {}
                requestData.page = page || 1
                requestData.pageSize = this.pageSize
                vueUtil.ajax_get({
                    requestData: requestData,
                    url: 'src/component/data/table-page2.json',
                    scope: this,
                    cbFunc: function (response) {
                        $.each(response.data.items, function (_, item) {
                            item.operation = '<a class="btn operation" data-index="'+_+'">操作</a>'
                        })
                        this.gridData = response.data.items
                        this.pageTotal = response.data.items.length
                    }
                })
            },
            formClick: function () {
                vueUtil.form({
                    el: 'test_form',
                    component: this
                })
            }
        },
        components: {
            vue_table,
            vue_form,
            vue_paging
        },
        ready: function () {
            this.getData()
            setTimeout(this.formClick, 0)
            //绑定操作点击事件
            $('.content-table').delegate('.operation','click', function () {
                $(this).data('index')
                interfacePort.confirm({
                    title:'test_confirm',
                    innerHTML: $(this).data('index'),
                    auto_hide:false
                })
            })
        }
    }
</script>
