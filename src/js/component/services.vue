/**
* Created by WangMing on 15/12/9.
*/
<template>
    <div class="services-panel">
        <h3>{{msg}}</h3>
        <div>{{$route.params.name}}</div>
        <div>{{nameFromTransition}}</div>
    </div>
</template>

<script>
    module.exports = {
        route: {
            activate: function (transition) {
                this.nameFromTransition = transition.to.params.name
                transition.next()
            }
        },
        data: function () {
            return {
                msg:"这是服务的页面",
                nameFromTransition:''
            }
        }
    }
</script>
