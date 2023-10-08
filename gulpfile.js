const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

function style(done)
{
    gulp.src("./scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: "compressed"
        }))
        .pipe(autoprefixer())
        .on('error', console.error.bind(console))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest("./css/") )
        .pipe(browserSync.stream());
    done();
}

function sync(done)
{
    browserSync.init({
        server : {
            baseDir: "./"
        },
        port : 3000
    });
    done();
}

function browserReload(done)
{
    browserSync.reload();
    done();
}


function watch()
{
    gulp.watch("./scss/**/*", style);
    gulp.watch("./*.html", browserReload);
}

gulp.task('default', gulp.parallel(sync, watch));
