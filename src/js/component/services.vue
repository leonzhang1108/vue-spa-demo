/**
* Created by WangMing on 15/12/9.
*/
<template>
    <div class="services-panel">
        <h3>{{msg}}</h3>
        <h4>template</h4>
        <div>{{$route.query.firstName}}</div>
        <div>{{$route.query.lastName}}</div>
        <h4>data</h4>
        <div>{{localFirstName}}</div>
        <div>{{localLastName}}</div>
    </div>
</template>

<script>
    module.exports = {
        route: {
            activate: function (transition) {
                this.localFirstName = transition.to.query.firstName
                this.localLastName = transition.to.query.lastName
                transition.next()
            }
        },
        data: function () {
            return {
                msg:"这是服务的页面",
                localFirstName:'',
                localLastName:''
            }
        }
    }
</script>
