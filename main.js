var wrap = require('canvas-api-wrapper')('10706~qwzHce6h66ksreAOflNk1LfTDlNlQG8RGSoktay4Jm8ffgXcxpCR56bDc1O2pvXT')

wrap.callbackCall('/api/v1/courses/95/pages', null, null, function (err, pages) {
    pages = pages.map(function (x) {
        return x.title + '.html'
    })
    console.log(pages.length)
    wrap.callbackCall('/api/v1/courses/95/files', null, null, function (err, files) {
        files = files.map(function (x) {
            return x.display_name
        })
        console.log(files.length)
        var share = files.filter(function (x) {
            return pages.includes(x)
        })
        console.log(share.length)
    })
})
//need to write a function to delete file: https://canvas.instructure.com/doc/api/files.html, scroll down to "delete file" . Will have to delete anything that's in "shared" from files.
