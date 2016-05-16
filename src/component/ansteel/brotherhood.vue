<template>
    <div>
        <div>
            {{firstName}}
            <input v-model="firstName">
        </div>
        <div>
            {{lastName}}
            <input v-model="lastName"/>
        </div>
        <confirm :name=btnName :title=confirmBtnName :code=requestURL :id="2" :positive=positiveAction
                 :negative=negativeAction></confirm>
    </div>
</template>

<script>

    var confirm = require("bundle?lazy!./shell/confirm.vue");
    module.exports = {
        data: function () {
            return {
                firstName: 'leon',
                lastName: 'zhang',
                btnName: '按钮',
                confirmBtnName: '确认',
                positiveAction: function () {
                    var parent = this.$parent
                    router.go(parent.requestURL)
                    console.log(this)
                    $('#' + this.id).modal('hide')
                },
                negativeAction: function () {
                    console.log('negative')
                }
            }
        },
        computed: {
            requestURL: function () {
                return '/services?firstName=' + this.firstName + '&lastName=' + this.lastName
            }
        },
        route: {
            data(transition){
                transition.next(JSON.parse(localStorage.getItem(transition.to.query.currentPage))||null)//把数据赋值给data
            },
            activate: function (transition) {
                console.log(transition)
                transition.next()
            },
            canDeactivate: function (transition) {
                console.log('canDeactivate')
                localStorage.setItem(transition.from.query.currentPage, JSON.stringify(this.$data))
                transition.next()
            }
        },
        components: {
            confirm
        }
    }
</script>
