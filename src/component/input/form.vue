<script type="text/javascript">

	module.exports = {
        props: {
            "id":String,
            "items": Array
        },
        ready: function () {
            var thisId = this.id
            $.each(this.items, function(index, item){
                var name = $(item)[0].localName
                $('#'+thisId).append('<div id="'+$(item).attr('id')+'"></div>')
                var Component = Vue.extend(require('./'+name+'.vue'))
                var data = {}
                $.each($(item)[0].attributes, function (i, attr) {
                    console.log(attr.localName)
                    console.log(attr.nodeValue)
                    data[attr.localName] = attr.nodeValue
                })
                data.el=$(item).attr('id')

                var component = new Component({
                    data: data
                })
                console.log(Component)
                component.$mount('#'+$(item).attr('id'));
            })
        }
    }	
</script>
<template>　
	<div id="{{id}}" name="{{name}}">
    </div>
</template>
