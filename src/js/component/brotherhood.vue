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
        <!--<div>-->
        <!--<a v-link="requestURL">点击传值</a>-->
        <!--</div>-->
        <confirm :name=firstName :code=requestURL :id="2" :positive=positiveAction :negative=negativeAction></confirm>
    </div>
</template>

<script>

    var confirm = require("bundle?lazy!./shell/confirm.vue");
    var brotherhood = module.exports = {
        data: function () {
            return {
                firstName: 'leon',
                lastName: 'zhang',
                positiveAction: function (id) {
                    router.go('/services/' + brotherhood.data().firstName + brotherhood.data().lastName)
                    //消除遮罩
                    $('#'+id).modal('hide')
                },
                negativeAction: function () {
                    console.log('negative')
                }
            }
        },
        computed: {
            requestURL: function () {
                return '/services/' + this.firstName + this.lastName
            }
        },
        route: {
            canActivate: function (transition) {
                console.log('能否跳转?')
                if (transition.from.path === '/about') {
                    alert('不能从 /about 跳转到 /inbox')
                    transition.abort()
                } else {
                    console.log('可以跳转')
                    transition.next()
                }
            },

            canDeactivate: function (transition) {
//                return confirm('确定离开此页面？')
                transition.next()
            },

            // activate hook is called when the route is matched
            // and the component has been created.
            // this hook controls the timing of the component
            // switching - the switching won't start until this
            // hook is resolved.
//            activate : function() {
//                console.log('activating inbox...')
//                return new Promise((resolve) => {
//                            console.log('inbox activated.')
//                resolve()
//            })
        },
        components: {
            confirm
        }
    }
</script>
