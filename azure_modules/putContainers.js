 async function putContainers(_client , storageAccountName , _containerName , _resourceGroupName ) {
    const resourceGroupName = _resourceGroupName;
    const accountName = storageAccountName;
    const containerName = _containerName;
    const blobContainer = {
        publicAccess : "Container"
    };


    const Container = await _client.blobContainers.create(
      resourceGroupName,
      accountName,
      containerName,
      blobContainer
    );


 return  Container ;
  }


  module.exports = { putContainers };