<script type="text/javascript">
    module.exports = {
        props: {
            data: Array,
            columns: Array
        }
    }
</script>
<template>
    <table>
        <thead>
        <tr>
            <th v-for="item in columns">
                {{item.name}}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in data">
            <td v-for="item in columns">
                {{entry[item.key]}}
            </td>
        </tr>
        </tbody>
    </table>
</template>
<style>

    .sticky-enabled td{
        padding: 5px;
        font-size: 12px;
        word-break: keep-all;
        white-space: nowrap;
        text-align: center;
    }
    .sticky-enabled th,
    .sticky-thead th{
        font-size: 13px;
        word-break: keep-all;
        white-space: nowrap;
        height: 28px;
        text-align: center;
    }

</style>