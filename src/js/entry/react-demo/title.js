/**
 * Created by leon on 2016/4/8.
 */
var React = require('react');
var CommentTitle = React.createClass({
    render: function () {
        return (
            <div className="comment-title">
                <input type="checkbox" onChange={this.props.isAllChecked} checked={this.props.allChecked}/>
                <input type="button" value="deleteDone" onClick={this.props.deleteDone}/>
                <div>hello i am a title. 总个数：{this.props.totalDataLength}个，已完成{this.props.totalDoneLength}个</div>
                <div>{this.props.allChecked ? 'all checked' : 'all unchecked'}</div>
            </div>
        )
    }
})

module.exports = CommentTitle;