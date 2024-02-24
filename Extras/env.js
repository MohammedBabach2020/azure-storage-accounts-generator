const fs = require('fs');
const userpath =require("os").userInfo().homedir;
const path = require("node:path")



function create_directory() {
const dir = path.join(userpath , ".azure_storage_generator")
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}



function create_env_file(){
    create_directory()
const filePath = path.join(userpath , ".azure_storage_generator" , ".env")
    
    if (!fs.existsSync(filePath)){
        content =  
`AZURE_TENANT_ID=
AZURE_CLIENT_ID=
AZURE_CLIENT_SECRET=
SUBSCRIPTION_ID =
RESOURCE_GROUP_NAME =`
       fs.writeFile(filePath, content , (err) => {
            if (err) {
                console.error('Error writing the file:', err);
            } else {
                console.log('File has been written successfully');
            }
    });
    }

  
  }
  module.exports = { create_env_file };