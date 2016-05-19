<script type="text/javascript">
    module.exports = {
        props: {
            "page": Number,
            "page-size": Number,
            "page-total": Number,
            "nonempty": true,
            "label": String,
            "eventName": String,
            "eventPageSize": String
        },
        methods: {
            changePageSize: function (el) {
                this.$dispatch(this.eventPageSize, el.target.value)
            }
        }
    }
</script>
<template>
    <div class="pagenav">
        <div class="es-paging-msg">页码:{{page}}/{{Math.ceil(pageTotal/pageSize)}}&nbsp;总共：{{pageTotal}}条</div>
        <zpagenav :page.sync="page" , :page-size.sync="pageSize" , :pageTotal.sync="pageTotal" ,
                  :max-link.sync="maxlink" :event-name="eventName"></zpagenav>
        <div class="es-selectPageSize">
            <span>每页显示：</span>
            <select class="pageSize" @change="changePageSize">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
        <div style="clear: both;"></div>
    </div>
</template>
<style>
    .pagination {
        margin: 0;
    }

    .pagenav {
        background-color: #fff;
        padding: 25px 0px;
        margin-bottom: 30px;
    }

    .es-paging-msg {
        float: left;
        width: 30%;
        height: 40px;
        text-align: right;
        line-height: 40px;
    }

    .pagenav nav.zpagenav {
        float: left;
        width: 40%;
        text-align: center;
    }

    .es-selectPageSize {
        float: left;
        height: 40px;
        line-height: 40px;
    }
</style>
