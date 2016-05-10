<script>
    var elid = "";
    module.exports = {
        props: ["dataOption", "inputId", "inputName"],
        data: function () {
            var option = JSON.parse(this.dataOption);
            return {
                dataList: {},
                dataDefault: {},
                noResultsMsg: option.noResultsMsg,
                elId: this.inputId,
                name: this.inputName,
            }
        }
    }
</script>

<template>
    <div class="input-item">
        <label style="display: inline-block;" class="input-label">{{name}}：</label>
        <input type="text" id="{{elId}}" />
    </div>
</template>

<style>
    .showInput {
        float: left;
        display: none;
        position: absolute;
        background: #fff;
        z-index: 999;
        overflow: auto;
        max-height: 245px;
        box-shadow: 1px 1px 2px #ccc;
    }

    .showInput div {
        width: 100%;
        cursor: pointer;
        padding: 5px;
        border-bottom: 1px solid #f3f3f3;
    }

    .showInput div:last-child {
        border-bottom: 0px;
    }

    .showInput div:hover {
        background: #eee;
    }
    .input-item {
        float: left ;
    }
    .input-label {
        width: 100px;
        text-align: right;
    }
</style>
