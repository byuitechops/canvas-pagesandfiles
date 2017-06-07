/*eslint-env node*/
/*eslint no-console:0*/
/*global console*/

//include Ben's wrapper that allows the computer to give us all the pages or files and not just the first handful that the computer can get for JSON.
var wrap = require('canvas-api-wrapper')('10706~qwzHce6h66ksreAOflNk1LfTDlNlQG8RGSoktay4Jm8ffgXcxpCR56bDc1O2pvXT');

//get the pages and add a filetype
wrap.callbackCall('/api/v1/courses/95/pages', null, null, function (err, pages) {
    pages = pages.map(function (x) {
        return x.title + '.html'
    })
    //print out how many pages there are
    console.log("PAGES", pages.length);

    //get the files, filter them, and print out how many are shared between pages and files.
    wrap.callbackCall('/api/v1/courses/95/files', null, null, function (err, files) {
        /*var fileName = files.map(function (x) {return x.display_name})*/

        console.log("FILES", files.length)

        var shared = files.filter(function (file) {
            //filter the objects from files that are associated with a page
            return pages.includes(file.display_name)
        })
        //log the length of the items that are duplicates
        console.log("DUPLICATES", shared.length)

        deleteFiles(shared)

        function deleteFiles(shared) {
            shared.forEach(function (item, i) {
                //iterate through each item in the list and delete it based on its id
                wrap.callbackCall('/api/v1/files/' + item.id, null, 'DELETE', function (err, item) {
                    console.log('i:', i)
                    console.log('item', item)
                    console.log('err:', err)
                    console.log('------------------------------------------')

                })
            });

        }
    })

})
