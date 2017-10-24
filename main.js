/*eslint-env node es6*/
/*eslint no-console:0*/
/*global console*/

/*deletes page duplicates between pages and files duplicated by d2l*/

//required for child module template
const async = require('async')
const canvas = require('canvas-wrapper')
var courseId = course.info.canvasOU;

module.exports = (course, stepCallback) => {
    course.addModuleReport('files-removeDuplicates');
    /*find pages*/
    var getPages = canvas.get('/api/v1/courses/' + courseId + '/pages', function (err, pages) {
        if (err) {
            course.throwErr('files-removeDuplicates', err)
            return;
        }
        pages = pages.map(function (page) {
            return page.title + '.html'
        });
        //console.log("PAGES", pages.length);
        /*find files*/
        var getFiles = canvas.get('/api/v1/courses/' + courseId + '/files', function (err, files) {
            if (err) {
                course.throwErr('files-removeDuplicates', err)
                return;
            }
            //console.log("FILES", files.length);
            /*find duplicates*/
            var duplicates = files.filter(function (file) {
                return pages.includes(file.display_name)
            })
            //console.log("DUPLICATES", duplicates.length)

            async.each(duplicates, function (file, cb) {
                canvas.delete('/api/v1/files/' + file.id, (err, body) => {
                    if (err) {
                        course.throwErr('files-removeDuplicates', err)
                        cb(err);
                        return;
                    }
                    course.success('files-removeDuplicates', 'files-removeDuplicates file ' + file.display_name + ' deleted successfully');
                    cb();
                })
            }, function (err) {
                if (err) {
                    console.log(err)
                }
                stepCallback(null, course);
            })
        })
    })
}
