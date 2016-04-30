/**
 * Created by leon on 2016/3/28.
 */

require.ensure(['react', 'react-dom'], function (require) {
    var CommentBox = require('./box.js');
    var ReactDOM = require('react-dom');
    var React = require('react');
    require("bootstrap/dist/css/bootstrap.css");
    ReactDOM.render(
        <div class="navbar navbar-default">
            <CommentBox />
        </div>,
        document.getElementById('content')
    )
})

