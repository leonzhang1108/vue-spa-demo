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
        <div v-bind:class="colorClass">{{fullName}}</div>
        <div id="insertPlace"></div>
    </div>
</template>
<script>


    module.exports = {
        data: function () {
            return {
                firstName: 'leon',
                lastName: 'zhang',
                colorClass:{
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
        methods:{
            changeColor: function(){
                this.colorClass = {
                    red: !this.colorClass.red,
                    blue: !this.colorClass.blue
                }
            },
            insertFunction :function(){

                var mounting = require('./mounting.vue')
                var Profile = Vue.extend(mounting)

                var profile = new Profile({
                    data: {
                        firstName: this.firstName,
                        lastName: this.lastName
                    },
                    methods: {

                    }
                })
                // 挂载到元素上
                profile.$mount('#insertPlace');
            }
        }
    }
</script>
<style>
    .red{
        color: red;
    }
    .blue{
        color: blue;
    }
</style>