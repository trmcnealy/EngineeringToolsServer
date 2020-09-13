const gulp = require("gulp");

gulp.task("build", (callback) => {

    const asc = require("assemblyscript/bin/asc");

    asc.main(["./bin/main.ts", "--binaryFile", "./bin/main.wasm"], callback);
});

gulp.task("default", ["build"]);