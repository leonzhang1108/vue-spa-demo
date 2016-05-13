/**
 * Created by leon on 2016/5/13.
 */
/**
 * Created by leon on 2016/4/9.
 */


var gulp = require('gulp');
var webpack = require('gulp-webpack');

var projectList = ['ansteel','another-project']

gulp.task('default', function() {

    iterateAllFolder(function(projectName){
        gulp.src('./src/js/entry/'+projectName+'/vue-entry-demo.js')
            .pipe(webpack(require('./webpack.build.js')))
            .pipe(gulp.dest('./'+projectName))
    })

});

function iterateAllFolder(cb) {
    for (var i = 0; i < projectList.length; i++) {
        cb(projectList[i])
    }
}