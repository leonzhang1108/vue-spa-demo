<script>

    var headSticker = require('../../../common/jquery-head-sticker.js')

    module.exports = {
        mixins: [require('vue-resize-mixin')],
        events: {
            'resize': 'onResize'
        },
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
            }
        },
        props: {
            dataOption: String,
            viewData: Object,
            dataColumns: Array
        },
        data: function () {
            var option = this.dataOption || "";
            this.dataColumns = this.dataColumns || "";
            return {
                pageSize: 10,
                page: 1,
                maxlink: 5,
                eventName: "custom",
                noResultsMsg: option.noResultsMsg,
                columns: this.dataColumns
            }
        },
        events: {
            custom: function (page) {
                this.page = page;
            }
        },
        computed: {
            units: function () {
                var units = {}
                units = this.viewData;
                return units;
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
            <tr v-for="(index,item) in units.items">
                <td v-for="column in columns" v-html="displayHtml(column.display,item)"></td>
            </tr>
            </tbody>
        </table>
        <div class="pagenav">
            <zpagenav :page.sync="page" , :page-size.sync="pageSize" , :total.sync="units.total" ,
                      :max-link.sync="maxlink" :event-name="eventName"></zpagenav>
            <div class="pageDec">
                <span class="paging-info">{{ $t('message.pagenav', { page:page,sumPage:units.total,pagesize:Math.ceil(units.total/pageSize)}) }}</span>                
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
    .pagenav {
        border-radius: 0 0 5px 5px;
        border: 1px solid;
        border-top: 0px;
        background-color: #F9FAFB;
        overflow: auto;
        margin-top: -24px;
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