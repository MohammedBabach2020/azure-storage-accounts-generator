const {contextBridge,ipcRenderer} = require("electron/renderer")
contextBridge.exposeInMainWorld('myprocess', {
  startPreload:  ( nameLength ,filesPaths,location )=>  ipcRenderer.invoke('startCreating', [nameLength , filesPaths , location ]),
  openFile: () => ipcRenderer.invoke('filesFetching'),
  onStorageAdded: (callback) => ipcRenderer.on('return', (_event, value) => callback(value)),
  getAllAccounts:  () => ipcRenderer.invoke('all-stored-accounts' ),
  clearAllAccounts:  () => ipcRenderer.invoke('clear_accounts'),
  removeOneAccount:  (account_to_remove) => ipcRenderer.invoke('remove_One_Account' , [account_to_remove]),
  get_count_update : ()=> ipcRenderer.invoke('update_count') , 
  get_locations: ()=> ipcRenderer.invoke("fetchLocations")
  });


 



