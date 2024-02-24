const fs = require("fs")
const path = require("node:path")
const userpath =require("os").userInfo().homedir;
const filePath = path.join(userpath , ".azure_storage_generator" , "box.txt");

function remove(valueToRemove) {
   
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        let lines = data.split('\n');
      
        lines = lines.filter(line => line.trim() !== valueToRemove);

        console.log(lines)
        const updatedContent = lines.join('\n');

       
        fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Value removed successfully.');
        });
    });
}



function clear() {
    fs.truncate( filePath,(err)=>{
        if(err) throw console.error(err)
    })    
}



module.exports = {clear , remove}