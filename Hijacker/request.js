class Request
{
    constructor(reqid, tabid, method, url)
    {
        this.reqid = reqid;
        this.tabid = tabid;
        this.method = method;
        this.url = url;
    }

    setHeaders(headers)
    {
        this.headers = headers;
    }

    setBody(body)
    {
        this.body = body;
    }

    static getRequestByID(requests, reqid)
    { 
        for(let i=0; i<requests.length; i++)
        {
            let req = requests[i];
            if(req.reqid == reqid)
            {
                return [i, req];
            }
            
        }
        return [-1, null];
    }

}