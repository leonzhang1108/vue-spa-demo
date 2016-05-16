<script type="text/javascript">
    module.exports = {
        props: {
            "id":String,
            "name":String,
            "label": String,
            "allow_enter": Boolean,
            "placeholder": String,
            "data": Array
        },
        ready:function(){
            interfacePort.input_filter({
                label: this.label+"：",
                allow_enter: this.allow_enter,
                value_field: function (v) {
                    return v
                },
                display_field: function (v) {
                    return v
                },
                filter: function (list, value) {
                    var ret = []
                    ES.each(list, function (_, v) {
                        if (v.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                            ret.push(v)
                        }
                    })
                    return ret
                },
                data: this.data || [],
                el: this.id,
                placeholder: this.placeholder||'',
                nonempty: true
            })
        }
    }
</script>
<template>
    <input type="text" id="{{id}}" name="{{name}}"/>
</template>
<style>
    .input-drop {
        padding: 0;
        border: 1px solid #c1c1c1;
        background: #fefefe;
        display: none;
        position: absolute;
        z-index: 10003;
        overflow: auto;
        max-height: 300px;
        margin-top: -1px;
        box-shadow: 1px 1px 2px #ccc;
    }
    .input-filter-drop div {
        padding: 3px 10px;
        line-height: 20px;
        border-bottom: 1px solid #f3f3f3;
    }
    .input-item-selected,
    .input-drop div:hover{
        background: #eee;
    }
</style>