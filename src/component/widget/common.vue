<script>    
    module.exports = {
        props: ["id", "name", "lableName","className"],
        data: function () {            
            return {
                input_id:this.id
            }
        }
    }
</script>

<template>
    <div class="ag--input-wrap {{className}}">
        <label>{{lableName}}：</label>
        <input type="text" id="{{id}}" data-type="input" name="name"/>
    </div>
</template>

<style>
</style>