const { SubscriptionClient  } = require("@azure/arm-subscriptions");
async function getAvailableLocations(auth) {
    
    const credential = auth.credentials; ;
    const subscriptionId = auth.Subscription_Id;
    
    const client = new SubscriptionClient(credential);
    let locations = [];
    let i =0
    for await (const location of client.subscriptions.listLocations(subscriptionId)) {

        if (location.name == "eastus") {
            locations.push({id:location.name,text:location.name ,  selected: true})
          
        } else {
            locations.push({id:location.name,text:location.name})
        }
          
            i++;
    }
   

    return locations ;


}



module.exports = {getAvailableLocations}