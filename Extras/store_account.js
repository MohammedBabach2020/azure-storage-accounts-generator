const fs = require('fs');
const userpath =require("os").userInfo().homedir;
const path = require("node:path")
function create_db_file(content){
 
const filePath = path.join(userpath , ".azure_storage_generator" , "box.txt")
 fs.appendFile(filePath, content +"\n" , (err) => {
            if (err) {
                console.error('Error writing the file:', err);
            } else {
                console.log('File has been written successfully');
            }
    });
 }


 module.exports = {create_db_file}