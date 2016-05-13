<template>
    <button @click="changeLocalize('ja')">JA</button>
    <button @click="changeLocalize('zh')">ZH</button>
    <button @click="changeLocalize('en')">EN</button>
    <br/>
    <div style="margin:20px 0px;"></div>
    <div class="form">
        <input_filter input-type="dropdown" input-name="收货单位" input-id="consignee"
                      data-option='{"dataPath":"src/component/data/consignee.json"}'></input_filter>
        <my_input input-type="text" input-name="生产订单号" input-id="orderNumber"
                  data-option='{"dataPath":"src/component/data/vesselName.json"}'></my_input>
        <my_input input-type="text" input-name="子项号" input-id="subNumber"
                  data-option='{"dataPath":"src/component/data/vesselName.json"}'></my_input>
        <input_filter input-type="dropdown" input-name="船名" input-id="vessel"
                      data-option='{"dataPath":"src/component/data/vesselName.json"}'></input_filter>
        <my_input input-type="text" input-name="航次" input-id="voyage"
                  data-option='{"dataPath":"src/component/data/vesselName.json"}'></my_input>
        <date_input input-type="date" input-name="船期" input-id="etd"></date_input>
    </div>
    <button @click="queryData">查询</button>
    <my_table data-option='{"dataPath":"src/component/data/table-page1.json"}' :data-columns="dataColumns" ,
              :view-data.sync="dataList"></my_table>

</template>
<script>

    var my_table = require('bundle?lazy!./../module/table.vue');
    var my_input = require('bundle?lazy!./../module/input.vue');
    var input_filter = require('bundle?lazy!./../module/filter.vue');
    var date_input = require('bundle?lazy!./../module/date_input.vue');

    var jquery_ui = require('bundle?lazy!jquery-ui')

    module.exports = {
        components: {
            my_table,
            my_input,
            date_input,
            input_filter
        },
        methods: {
            changeLocalize: function (e) {
                Vue.config.lang = e;
            },
            showJqueryUI: function (e) {
                console.log(jquery_ui)
            },
            getData: function (url) {

                var requestData = '{blNo:"",cargoReleaseStatusId:null,consigneeId:"",containerNumber:"",etdFrom:"",etdTo:"",hasBlocked:false,itemNumber:"",loadType:"",orderFieldDto:null,page:1,pageSize:25,podCode:"",productItemTrackStatusId:null,productName:"",productOrderNumber:"",productSubNumber:"",receivingWay:"",secondCustomerId:null,vessel:"",voyage:""}';
                requestData = eval("(" + requestData + ")");
                this.$http({
                    url: url,
                    method: 'GET',
                    data: requestData
                }).then(function (response) {
                    this.dataList = response.data;
                }, function (response) {
                    //request error
                });

            },
            queryData: function () {
                var url = "src/component/data/table-page2.json";
                this.getData(url)
            }
        },
        data: function () {
            return {
                dataColumns: [{
                    title: 'message.productItemTrackStatus',
                    display: 'productItemTrackStatus'
                }, {title: 'message.consignee', display: 'consignee'}, {
                    title: 'message.dimension',
                    display: 'dimension'
                }, {title: 'message.itemNumber', display: 'itemNumber'}, {
                    title: 'message.material',
                    display: 'material'
                }, {title: 'message.productOrderNumber', display: 'productOrderNumber'}, {
                    title: 'message.productName',
                    display: 'productName'
                }, {title: 'message.pod', display: 'pod'}],
                dataList: {}
            }
        },
        ready: function () {
            var url = "src/component/data/table-page1.json";
            this.getData(url);
        }
    }
</script>

<style>
    .admin-table table th,
    .admin-table table td {
        word-break: keep-all;
        white-space: nowrap;
        text-align: center;
    }

    .admin-table table tr {
        border-bottom: 1px solid #dddddd;
        line-height: 20px;
    }

    .admin-table table td {
        border-right: 1px solid #dddddd;
    }

    tbody tr:nth-child(even) td, tbody tr:nth-child(even) th {
        background-color: #efefef;
    }
</style>
