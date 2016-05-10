<script type="text/javascript">
	module.exports = {
        props: {
            "id": String,
            "name": String,
            "dataList": Array,
            "nonempty": true,
            "label": String
        },
        ready:function(){
        	interfacePort.select({
                label: this.label+"：",
                el: this.id,
                nonempty: true
            }).bind_list(this.dataList);
        }
    }	
</script>
<template>
	<select id="{{id}}" name="{{name}}"></select>
</template>
