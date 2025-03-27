import gulpfile from './gulpfile.mjs'; // register tasks
import gulp from 'gulp';

const [, , taskName = 'default'] = process.argv;

console.log(`🚀 Running Gulp task: ${taskName}`);
const task = gulp.task(taskName);

if (!task) {
  console.error(`❌ Gulp task "${taskName}" not found.`);
  process.exit(1);
}

gulp.series(task)();
