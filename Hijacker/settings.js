class Settings
{
    constructor(onOffSwitch, filter)
    {
        this.isSwitchOn = onOffSwitch;
        this.filter = filter;
    }

    setSwitch(status)
    {
        this.isSwitchOn = status;
    }

    setFilter(filter)
    {
        this.filter = filter;
    }
}