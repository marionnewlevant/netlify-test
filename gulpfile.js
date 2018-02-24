// package vars
const pkg = require("./package.json");

// gulp
const gulp = require("gulp");

// load all plugins in 'devDependencies' into the variable $
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});

gulp.task('build', function() {
  $.remoteJson('http://192.241.219.128/testCandidate1/pageList').get(function(err, res, body) {
    var urls = JSON.parse(body);
    for (let i = 0; i < urls.length; i++) {
      var pathname = $.urlParse(urls[i]).pathname;
      var filePath = '_site'+pathname.replace(/^\/[^\/]*/, '').replace(/\/$/, "");
      $.mkdirp.sync(filePath, function(err) {
        // do something about this mkdir err
      });

      $.request(urls[i])
        .pipe($.replacestream('href="/testCandidate1/', 'href="/'))
        .pipe($.fs.createWriteStream(filePath+'/index.html'));
    } 
  });
});

gulp.task('test', function() {
  $.request('http://craft-o-matic.test/testCandidate1/').pipe($.fs.createWriteStream('_site/test.html'));
});

