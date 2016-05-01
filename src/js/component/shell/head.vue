<template>
    <div id="shell-header">
        <div class="container-fluid">
            <img :src="logo">
        </div>
    </div>
</template>

<script>
    require('../../../css/layouts/header.css')
    var logo = require('../../../pic/SAAS_logo.png')
    module.exports = {
        data: function () {
            return {
                logo: logo
            }
        }
    }

</script>