
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const path = require('node:path')
 async function putImages(accountName,accountKey , containerName , filesPaths){
    const  files =filesPaths
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);
 for (let index = 0; index < filesPaths.length; index++) {
    
    var imagePath = files[index]; // Replace with the path to your image file
    var blobName = path.basename(imagePath); // Replace with the name you want to give to the blob     
    var blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const upload = await blockBlobClient.uploadFile(imagePath);
  
 }

  }

  module.exports = { putImages };