/**
 * Created by leon on 2016/4/8.
 */
var React = require('react');
var CommentForm = React.createClass({
    handleSubmit: function () {
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({
            author: author,
            text: text,
            isDone: false
        });
        this.refs.author.value = '';
        this.refs.text.value = '';
    },
    render: function () {
        return (
            <div>
                <input type="text" placeholder="Your name" ref="author"/>
                <input type="text" placeholder="Say something..." ref="text"/>
                <input type="button" value="submit" onClick={this.handleSubmit}/>
            </div>
        );
    }
});
module.exports = CommentForm;