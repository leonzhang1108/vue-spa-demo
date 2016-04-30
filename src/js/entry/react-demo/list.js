/**
 * Created by leon on 2016/4/8.
 */
var React = require('react');
var CommentItem = require('./item.js');
var CommentList = React.createClass({
    render: function () {
        var returnArray = []
        for (var i = 0; i < this.props.data.length; i++) {
            var item = this.props.data[i]
            returnArray.push(
                <CommentItem rowChecked={this.props.rowChecked} deleteRow={this.props.deleteRow} totalDataLength={this.props.totalDataLength} totalDoneLength={this.props.totalDoneLength} author={item.author} key={i} text={item.text} index={i}  isDone={item.isDone}/>
            )
        }
        return (
            <div className="commentList">
                {returnArray}
            </div>
        )
    }
})
module.exports = CommentList;