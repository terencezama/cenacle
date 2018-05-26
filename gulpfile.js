var gulp = require('gulp');
gulp.task('jscopy', function(){
    return gulp.watch('App/biblejs/index.js',function(obj){
        gulp.src(obj.path)
        .pipe(gulp.dest('local_modules/react-native-bible-realm/android/src/main/res/raw'));
    });
      
});

gulp.task('default', [ 'jscopy' ]);