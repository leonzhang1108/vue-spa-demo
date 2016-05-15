/**
 * Created by leon on 2016/5/13.
 */


var gulp = require('gulp');
var webpack = require('gulp-webpack');
var projectList = ['ansteel','another-project']


gulp.task('default', function() {

    iterateAllFolder(projectList, function(projectName){
        gulp.src('./src/js/entry/'+projectName+'/vue-entry-demo.js')
            .pipe(webpack(require('./webpack.build.js')(projectName)))
            .pipe(gulp.dest('./'+projectName))
    })
});

function iterateAllFolder(list, cb) {
    for (var i = 0; i < list.length; i++) {
        cb(list[i])
    }
}