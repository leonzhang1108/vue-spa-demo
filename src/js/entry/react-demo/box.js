/**
 * Created by leon on 2016/4/8.
 */
var React = require('react');
var CommentTitle =  require('./title.js');
var CommentForm = require('./form.js');
var CommentList = require('./list.js');
var CommentBox = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            allChecked: false
        };
    },
    loadCommentsFromServer: function () {
        this.setState({
            data: [{
                author: 'leon',
                text: 'first comment',
                isDone: false
            }, {
                author: 'cissy',
                text: 'second comment',
                isDone: false
            }]
        })
    },
    changeAllChecked: function () {
        var checked = true
        if(this.state.allChecked){
            checked = false
        }
        this.state.data.filter(function (item) {
            item.isDone = checked
        })
        this.setState({
            data: this.state.data,
            allChecked: !this.state.allChecked
        })
    },
    rowChecked: function(index){
        this.state.data[index].isDone = !this.state.data[index].isDone
        var allChecked = this.state.allChecked
        if(this.state.data.every((item)=> item.isDone)){
            allChecked = true;
        } else {
            allChecked = false;
        }
        this.setState({
            data: this.state.data,
            allChecked: allChecked
        })
    },
    componentWillMount: function () {
        this.loadCommentsFromServer();
    },
    deleteRow: function (index) {
        this.state.data.splice(index, 1);
        this.setState({data: this.state.data});
    },
    deleteDone: function(){
        var newData = []
        this.state.data.forEach(function(item){
            if(!item.isDone){
                newData.push(item)
            }
        })
        this.setState({
            data: newData
        })
    },
    handleCommentSubmit: function (comment) {
        this.setState({
            data: this.state.data.concat([comment]),
            allChecked: false
        });
    },
    render: function () {
        var props = {
            totalDataLength : this.state.data.length || 0,
            totalDoneLength : (this.state.data && this.state.data.filter((todo)=>todo.isDone)).length || 0
        }
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentTitle allChecked={this.state.allChecked} isAllChecked={this.changeAllChecked} allChecked={this.state.allChecked} deleteDone={this.deleteDone} {...props}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
                <CommentList data={this.state.data} deleteRow={this.deleteRow} rowChecked={this.rowChecked} />
            </div>
        );
    }
});
module.exports = CommentBox;
