
async function get_list_count(client) {
    let count = 0;
    for await (const storageAccount of client.storageAccounts.list()) {
        count++;
    }
   return count ;
}


module.exports = {get_list_count}