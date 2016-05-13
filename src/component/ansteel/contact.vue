/** * Created by WangMing on 15/12/9. */

<template>
    <div class="panel panel-default panel-table">
        <!-- Default panel contents -->
        <div class="panel-heading">
            <button v-show="false" class="button-success pure-button">导出 excel</button>
            <span v-text='parentMessage'></span>
        </div>
        <table class="pure-table pure-table-horizontal">
            <thead>
            <tr>
                <th><input v-show="false" v-model='parentMessage' type='text' value=''/></th>
                <th v-for="item in field">{{item}}</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="item in items">
                <td>{{ $index }}</td>
                <td @click="addInput(this, item.code, 'code')">{{ item.code }}</td>
                <td><span @click="addInput2(this)" v-if="item.ok" v-text="item.code"></span>
                    <input v-else @blur="inputBlur(this)" type="text" v-model="item.code"/>
                </td>
                <td>{{ item.ok }}</td>
                <td>
                    <map :name="item.name" :code="item.code" :id="$index">
                        <map>
                </td>
                <td @click="addInput(this,item.seq, 'seq')">{{ item.seq }}</td>

                <td>
                    <button type="submit" @click="doSomething(this)" class="pure-button pure-button-primary">操作</button>
                </td>
                <td>{{ item.code }}</td>
            </tr>
            </tbody>
        </table>
    </div>
    <button type="button" @click="addComponents">追加组件</button>
    <component :is="currentView"></component>
    <div id="updateInput">
    </div>
</template>

<script>
    var map = require("bundle?lazy!./map.vue");
    var test = require("bundle?lazy!./watch.vue");
    //require("bootstrap.css");
    var tableData = {
        parentMessage: 'Parent',
        count: 1,
        field: ["VUE 组件 $index", "修改当前值进坑演示（jquery）", "修改当前值爬坑演示",
            "隐藏／现实 input", "弹出层组件（传递参数）", "数量", "Operation", "CODE值实时显示"
        ],
        ok: true,
        currentView: "",
        items: [{
            "code": " code1 值",
            "isCurrent": false,
            "name": " name1 值",
            "seq": 0,
            "ok": true
        }, {
            "code": " code2 值",
            "isCurrent": false,
            "name": " name2 值",
            "seq": 0,
            "ok": true
        }, {
            "code": " code3 值",
            "isCurrent": false,
            "name": " name3 值",
            "seq": 0,
            "ok": true
        }, {
            "code": " code4 值",
            "isCurrent": false,
            "name": " name4 值",
            "seq": 0,
            "ok": true
        }, {
            "code": " code5 值",
            "isCurrent": false,
            "name": " name5 值",
            "seq": 0,
            "ok": true
        }, {
            "code": " code6 值",
            "isCurrent": false,
            "name": " name6 值",
            "seq": 0,
            "ok": true
        }]
    };

    module.exports = {
        props: ['field'],
        data: function () {
            return tableData
        },
        methods: {
            doSomething: function (e) {
                e.items[e.$index].seq = parseInt(e.items[e.$index].seq) + 1;
                console.log(e);
            },
            doData: function (data) {
                console.log(window.location.hash);
                module.exports.data().items = data.details;
            },
            addInput: function (e, v, key) {
                console.log(e.$refs);
                console.log(e.$forContext);
                console.log(e.$els);
                console.log(e.$els);
                console.log(e.$els);
                var ele = "<input v-text='parentMessage' type='text' value='" + v + "' />";
                //var updateInput = "<updateInput></updateInput>";
                var _el = $(e.$event.toElement);
                _el.html("");
                _el.append(ele);
                _el.find("input").focus();
                _el.find("input").on("blur", function () {
                    e.items[e.$index][key] = this.value;
                    _el.find("input").remove();
                    _el.html(this.value);
                });
            },
            addInput2: function (e) {
                e.items[e.$index].ok = false;
            },
            inputBlur: function (e) {
                e.items[e.$index].ok = true;
            },
            addComponents: function () {
                var sss = module.exports.data().currentView;
                if (sss === "map") {
                    module.exports.data().currentView = "test";
                } else {
                    module.exports.data().currentView = "map";
                }


                // var updateInput = "<test></test>";
                // var _updateInput = $("#updateInput");
                // _updateInput.html("");
                // _updateInput.append(updateInput);
                //
                // module.exports.data().items = data.details;
                // console.log(module.exports.components);
                //module.exports.components.test._Ctor();

            }
        },
        components: {
            "map": map,
            "test": test
        }
    };

</script>
