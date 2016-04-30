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
        <zpagenav :page.sync="dataList.page" , :page-size.sync="dataList.pageSize" , :total.sync="dataList.total" ,
                  :max-link.sync="5" :event-name="custom"></zpagenav>
    </div>
</template>

<style>
    .admin-table {
        overflow: auto;
        width: 1200px;
        float: left;
    }

    .zpagenav {
        float: right;
        border-radius: 0 0 5px 5px;
        border: 1px solid;
        border-top: 0px;
        padding-right: 15px;
        background-color: #F9FAFB;
        width: 100%;
        text-align: right;
    }
</style>