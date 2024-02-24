const fs = require('fs');
const path = require("node:path")
const userpath =require("os").userInfo().homedir;
const filePath = path.join(userpath , ".azure_storage_generator" , "box.txt");
function get_all_accounts(){
    if (fs.existsSync(filePath)) {
        const accounts =   fs.readFileSync(filePath  ,  "utf-8", (err,data)=>{
            if (err) { return err ; } 
            else { return data ;}
        })
     return accounts.split("\n") ;
    }

else{
    return [];
}
    
}

module.exports = {get_all_accounts}