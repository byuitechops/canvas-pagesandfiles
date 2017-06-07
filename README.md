# canvas-pagesandfiles

This program uses a node module that Ben wrote (canvas-api-wrapper) to automate the deletion of duplicate files from a course upload in canvas. 
The program assumes that you will hardcode the id inside the api call for the course.

The program should print out the following from the command line: 
1. number of pages
2. number of files
3. number of duplicates that were found between both pages and files

Once those values are printed, it is too late. All files that are duplicates have been deleted from pages module in canvas.
