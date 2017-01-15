/**
 * Created by dengb on 2017/1/15.
 */
'use strict';

var browserify  = require('browserify'),
    gulp        = require('gulp'),
    run         = require('gulp-run'),
    transform   = require('vinyl-transform'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    ts          = require('gulp-typescript'),
    tslint      = require('gulp-tslint'),
    sass        = require('gulp-sass'),
    scsslint    = require('gulp-scss-lint'),
    minifyCSS   = require('gulp-minify-css'),
    del         = require('del'),
    browserSync = require('browser-sync'),
    jsonlint    = require("gulp-jsonlint"),
    karma       = require("gulp-karma"),
    runSequence = require('run-sequence');