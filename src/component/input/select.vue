<script type="text/javascript">
	module.exports = {
        props: {
            "id":String,
            "name":String,   
            "dataList":Array
        },
        data: function () {            
            return {
                input_id:this.id      
            }
        },
        methods:{
            PopBoxClose:function(){
                this.isShow = false;
            }
        },
        ready:function(){
        	interfacePort.select(this.input_id).bind_list(this.dataList);
        }
    }	
</script>
<template>
	<select id="{{input_id}}" name="{{name}}"></select>
</template>
