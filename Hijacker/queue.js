class Queue 
{
    constructor(limit)
    {
        this.items = [];
        this.limit = limit;
    }

    push(element)
    {
        if(element)
        {
            if(this.items.length == this.limit)
            {
                this.items.pop();
            }
            this.items.unshift(element);
        }
    }

    pushAtIndex(element, index)
    {
        if(index >=this.limit)
        {
            console.log("Index Limit Exceeded");
            this.push(element);
        }
        else
        {
            this.items[index] = element;
        }
    }

    getQueue()
    {
        return this.items;
    }
}