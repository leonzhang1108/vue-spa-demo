/**
 * Created by leon on 2016/4/8.
 */
var React = require('react');
var CommentItem = React.createClass({
    handleDelete: function () {
        this.props.deleteRow(this.props.index)
    },
    rowCheck: function(){
        this.props.rowChecked(this.props.index)
    },
    render: function () {
        return (
            <div className="item">
                <input type="checkbox" className="itemChecked" checked={this.props.isDone} onClick={this.rowCheck}/>
                {this.props.author}: {this.props.text}
                <input type="button" value="delete" onClick={this.handleDelete}/>
            </div>
        )
    }
})
module.exports = CommentItem;