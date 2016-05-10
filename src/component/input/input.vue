<script type="text/javascript">
    module.exports = {
        props: {
            "id":String,
            "name":String,
            "label": String
        },
        ready:function(){
            interfacePort.input({
                label: this.label+"：",
                el: this.id,
                placeholder: '输入您获取到的验证码',
                nonempty: true
            })
        }
    }
</script>int
<template>
    <input type="text" id="{{id}}" name="{{name}}"/>
</template>
