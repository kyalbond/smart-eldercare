/**
 * Class for structing data recieved from mqqt server
 */
export class Message {
    public message: string;             // Full raw data from mqqt server
    public timestamp: Date;             // Timestamp of message
    public sensor_location: string;     // Sensor location
    public motion_status: number;       // Whether motion occured
    public battery_status: number;      // Battery status of sensor

    /**
     * Constuctor for placing data into variables
     * @param message Raw data
     */
    constructor(message: string) {
        this.message = message;

        const msgStrings = message.split(',');
        this.timestamp = new Date(msgStrings[0]);
        this.sensor_location = msgStrings[1];
        this.motion_status = parseInt(msgStrings[2], 10);
        this.battery_status = parseInt(msgStrings[3], 10);
    }

    /**
     * Get date from raw data
     */
    public getDate(): string {
        return this.timestamp.toString().split('GMT')[0];
    }

    /**
     * Get room from raw data
     */
    public getRoom(): string {
        return this.sensor_location.charAt(0).toUpperCase() + this.sensor_location.substr(1);
    }

    /**
     * Check whether motion was detected in this message
     */
    public hasMotion(): boolean {
        return (this.motion_status === 0) ? false : true;
    }

    /**
     * Get image url for corresponding location
     */
    public getLocation(): string {
        switch (this.sensor_location) {
            case 'bedroom':
                return '../../assets/images/house_bedroom.PNG';
            case 'dining':
                return '../../assets/images/house_dining.PNG';
            case 'kitchen':
                return '../../assets/images/house_kitchen.PNG';
            case 'toilet':
                return '../../assets/images/house_toilet.PNG';
            case 'living':
                return '../../assets/images/house_living.PNG';
            default:
                return '../../assets/images/house.PNG';
        }
    }

    /**
     * Print object in neat format
     */
    public toString(): string {
        return '\nTime: ' + this.timestamp.toString() +
            '\nLocation: ' + this.sensor_location +
            '\nMotion Detected: ' + this.motion_status +
            '\nBattery Status: ' + this.battery_status + '%';
    }
}