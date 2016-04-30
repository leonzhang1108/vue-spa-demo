/**
 * Created by leon on 2016/4/9.
 */
var gulp = require('gulp')
var concat = require('gulp-concat')
var fs = require('fs')
var path = require('path')
var insert = require('gulp-insert')
var mkdirp = require('mkdirp')
var Freemarker = require('freemarker.js');

var fm = new Freemarker({
    viewRoot:'./js/src/ansteel/js/ftl',
    //sourceRoot:'./js/dist/freemarker',
    options:{
        outputRoot:'./js/dist/freemarker'
    }
});

var folderList = ['ansteel']

var src = {
    css: './js/src/folderName/css/*css',
    js: './js/src/folderName/js/*js',
    html: './js/src/folderName/js/*ftl',
    htmlDir: './js/src/folderName/tpl',
    loaderJs: './js/src/folderName/js/common/loader.js',
    shell: './js/src/folderName/tpl/shell.ftl',
    bodyFtl: './js/src/folderName/tpl/*/body.ftl',
    commonFtl: './js/src/folderName/js/ftl/common.ftl',
    commonJs: './js/src/common/js/common/*js',
    mockFtl: './mock/common.json'
}
var dist = {
    css: './js/dist/folderName/css',
    js: './js/dist/folderName/js',
    html: './js/dist/folderName'
}

gulp.task('default', ['doCss', 'doJs', 'doHtml'], function () {

    //fs.readFile(src.commonFtl.replace('folderName', 'ansteel'),function(err, data){
    //    var dataString = data.toString()
    //    console.log(dataString)
    //    fm.render(dataString,  { copyLink:'opa', copyLinkOnClick:'1', tipLink:'http://amplafi.net',
    //        envelopes:[{id:1, title:'Help'}, {id:2, title:'Hello'}] }, function(err, html, output){
    //        console.log('output: '+html)
    //    });
    //
    //    //console.log('llllllllllllll: '+text)
    //})

    console.log(fm)

    fm.render('common.ftl',  { copyLink:'opa', copyLinkOnClick:'1', tipLink:'http://amplafi.net',
        envelopes:[{id:1, title:'Help'}, {id:2, title:'Hello'}] }, function(err, html, output){
        console.log('output: '+output)
    });

})

gulp.task('doCss', function () {
    iterateAllFolder(function (folderName) {
        console.info('doCss: '+folderName)
        gulp.src(src.css.replace('folderName', folderName))
            .pipe(gulp.dest(dist.css.replace('folderName', folderName)))
    })
})

gulp.task('doJs', function () {
    iterateAllFolder(function (folderName) {
        console.info('doJs: ' + folderName)

        //页面JS
        fs.readFile(src.loaderJs.replace('folderName', folderName), function (err, data) {
            gulp.src(src.js.replace('folderName', folderName))
                .pipe(insert.prepend(data.toString()))
                .pipe(gulp.dest(dist.js.replace('folderName', folderName)))
        });
        gulp.src(src.commonJs)
            .pipe(concat('common.js'))
            .pipe(gulp.dest(dist.js.replace('folderName', folderName)))

        //gulp.src(src.mockFtl)
        //    .pipe(freemarker({
        //        viewRoot: "./js/src/"+folderName+"/js/ftl/",
        //        options: {}
        //    }))
        //    .pipe(gulp.dest(dist.js.replace('folderName', folderName)));


        //fs.readFile(src.commonFtl.replace('folderName', folderName),function(err, data){
        //    console.log(data.toString())
        //    console.log('done')
        //})

    })
})

gulp.task('doHtml', function () {
    iterateAllFolder(function (folderName) {
        console.info('doHtml: '+folderName)
        if (!fs.existsSync(dist.html.replace('folderName', folderName))) {
            mkdirp(dist.html.replace('folderName', folderName), doHtml.call(this, folderName))
        } else {
            doHtml(folderName)
        }
    })
})

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

function doHtml(folderName) {
    var shellString = fs.readFileSync(src.shell.replace('folderName', folderName)).toString()
    var list = getDirectories(src.htmlDir.replace('folderName', folderName))
    for (var i = 0; i < list.length; i++) {
        var body = fs.readFileSync(src.htmlDir.replace('folderName', folderName) + '/' + list[i] + '/body.ftl')
        var head = fs.readFileSync(src.htmlDir.replace('folderName', folderName) + '/' + list[i] + '/head.ftl')
        if (!fs.existsSync(dist.html.replace('folderName', folderName))) {
            (function(item,body,head){
                mkdirp(dist.html.replace('folderName', folderName), function () {
                    createHtml(folderName, shellString, item, body, head)
                })
            })( list[i],body,head)
        } else {
            createHtml(folderName, shellString,  list[i], body, head)
        }
    }
}

function createHtml(folderName, shellString, item, body, head) {

    fs.writeFileSync(dist.html.replace('folderName', folderName) + '/' + item + '.html', replaceAll(shellString, {
        '${BODY}': body.toString(),
        '${HEAD}': head.toString(),
        '${DOMAIN}': "https://10.134.240.135:8080/eshipping-server",
        '${VERSION}': "1.0.0",
        '${TRACKINGURL}': "http://10.134.240.5:14140/eshipping-tracking/",
        '${TRACKINGKEY}': "123456",
        '${OPERATIONURL}': "http://10.134.240.5:8080/shippingONE/",
        '${DEPLOY}': '/eshipping-server',
        '${SECURES}': '[]',
        '${TONGJI}': 'daa2e569f0603dea75fee3352e0ed8d9',
        '${CONTEXT}': '/' + folderName,
    }), 'utf8');
}

function replaceAll(content, map) {
    for (var key in map) {
        content = content.split(key).join(map[key])
    }
    return content;
};

function iterateAllFolder(cb) {
    for (var i = 0; i < folderList.length; i++) {
        cb(folderList[i])
    }
}




 