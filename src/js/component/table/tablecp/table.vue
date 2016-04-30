<script>
    module.exports = {
        methods: {
            displayHtml(display, item) {
                const type = typeof display;
                if (type === 'string') {
                    return item[display];
                }
                if (type === 'function') {
                    return display(item);
                }
                throw new Error('display must be a string or function.');
            },
            pagesizeChange: function (el) {
                this.pageSize = parseInt(el.target.value);
            }
        },
        props: ["dataOption", "dataColumns"],
        data: function () {
            var option = JSON.parse(this.dataOption);
            console.log(this.dataColumns)
            return {
                dataList: {},
                pageSize: 10,
                page: 1,
                maxlink: 5,
                eventName: "custom",
                noResultsMsg: option.noResultsMsg,
                columns: [
                    {
                        title: '物流状态',
                        display: 'productItemTrackStatus'
                    },
                    {
                        title: '收货单位',
                        display: 'consignee'
                    },
                    {
                        title: '规格',
                        display: 'dimension'
                    },
                    {
                        title: '物料号',
                        display: 'itemNumber'
                    },
                    {
                        title: '钢牌号',
                        display: 'material'
                    },
                    {
                        title: '生产订单号',
                        display: 'productOrderNumber'
                    },
                    {
                        title: '品名',
                        display: 'productName'
                    },
                    {
                        title: '目的港',
                        display: 'pod'
                    }
                ],
                requestData: {
                    blNo: "",
                    cargoReleaseStatusId: null,
                    consigneeId: "",
                    containerNumber: "",
                    etdFrom: "",
                    etdTo: "",
                    hasBlocked: false,
                    itemNumber: "",
                    loadType: "",
                    orderFieldDto: null,
                    page: this.page,
                    pageSize: this.pageSize,
                    podCode: "",
                    productItemTrackStatusId: null,
                    productName: "",
                    productOrderNumber: "",
                    productSubNumber: "",
                    receivingWay: "",
                    secondCustomerId: null,
                    vessel: "",
                    voyage: ""
                }
            }
        },
        ready: function () {
            //first load data
            var option = JSON.parse(this.dataOption);
            var url = option.dataPath;
            this.$http({
                url: url,
                method: 'GET',
                data: this.requestData
            }).then(function (response) {
                this.dataList = response.data;
            }, function (response) {
                //request error
            });

        },
        events: {
            //pageNav load data
            custom: function (page) {
                this.page = page;
                var option = JSON.parse(this.dataOption);
                var url = option.dataPath;
                this.$http({
                    url: url,
                    method: 'GET',
                    data: this.requestData
                }).then(function (response) {
                    this.dataList = response.data;
                }, function (response) {
                    //request error
                });
            }
        }
    }
</script>

<template>
    <div class="admin-table">
        <table>
            <thead>
            <tr>
                <th v-for="column in columns" v-html="column.title"></th>
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
                <span class="paging-info"> 页码：{{page}}/{{Math.ceil(dataList.total/pageSize)}}&nbsp;&nbsp;总共：{{dataList.total}}</span>
                <span class="paging-info"> 每页显示：
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