var requestQueue = new Queue(50);
var toggleSwitch = document.getElementById('switch');
var settings = new Settings(false, ".*");
var popupPort = chrome.runtime.connect({name: 'POPUPCHANNEL'});
var isHijackerOn = localStorage.getItem("SwitchStatus") === "true";
var queue;
var table = document.getElementById("requestList");

toggleSwitch.checked = isHijackerOn;


if(isHijackerOn)
{

    chrome.runtime.sendMessage("GIVEHIJACKEDREQUEST", function(response) {
        queue = response.q;
        console.log(queue);
        var i=0;
        for(i=0; i<queue.length; i++)
        {
            var row = table.insertRow(i+1);
            var reqid = queue[i].reqid;
            row.insertCell(0).innerHTML = i+1;
            row.insertCell(1).innerHTML = queue[i].method;
            var cell2 = row.insertCell(2);
            cell2.innerHTML = queue[i].url;
            cell2.style = "text-overflow: ellipsis;white-space:nowrap;text-align:left;overflow:hidden;"
        }

    });
}





toggleSwitch.addEventListener('click', function(){
    if(this.checked)
    {
        settings = new Settings(true, "*")
        popupPort.postMessage({appSettings: settings});
    
    } else { 
        settings.setSwitch(false);
    }
    localStorage.setItem("SwitchStatus", settings.isSwitchOn);

});

chrome.runtime.onConnect.addListener(function(port){
    port.onMessage.addListener(function(msg){
        if(msg.allRequests)
        {
            queue = msg.allRequests;
            console.log(queue);
        }
    });
});
