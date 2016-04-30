/** * Created by WangMing on 15/12/9. */

<template>
    <div class="pure-form pure-form-stacked">
        <fieldset>
            <div class="pure-form pure-g">
                <div class="pure-u-md-1-3">
                    <label for="first-name">{{ msg }}</label>
                    <input id="first-name" type="text" v-model="msg">
                </div>

                <div class="pure-u-md-1-3">
                    <label for="last-name">修改 table 字段</label>
                    <input id="last-name" type="text" v-model="fields[0]">
                </div>

                <div class="pure-u-md-1-3">
                    <label for="query">过滤</label>
                    <input id="query" type="text" name="query" v-model="searchQuery">
                </div>

                <div class="pure-u-md-1-3">
                    选中元素：<input @focus="focusInput(this)" type="text" name="name" v-bind:value="sk">
                    <select v-show="skshow" v-model="sk" id="state" class="pure-input-1-2 form-control" multiple>
                        <option v-for="option in options" v-bind:val="option.id">{{option.id}}-{{option.val}}</option>
                    </select>
                </div>
            </div>
            <div class="pure-form pure-g">
                <label for="#" class="pure-checkbox pure-u-md-1-8">
                    <input type="checkbox" id="#" value="#" v-model="fields"> #
                </label>
                <label for="code" class="pure-checkbox pure-u-md-1-8">
                    <input type="checkbox" id="code" value="Code" v-model="fields"> Code
                </label>
                <label for="parent" class="pure-checkbox pure-u-md-1-8">
                    <input type="checkbox" id="parent" value="Parent" v-model="fields"> Parent
                </label>
                <label for="name" class="pure-checkbox pure-u-md-1-8">
                    <input type="checkbox" id="name" value="Name" v-model="fields"> Name
                </label>
                <label for="count" class="pure-checkbox pure-u-md-1-8">
                    <input type="checkbox" id="count" value="Count" v-model="fields"> count
                </label>
            </div>
            <span>table 组件的列名: {{ fields | json }}</span>
            <label for="terms" class="pure-checkbox">
                <input id="terms" type="checkbox" v-model="search"> 同意声明
            </label>

            <button type="submit" id="loading" data-loading-text="Loading..." autocomplete="off" @click="doSomething(this)" v-bind:class="{'pure-button-primary': search,'pure-button': true}">检索</button>
        </fieldset>
    </div>
    <custom_table :field="fields" :msg="msg" :filter-key="searchQuery"></custom_table>
    <custom_table :field="fields2" :msg="msg" :filter-key="searchQuery"></custom_table>

</template>

<script>
    var notie = require("notie");
    require('notie/dist/notie.css')
    var custom_table = require("./custom_table.vue");

    module.exports = {
        data: function() {
            return {
                msg: "提示信息",
                search: false,
                fields: [],
                fields2: ["h","w","j","Name"],
                sk: "",
                skshow: false,
                searchQuery: "",
                classObject: {
                    'pure-button-primary': true,
                    'pure-button': true
                },
                selected: {
                    "001": "nodejs",
                    "002": "express",
                    "003": "Angular",
                    "004": "Backbone",
                    "005": "lodash",
                    "006": "underscore"
                },
                options: [{
                    id:"001", val:"nodejs"
                }, {
                    id:"002", val:"express"
                }, {
                    id:"003", val:"Angular"
                }, {
                    id:"004", val:"Backbone"
                }, {
                    id:"005", val:"lodash"
                }, {
                    id:"006", val:"underscore"
                }]
            }
        },
        methods: {
            doSomething: function(e) {
                console.log(e);
                if (e.search) {
                    $("#loading").button('loading');
                            // business logic...
                    var URL = "http://tracking.eshippinggateway.com/ws/tracking/summary?uniqueNo=YHT2461574856&lang=zh-cn&key=QQjxe1mM0bmJ28ppKVXKvQ&_=1461578968825";
                    $.ajax({
                        url: URL,
                        dataType: "jsonp",
                        jsonp: "callback",
                        success: function(data) {
                            $("#loading").button('reset')
                            custom_table.methods.doData(data);
                        }
                    });
                } else {
                    notie.alert(3, '请同意此声明', 1.5);
                }
            },
            focusInput: function (e){
                e.skshow = true;
            },
            blurInput: function (e){
                e.skshow = false;
            }
        },
        components: {
            custom_table
        }
    }
</script>
