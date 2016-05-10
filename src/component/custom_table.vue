/** * Created by WangMing on 15/12/9. */

<template>
    <div class="panel panel-default panel-table">
        <!-- Default panel contents -->
        <div class="panel-heading">
            <button class="button-success pure-button">导出 excel</button> {{filterKey}}
        </div>
        <table class="pure-table pure-table-horizontal">
            <thead>
                <tr>
                    <th v-for="item in field">{{item}}{{$index}}</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in items | filterBy filterKey">
                    <td v-if=" field.indexOf('#') !== -1 ">{{ $index }}</td>
                    <td v-if=" field.indexOf('Code') !== -1 ">{{ item.code }}</td>
                    <td v-if=" field.indexOf('Parent') !== -1 ">{{ parentMessage }}</td>
                    <td v-if=" field.indexOf('Name') !== -1 ">
                        <map :name="item.name" :code="item.code" :id="$index">
                            <map>
                    </td>
                    <td v-if=" field.indexOf('Count') !== -1 ">{{ item.seq }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    require("../css/style.css");

    var map = require("bundle?lazy!./map.vue");

    var tableData = {
        parentMessage: 'Parent',
        count: 1,
        items: [{
            "code": "默认 code1 值",
            "isCurrent": false,
            "name": "默认 name1 值",
            "seq": 0,
            "ok": true
        }, {
            "code": "默认 code2 值",
            "isCurrent": false,
            "name": "默认 name2 值",
            "seq": 0,
            "ok": true
        }, {
            "code": "默认 code3 值",
            "isCurrent": false,
            "name": "默认 name3 值",
            "seq": 0,
            "ok": true
        }, {
            "code": "默认 code4 值",
            "isCurrent": false,
            "name": "默认 name4 值",
            "seq": 0,
            "ok": true
        }, {
            "code": "默认 code5 值",
            "isCurrent": false,
            "name": "默认 name5 值",
            "seq": 0,
            "ok": true
        }, {
            "code": "默认 code6 值",
            "isCurrent": false,
            "name": "默认 name6 值",
            "seq": 0,
            "ok": true
        }]
    };

    module.exports = {
        props: ['field', 'msg', 'filterKey'],
        data: function() {
            return tableData
        },
        methods: {
            doSomething: function(e) {
                module.exports.data().count = 5;
                console.log(module.exports.data().items[0].message);
            },
            doData: function(data) {
                console.log(window.location.hash);
                module.exports.data().items = data.details;
            }
        },
        components: {
            map
        }
    };
</script>
