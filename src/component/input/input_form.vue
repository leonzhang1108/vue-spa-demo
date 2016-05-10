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
            console.log(ES.get('#'+this.id)[0])
        }
    }	
</script>
<template>
	<div id="{{input_id}}" name="{{name}}"></div>
</template>
