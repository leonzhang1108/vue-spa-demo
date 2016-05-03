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
            changeLocalize: function (e) {
                Vue.config.lang = e;
            }
        },
        props: ["dataOption", "dataColumns"],
        data: function () {
            var option = JSON.parse(this.dataOption);
            console.log()
            var dataColumns = '[' + this.dataColumns + ']';
            dataColumns = eval("(" + dataColumns + ")");
            return {
                dataList: {},
                pageSize: 10,
                page: 1,
                maxlink: 5,
                eventName: "custom",
                noResultsMsg: option.noResultsMsg,
                columns: dataColumns,
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
                    page: 1,
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
                console.log(this)
                this.requestData.page = page;
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
    <span>Localize:</span>
    <h1>{{ $t("message.hello") }}</h1>
    <button @click="changeLocalize('ja')">JA</button>
    <button @click="changeLocalize('zh')">ZH</button>
    <button @click="changeLocalize('en')">EN</button>
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