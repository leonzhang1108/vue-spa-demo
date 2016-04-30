/**
* Created by WangMing on 15/12/9.
*/

<template>
    <button type="button" class="btn btn-success" data-toggle="modal" v-bind:data-target="'#'+id">
        {{name}}
    </button>

    <div class="modal fade" v-bind:id="id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">{{name}}</h4>
                </div>
                <div class="modal-body">
                    {{code}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['name', 'code', 'id'],
        data: function () {
            return {
                msg:"这是主页的页面"
            }
        }
    }
</script>
