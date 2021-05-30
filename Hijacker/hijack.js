
var requestQueue = new Queue(25);
var backgroundPort;


chrome.runtime.onMessage.addListener(
     function(request, sender, sendResponse) {
         console.log(sender);
         backgroundPort = chrome.runtime.connect({name: 'HIJACKCHANNEL'});
         sendResponse({q:requestQueue.getQueue()});
     });

chrome.runtime.onConnect.addListener(function(port){

  
    port.onMessage.addListener(function(msg)
    {
        console.log(msg.appSettings);
            
    });   
});



chrome.webRequest.onBeforeRequest.addListener(function(details){
        if(details.method == "POST" || details.method == "PUT" || details.method == "PATCH")
        {    
            req = new Request(details.requestId, details.tabId, details.method, details.url);
            req.setBody(details.requestBody);
            requestQueue.push(req);
            console.log(details);
        }
},{
    urls: ["<all_urls>"], types:["xmlhttprequest"]
},[ "requestBody"]); 

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    if(details.method == "POST" || details.method =="PUT" || details.method == "PATCH")
    {    
        let reqDetails = Request.getRequestByID(requestQueue.getQueue(), details.requestId);
        let index = reqDetails[0];
        let req = reqDetails[1];
        if(index != -1)
        {
            req.setHeaders(details.requestHeaders);
            requestQueue.pushAtIndex(req, index);
        }
    }
    else
    {
        let req = new Request(details.requestId, details.tabId, details.method, details.url);
        req.setHeaders(details.requestHeaders);
        requestQueue.push(req);
    }
    var views = chrome.extension.getViews({ type: "popup" });
},{
    urls: ["<all_urls>"], types:["xmlhttprequest"]
},["requestHeaders", "extraHeaders", "blocking"]); 

