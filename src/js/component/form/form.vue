<template>
    <h2>Vue AJAX Form Component</h2>
    <ajax-form id="formOne" class="my-form" name="myCoolForm" action="todoURL" method="post" v-response-type="json">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" value="James Doyle" placeholder="">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="james2doyle@gmail.com" placeholder="">
        <label for="selection">Selection</label>
        <select name="selection" id="seleaction">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
        <label for="file">Profile Image</label>
        <input type="file" name="file" id="file" multiple>
        <div class="clearfix"></div>
        <input type="submit" name="submit" value="Submit">
    </ajax-form>
    <progress min="0" max="100" value="{{ progress }}">{{ progress }}% complete</progress>
    <pre>{{ response | json }}</pre>
</template>
<script>

    var ajaxForm = require('./ajaxForm.vue')
    module.exports = {
        data: {
            response: {},
            progress: 0
        },
        events: {
            beforeFormSubmit: function (el) {
                // fired after form is submitted
                console.log('beforeFormSubmit', el);
            },
            afterFormSubmit: function (el) {
                // fired after fetch is called
                console.log('afterFormSubmit', el);
            },
            onFormComplete: function (el, res) {
                // the form is done, but there could still be errors
                console.log('onFormComplete', el, res);
                // indicate the changes
                this.response = res;
            },
            onFormProgress: function (el, e) {
                // the form is done, but there could still be errors
                console.log('onFormProgress', el, e);
                // indicate the changes
                this.progress = e.percent;
            },
            onFormError: function (el, err) {
                // handle errors
                console.log('onFormError', el, err);
                // indicate the changes
                this.response = err;
            }
        },
        components: {
            ajaxForm,
        }
    }
</script>
<style>
    label {
        display: block;
        margin-bottom: 1.5em;
    }

    label > span {
        display: inline-block;
        width: 8em;
        vertical-align: top;
    }
</style>