<script>

    var Vue = require('vue')


    var demo = new Vue({
        el: '#demo',
        data: {
            searchQuery: '',
            gridColumns: ['name', 'power'],
            gridData: [
                {name: 'leon', power: Infinity},
                {name: 'ciccy', power: 9000}
            ]
        }
    })


    module.exports = {
        props: {
            data: Array,
            columns: Array,
            filterKey: String
        },
        data: function () {
            var sortOrders = {}
            this.columns.forEach(function (key) {
                sortOrders[key] = 1
            })
            return {
                sortKey: '',
                sortOrders: sortOrders
            }
        },
        methods: {
            sortBy: function (key) {
                this.sortKey = key
                this.sortOrders[key] = this.sortOrders[key] * -1
            }
        }
    }

</script>
<template>
    <table>
        <thead>
        <tr>
            <th v-for="key in columns" @click="sortBy(key)" :class="{active: sortKey == key}">{{key | capitalize}}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in data | filterBy filterKey | orderBy sortKey sortOrders[sortKey]">
            <td v-for="key in columns">
                {{entry[key]}}
            </td>
        </tr>
        </tbody>
    </table>
</template>
<style>
</style>