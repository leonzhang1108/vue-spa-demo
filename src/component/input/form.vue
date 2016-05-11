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
                    data[attr.localName] = attr.nodeValue
                })
                data.el=$(item).attr('id')
                var component = new Component({
                    data: data
                })
                console.log(data)
                component.$mount('#'+$(item).attr('id'));

                console.log(ES.ui.get($(item).attr('id')))
//                component({ el: '#'+$(item).attr('id') });
            })
        }
    }	
</script>
<template>　
	<div id="{{id}}" name="{{name}}"></div>
</template>

<style>
    .input-wrap {
        width: auto;
        float: left;
        margin-right: 10px;
    }
</style>
