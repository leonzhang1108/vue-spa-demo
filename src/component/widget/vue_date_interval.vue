<script type="text/javascript">
    module.exports = {
        props: {
            "id":String,
            "name":String,
            "label": String,
            "cls": String,
            "placeholder":String,
            "after_labels":String,
            "to_name":String
        },
        ready:function(){
            interfacePort.input_date_input({
                label: this.label+"：",
                el: this.id,
                placeholder: this.placeholder || '',
                nonempty: true,
                cls: this.cls || '',
                after_labels: eval(this.after_labels) || [],
                toName: this.to_name || ''
            })
        }
    }
</script>
<template>
    <input type="text" id="{{id}}" name="{{name}}"/>
</template>
<style>
    .input_date_input input {
        width: 87px;
        padding: 0 10px;
    }
</style>