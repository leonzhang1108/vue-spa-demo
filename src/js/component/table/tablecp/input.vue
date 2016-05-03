<script>
    var elid = "";
    module.exports = {
        props: ['inputType', "dataOption", "inputId", "inputName"],
        data: function () {
            var option = JSON.parse(this.dataOption);
            return {
                dataList: {},
                dataDefault: {},
                Type: this.inputType,
                noResultsMsg: option.noResultsMsg,
                elId: this.inputId,
                name: this.inputName,
            }
        },
        methods: {
            //生成下拉框
            showDataList: function (el) {
                var div = $("#idrop-" + this.elId);
                $(".showInput").hide();
                div.show(), div.css("left", el.target.offsetLeft + "px"), div.css("min-width", el.target.offsetWidth + "px");
                el.srcElement.select();
                this.dataList = searchData(this.dataDefault, this.noResultsMsg, this.elId);
                elid = this.elId;
            },
            //下拉框选中后操作
            selectData: function (el) {
                if (el.toElement.dataset.values != 0) {
                    var input = $("#" + this.elId);
                    var div = $("#idrop-" + this.elId);
                    input.val(el.target.innerHTML), div.hide();
                }
            },
            //填写过滤下拉框数据
            searchData: function (el) {
                this.dataList = searchData(this.dataDefault, this.noResultsMsg, this.elId);
            },
            selectType: function () {
                if (this.Type == "select") {
                    return 1;
                }
                return 0;
            },
            //获取数据
            getData: function () {
                var option = JSON.parse(this.dataOption);
                if (this.Type == 'dropdown') {
                    var url = option.dataPath;
                    this.$http({
                        url: url,
                        method: 'GET',
                    }).then(function (response) {
                        this.dataDefault = response.data;
                    }, function (response) {
                        //request error
                    });
                }
            }
        },
        ready: function () {
            // 初始化获取data
            this.getData();
        }
    }

    var searchData = function (arrdata, noResultsMsg, elid) {
        var arr = [];
        var values = $("#" + elid).val();
        for (var i = 0; i < arrdata.length; i++) {
            if (arrdata[i].dataText.indexOf(values) >= 0) {
                arr.push(arrdata[i])
            }
        }
        if (values == "") {
            return arrdata;
        } else {
            if (arr.length === 0) {
                arr.push({"dataText": noResultsMsg, "dataValue": "0"})
            }
            return arr;
        }
    };

    //全局点击事件监听
    $(document).on("click", function (e) {
        if (e.target.id.indexOf(elid) >= 0) {
            return;
        } else {
            $(".showInput").hide();
        }
    })
</script>

<template>
    <div class="input-item">
        <label style="display: inline-block;" class="input-label">{{name}}：</label>
        <input type="text" id="{{elId}}" @focus="showDataList" @keyup="searchData" />
        <div id="idrop-{{elId}}" class="showInput" v-if="this.Type == 'dropdown'">
            <div v-for="item in dataList" data-values="{{item.dataValue}}" id="idrop-item-{{elId}}" @click="selectData">
                {{item.dataText }}
            </div>
        </div>
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
        white-space: pre-wrap;
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
