
 async function storageAccountCreate(client , _name , _location ,  _resourceGroupName) {

  try {
    const accountName = _name;

    const parameters = {
      allowBlobPublicAccess: true,
      allowSharedKeyAccess: true,
  
      keyPolicy: { keyExpirationPeriodInDays: 100 },
      kind: "StorageV2",
      location:_location,
      minimumTlsVersion: "TLS1_2",
      sku: { name: "Standard_GRS" },
   
    };
  
    const storageAccount = await client.storageAccounts.beginCreateAndWait(
      _resourceGroupName,
      accountName,
      parameters
    );
  
    
  const getStorageAccountKeyList = await  client.storageAccounts.listKeys(_resourceGroupName, accountName);
  
  const getStorageAccountKey = getStorageAccountKeyList.keys[0].value;
  
  return {result : getStorageAccountKey }
  } catch (error) {

    if(error.message.includes("maximum allowed")){
      return {result : "maximum allowed has been reached" }
    }
 
    throw error
 
  }
    
  
  
  }

  module.exports = {storageAccountCreate}
  