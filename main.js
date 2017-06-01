//include Ben's wrapper that allows the computer to give us all the pages or files and not just the first ten.
var wrap = require('canvas-api-wrapper')('10706~qwzHce6h66ksreAOflNk1LfTDlNlQG8RGSoktay4Jm8ffgXcxpCR56bDc1O2pvXT')

//get the pages and add a filetype
wrap.callbackCall('/api/v1/courses/95/pages', null, null, function (err, pages) {
    pages = pages.map(function (x) {
        return x.title + '.html'
    })
    //print out how many pages there are
    console.log(pages.length)

    //get the files, filter them, and print out how many are shared between pages and files.
    wrap.callbackCall('/api/v1/courses/95/files', null, null, function (err, files) {
        /*var fileName = files.map(function (x) {return x.display_name})*/

        console.log(files.length)
        var share = files.filter(function (file) {
            //filter the objects from files to be included
            return pages.includes(file.title)
        })
        console.log(share.length)
        //write some stuff down because I'm trying to learn how to do this
        function deleteFiles(share) {
            wrap.delete('/api/v1/files/:id')
        }
    })
})

//Basically will have to empty the variable "shared" because they are all the files that we do not want.
