<script type="text/javascript">

    module.exports = {
        methods:{
            bindForm: function(items){
                console.log(items)
                var thisId = this.id
                var es_input_form = function (conf) {
                    conf = conf || {}
                    if (!conf.el) {
                        return
                    }
                    var id = '#' + conf.el
                    var el = $(id)
                    el.addClass('form-wrap')
                    var items = conf.items
                    this.id = conf.el
                    this.customer_validate = conf.validate
                    this.validate = function () {
                        this.clear_invalid()
                        var result = true
                        for (var i = 0; i < this.items.length; i++) {
                            if (this.items[i].msg_type == 'popup-tips') {
                                if (!this.items[i].validate()) {
                                    result = false
                                    break;
                                }
                                result = true
                            } else {
                                result = this.items[i].validate() && result
                            }
                        }
                        if (result && this.customer_validate) {
                            result = this.customer_validate()
                        }
                        return result
                    }
                    this.clear_invalid = function () {
                        for (var i = 0; i < this.items.length; i++) {
                            this.items[i].clear_invalid()
                        }
                    }
                    this.get_value = function () {
                        var res = {}
                        for (var i = 0; i < this.items.length; i++) {
                            var name = this.items[i].el.attr('name')
                            if (!name) {
                                name = this.items[i].id
                            }
                            if (!name) {
                                continue
                            }
                            if (this.items[i].etype == 'input_date_input') {
                                res = ES.util.merge(res, this.items[i].get_value())
                            } else {
                                res[name] = this.items[i].get_value()
                            }
                        }
                        return res
                    }
                    this.set_value = function (obj) {
                        for (var i = 0; i < this.items.length; i++) {
                            var name = this.items[i].el.attr('name')
                            if (!name) {
                                name = this.items[i].id
                            }
                            if (this.items[i].etype == 'input_date_input') {
                                var to_el = this.items[i].toName
                                if (obj[name] && obj[to_el]) {
                                    var dateVal = {}
                                    dateVal[name] = obj[name]
                                    dateVal[to_el] = obj[to_el]
                                    this.items[i].set_value(dateVal)
                                }
                            } else if (obj[name] || obj[name] === 0) {
                                this.items[i].set_value(obj[name])
                            }
                        }
                    }
                    this.clear_value = function () {
                        for (var i = 0; i < this.items.length; i++) {
                            this.items[i].clear_value()
                        }
                    }
                    this.get_item = function (index) {
                        return this.items[index]
                    }
                    this.get_item_by_id = function (id) {
                        var res = null
                        ES.each(this.items, function (_, v) {
                            if (v.el.attr('name') == id || v.id == id) {
                                res = v
                                return false
                            }
                        })
                        return res
                    }
                    this.disable = function () {
                        for (var i = 0; i < this.items.length; i++) {
                            if (!this.items[i].disable) {
                                continue
                            }
                            this.items[i].disable()
                        }
                    }
                    this.enable = function () {
                        for (var i = 0; i < this.items.length; i++) {
                            if (!this.items[i].enable) {
                                continue
                            }
                            this.items[i].enable()
                        }
                    }
                    this.items = items
                    this.el = el
                    this.etype = 'input_form'
                }
                var obj = new es_input_form({
                    items: items,
                    el: thisId
                })
                ES.ui.add(thisId, obj)
            }
        },
        events: {
            bindForm: function(items){
                console.log(items)
                var thisId = this.id
                var es_input_form = function (conf) {
                    conf = conf || {}
                    if (!conf.el) {
                        return
                    }
                    var id = '#' + conf.el
                    var el = $(id)
                    el.addClass('form-wrap')
                    var items = conf.items
                    this.id = conf.el
                    this.customer_validate = conf.validate
                    this.validate = function () {
                        this.clear_invalid()
                        var result = true
                        for (var i = 0; i < this.items.length; i++) {
                            if (this.items[i].msg_type == 'popup-tips') {
                                if (!this.items[i].validate()) {
                                    result = false
                                    break;
                                }
                                result = true
                            } else {
                                result = this.items[i].validate() && result
                            }
                        }
                        if (result && this.customer_validate) {
                            result = this.customer_validate()
                        }
                        return result
                    }
                    this.clear_invalid = function () {
                        for (var i = 0; i < this.items.length; i++) {
                            this.items[i].clear_invalid()
                        }
                    }
                    this.get_value = function () {
                        var res = {}
                        for (var i = 0; i < this.items.length; i++) {
                            var name = this.items[i].el.attr('name')
                            if (!name) {
                                name = this.items[i].id
                            }
                            if (!name) {
                                continue
                            }
                            if (this.items[i].etype == 'input_date_input') {
                                res = ES.util.merge(res, this.items[i].get_value())
                            } else {
                                res[name] = this.items[i].get_value()
                            }
                        }
                        return res
                    }
                    this.set_value = function (obj) {
                        for (var i = 0; i < this.items.length; i++) {
                            var name = this.items[i].el.attr('name')
                            if (!name) {
                                name = this.items[i].id
                            }
                            if (this.items[i].etype == 'input_date_input') {
                                var to_el = this.items[i].toName
                                if (obj[name] && obj[to_el]) {
                                    var dateVal = {}
                                    dateVal[name] = obj[name]
                                    dateVal[to_el] = obj[to_el]
                                    this.items[i].set_value(dateVal)
                                }
                            } else if (obj[name] || obj[name] === 0) {
                                this.items[i].set_value(obj[name])
                            }
                        }
                    }
                    this.clear_value = function () {
                        for (var i = 0; i < this.items.length; i++) {
                            this.items[i].clear_value()
                        }
                    }
                    this.get_item = function (index) {
                        return this.items[index]
                    }
                    this.get_item_by_id = function (id) {
                        var res = null
                        ES.each(this.items, function (_, v) {
                            if (v.el.attr('name') == id || v.id == id) {
                                res = v
                                return false
                            }
                        })
                        return res
                    }
                    this.disable = function () {
                        for (var i = 0; i < this.items.length; i++) {
                            if (!this.items[i].disable) {
                                continue
                            }
                            this.items[i].disable()
                        }
                    }
                    this.enable = function () {
                        for (var i = 0; i < this.items.length; i++) {
                            if (!this.items[i].enable) {
                                continue
                            }
                            this.items[i].enable()
                        }
                    }
                    this.items = items
                    this.el = el
                    this.etype = 'input_form'
                }
                var obj = new es_input_form({
                    items: items,
                    el: thisId
                })
                ES.ui.add(thisId, obj)
            }
        },
        props: {
            "id": String
        },
        init: function(){
            console.log('init')
            Vue.component('vue_select',require('bundle?lazy!./vue_select.vue'))
            Vue.component('vue_input',require('bundle?lazy!./vue_input.vue'))

            Vue.directive('my-directive', {
                bind: function () {
                }
            })
        },
        created: function () {
            console.log('created')
        },
        compiled: function(){
            console.log('compiled')
        },
        attached: function(){
            console.log('attached')
        },
        ready: function(){
            console.log('ready')
        }
    }
</script>
<template>　
    <div id="{{id}}" name="{{name}}">
        <slot></slot>
    </div>
</template>

<style>
    .input-wrap {
        width: auto;
        float: left;
        margin-right: 10px;
    }
</style>
