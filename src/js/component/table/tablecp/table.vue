<script>
    module.exports = {
        methods: {
            displayHtml(display, item) {
                const t = typeof display;
                if (t === 'string') {
                    return item[display];

                }
                if (t === 'function') {
                    return display(item);
                }
                throw new Error('display must be a string or function.');
            },
            pagesizeChange: function (el) {
                this.pageSize = parseInt(el.target.value);
            },
            getData: function () {
                var option = JSON.parse(this.dataOption);
                var requestData = '{blNo:"",cargoReleaseStatusId:null,consigneeId:"",containerNumber:"",etdFrom:"",etdTo:"",hasBlocked:false,itemNumber:"",loadType:"",orderFieldDto:null,page:' + this.page + ',pageSize:' + this.pageSize + ',podCode:"",productItemTrackStatusId:null,productName:"",productOrderNumber:"",productSubNumber:"",receivingWay:"",secondCustomerId:null,vessel:"",voyage:""}';
                var url = option.dataPath;
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
            }
        },
        props: ["dataOption", "dataColumns"],
        data: function () {
            var option = JSON.parse(this.dataOption);
            var dataColumns = '[' + this.dataColumns + ']';
            dataColumns = eval("(" + dataColumns + ")");
            return {
                dataList: {},
                pageSize: 10,
                page: 1,
                maxlink: 5,
                eventName: "custom",
                noResultsMsg: option.noResultsMsg,
                columns: dataColumns
            }
        },
        ready: function () {
            //first load data
            this.getData();
        },
        events: {
            //pageNav load data
            custom: function (page) {
                this.page = page;
                this.getData();
            }
        }
    }
</script>

<template>
    <div class="admin-table">
        <table>
            <thead>
            <tr class="table-header">
                <th v-for="column in columns">{{ $t(column.title) }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,item) in dataList.items">
                <td v-for="column in columns" v-html="displayHtml(column.display,item)"></td>
            </tr>
            </tbody>
        </table>
        <div class="pagenav">
            <zpagenav :page.sync="page" , :page-size.sync="pageSize" , :total.sync="dataList.total" ,
                      :max-link.sync="maxlink" :event-name="eventName"></zpagenav>
            <div class="pageDec">
                <span class="paging-info">{{ $t('message.pagenav', { page:page,sumPage:dataList.total,pagesize:Math.ceil(dataList.total/pageSize)}) }}</span>                
                <span class="paging-info"> {{ $t("message.eachPageShow") }}：
                <select id="paging-size-select" @change="pagesizeChange">
                    <option value="10" selected>10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                </span>
            </div>

        </div>
    </div>
</template>

<style>
    .admin-table {
        overflow: auto;
        width: 1200px;
        float: left;
    }

    .pagenav {
        border-radius: 0 0 5px 5px;
        border: 1px solid;
        border-top: 0px;
        background-color: #F9FAFB;
        overflow: auto;
    }

    .pagenav nav.zpagenav {
        float: right;
        padding-right: 15px;

        width: calc(50% - 15px);
        text-align: right;
    }

    .pagenav div.pageDec {
        float: left;
        width: calc(50% - 15px);
        margin: 20px 0px;
        padding-left: 15px;
    }

    span.pagination {
        display: none;
    }
</style>