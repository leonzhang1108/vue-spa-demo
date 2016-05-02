<template>
    <div>
        <childscomponent :childmsg="parentmsg"></childscomponent>
    </div>
</template>
<script>
    var state = {
        count: 0
    }

    var mutations = {
        increment: function(state) {
            state.count++
        }
    }

    var store = new Vuex.Store({
        state,
        mutations
    })

    store.dispatch('increment')

    console.log(store.state.count) // -> 1
    console.log(store.state.count) // -> 1
    console.log(store.state.count) // -> 1
    console.log(store.state.count) // -> 1

    var childscomponent = require('bundle?lazy!./child.vue')
    module.exports = {
        data: function(){
            return {
                parentmsg:'hello'
            }
        },
        methods: {

        },
        computed: {
            count: function () {
                console.log('computed: '+store.state.count)
                return store.state.count
            }
        },
        components: {
            childscomponent
        }
    }
</script>