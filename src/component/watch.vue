<template>
    <div>
        <div>
            {{firstName}}
            <input v-model="firstName" @click="insertFunction">
        </div>
        <div>
            {{lastName}}
            <input v-model="lastName" @click='changeColor'/>
        </div>
        <div v-bind:class="colorClass" @click='changeRouter'>{{fullName}}</div>
        <div id="insertPlace"></div>
    </div>
</template>
<script>

    var VueRouter = require('vue-router')
    Vue.use(VueRouter)

    module.exports = {
        data: function () {
            return {
                firstName: 'leon',
                lastName: 'zhang',
                colorClass: {
                    red: true,
                    blue: false
                }
            }
        },
        computed: {
            fullName: function () {
                return this.firstName + ' ' + this.lastName
            }
        },
        methods: {
            changeColor: function () {
                this.colorClass = {
                    red: !this.colorClass.red,
                    blue: !this.colorClass.blue
                }
            },
            insertFunction: function () {

                var mounting = require('./mounting.vue')
                var Profile = Vue.extend(mounting)

                var profile = new Profile({
                    data: {
                        firstName: this.firstName,
                        lastName: this.lastName
                    },
                    methods: {}
                })
                // 挂载到元素上
                profile.$mount().$appendTo('#'+thisId)
            },
            changeRouter: function () {
                console.log(VueRouter())
//                VueRouter.go({
//                    name: 'services',
//                    params: {
//                        userId: 123
//                    }
//                })
            }
        }
    }
</script>
<style>
    .red {
        color: red;
    }

    .blue {
        color: blue;
    }
</style>