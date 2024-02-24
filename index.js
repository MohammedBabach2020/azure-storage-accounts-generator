
const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity"); 
const {putImages} = require("./azure_modules/putImages")
const {getAvailableLocations} = require("./azure_modules/get_all_locations")
const {get_list_count} = require("./azure_modules/getListCount")
const {putContainers} = require("./azure_modules/putContainers")
const {storageAccountCreate} = require("./azure_modules/storageAccountCreate")
const { app, BrowserWindow  ,ipcMain ,dialog  } = require('electron')
const env = require("./Extras/env")
const save = require("./Extras/store_account")
const getAll = require("./Extras/get_stored_accounts")
const path = require('node:path')
const os = require("os");
const delete_accounts = require("./Extras/delete_account")
if (require('electron-squirrel-startup')) app.quit();
let mainWindow ;
env.create_env_file();
const createWindow = () => {
  const win = new BrowserWindow({
    icon: path.join(__dirname, "assets/logo.ico"),
   titleBarStyle :'hidden',
   titleBarOverlay: true,
   titleBarOverlay: {
    color: '#2f3241',
    symbolColor: '#74b1be',
    height: 60
  },

    resizable :false ,
    maximizable:true,
    width: 1200,
    height: 850,
    webPreferences: {
      nodeIntegration:true,
        preload: path.join(__dirname, 'preload.js')
        }
    })
  
    
    mainWindow = win ;
    

  win.loadFile('index.html')

}

app.disableHardwareAcceleration();
app.whenReady().then(() => {
  ipcMain.handle('filesFetching', handleFileOpen)
  ipcMain.handle('startCreating', (e , args)=>{client(args[0],args[1], args[2]) })
  ipcMain.handle('clear_accounts', ()=>{delete_accounts.clear()})
  ipcMain.handle('remove_One_Account', (e , args)=>{ delete_accounts.remove(args[0])})
  ipcMain.handle('all-stored-accounts', ()=>{
    const all_accounts = getAll.get_all_accounts(); 
    return all_accounts;
  })

  ipcMain.handle('update_count' , ()=>{
    const auth = _auth();
    const client = new StorageManagementClient(auth.credentials, auth.Subscription_Id);
    return get_list_count(client).then((data)=>{
      return data ;
    })
  })

  ipcMain.handle("fetchLocations",()=>{
  const auth = _auth(); 
  return getAvailableLocations(auth).then((data) =>{ return data})
 })

  createWindow()

  app.on('activate', () => {
    
    if (BrowserWindow.getAllWindows().length === 0) {
   
      createWindow()
  
    }
  })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })


  /*---------------------------------------------------- Methods -----------------------------------*/ 

   
   function _auth() {
    const userpath =os.userInfo().homedir;
    process.chdir(path.join(userpath ,".azure_storage_generator" ))
    require('dotenv').config();
    const subscriptionId = process.env.SUBSCRIPTION_ID;
    const resourceGroupName = process.env.RESOURCE_GROUP_NAME;

    const credential = new DefaultAzureCredential();
    return  { credentials  : credential , Subscription_Id : subscriptionId  , resourceGroupName : resourceGroupName} ;
  }


  
 async function client(nameLength , filesPaths , location ) {
    
  try {
    const auth =_auth();
    const client = new StorageManagementClient(auth.credentials, auth.Subscription_Id);
    const accountName = generateRandomString(nameLength);
    const createStorageAccount = await  storageAccountCreate(client , accountName,location,auth.resourceGroupName)
    
    const accountKey = createStorageAccount.result;
    if (accountKey != "maximum allowed has been reached") {
      await  putContainers(client,accountName , accountName, auth.resourceGroupName)   
      await  putImages(accountName , accountKey, accountName ,filesPaths)
      save.create_db_file(accountName);
      mainWindow.webContents.send('return', {type :"success" , message :accountName} )
    } else {
      mainWindow.webContents.send('return', {type :"error" , message : "maximum allowed has been reached"})
    }
    
  
      return accountName ;
  } catch (error) {

    mainWindow.webContents.send('return', {type :"error" , message :error} )
  
  }



}


function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
   
async function handleFileOpen () {
  
  const { canceled, filePaths } = await dialog.showOpenDialog({properties : ["multiSelections"] })
  if (!canceled) {
    return filePaths
  }
}



