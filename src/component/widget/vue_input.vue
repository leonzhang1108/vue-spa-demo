<script type="text/javascript">
    module.exports = {
        props: {
            "id":String,
            "name":String,
            "label": String,
            "cls": String,
            "placeholder":String
        },
        ready:function(){
            interfacePort.input({
                label: this.label+"：",
                el: this.id,
                placeholder: this.placeholder || '',
                nonempty: true,
                cls: this.cls || ''
            })
        }
    }
</script>
<template>
    <input type="text" id="{{id}}" name="{{name}}"/>
</template>
