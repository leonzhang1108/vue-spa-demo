<script>
    require('jquery-ui/themes/ui-darkness/jquery-ui.css')
    module.exports = {
        props: ["inputId", "inputName"],
        data: function () {
            return {
                elId: this.inputId,
                name: this.inputName,
            }
        },
        ready: function () {
            console.log(this)
            $('#'+this.elId).datepicker()
        }
    }
</script>

<template>
    <div class="input-item">
        <label style="display: inline-block;" class="input-label">{{name}}：</label>
        <input type="text" id="{{elId}}"/>
    </div>
</template>

<style>

</style>
