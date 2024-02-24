
var filesPaths = [];
document.getElementById("filesBtn").addEventListener("click" , async (event)=>{

  filesPaths = await window.myprocess.openFile()
  if(filesPaths != undefined){
    event.target.innerText =  filesPaths.length > 1 ? filesPaths.length + " files" : filesPaths.length + " file" ;
  }
  else{
    event.target.innerText = "Select files"
  }

})

document.getElementById("clear").addEventListener("click" ,  async ()=>{

  if(confirm("Are you sur that you wanna clear all ?")){
    await window.myprocess.clearAllAccounts();
    Array.from(document.getElementById("TableBody").children).forEach(element => element.remove());
  }
 
})


document.getElementById("copyall").addEventListener("click" ,  async ()=>{

let = all_names = "";
  const names= document.getElementsByClassName("storage-name");
  for (const name of names) {
    all_names = all_names  + name.innerText +"\n";
    navigator.clipboard.writeText(all_names);
  }
 
})



var accountsCount = 0;
document.getElementById("launch").addEventListener("click" ,async  ()=>{
  document.getElementById("errorMessage").innerText = ""
  document.getElementById("errorMessage").style.display = "block"
 
  var nameLength = document.getElementById("nameLength").value;
  accountsCount = document.getElementById("accountsCount").value
  var files = filesPaths;
 var location = document.getElementById("location").value;
if(filesPaths != undefined && filesPaths.length > 0 && nameLength.value != "" && accountsCount !="" && location != ""){
  document.getElementById("caption").innerText = "working on it  please be patient..." 
  for (let i = 0; i < accountsCount; i++) {
    const account =  await  window.myprocess.startPreload(nameLength  ,files , location );
  }
}
else{
  alert("A parameter is missing !");
}

})
    


async function getAllAccounts() {
  const accounts = await window.myprocess.getAllAccounts()
  accounts.forEach(element => {
    if (element != "") {
      create_rows(element)
    }
    
  });
}

getAllAccounts() ; 


let i = 0;
window.myprocess.onStorageAdded((value) => {

if (value.type != "error") {
    
        create_rows(value.message)
      i++;
      if (i == accountsCount) {
        i=0;
        document.getElementById("caption").innerText = "List of storage accounts" 
      }
  } 
  else {
    i=0;
    document.getElementById("caption").innerText = "List of storage accounts" ;
    document.getElementById("errorMessage").innerText = value.message
    document.getElementById("errorMessage").style.display = "block"
    
  return 0;
  }


})




function create_rows(content) {
  
  const tableBody = document.getElementById("TableBody");
  const row = document.createElement("tr")
  const StorageName = document.createElement("td")
  StorageName.append(content)
  StorageName.classList.add("storage-name")
  const copy_account_name = document.createElement("td");
  copy_account_name.addEventListener("click" ,()=>{CopyEventListner(copy_account_name , content)})
  copy_account_name.classList.add("pointer")
  copy_account_name.classList.add("text-center")
  copy_account_name.innerText = "Copy"
  const remove_account_name = document.createElement("td");
  remove_account_name.addEventListener("click" ,()=>{

    remove_account_event_listener(row , content)
  
  })
  remove_account_name.classList.add("pointer")
  remove_account_name.classList.add("text-center")
  remove_account_name.innerText = "Remove"
  row.append(StorageName)
  row.append(copy_account_name)
  row.append(remove_account_name)
  tableBody.prepend(row)
}



async function remove_account_event_listener(row , account_to_remove) {

  if(confirm("Are you sur that you wanna remove " + row.children[0].innerText + " ?")){

   await window.myprocess.removeOneAccount(account_to_remove)
    row.remove();
  }

}




 function CopyEventListner(element , text) {
  element.addEventListener("click" , ()=>{
    navigator.clipboard.writeText(text);
  })
  
 }


 async function __updateCount() {
  const l = await window.myprocess.get_count_update();
  document.getElementById("count_log").innerText = "Total for now : "+ l ;
}

setInterval(() => {
  __updateCount();
}, 5000);



async function get_location(){
  const data = await window.myprocess.get_locations();
  console.log(data);
  $(".js-example-data-array").select2({
    data: data
  })
}

get_location();