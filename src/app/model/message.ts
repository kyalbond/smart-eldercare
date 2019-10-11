import { stringify } from 'querystring';

export class Message {
    public message: string;
    public timestamp: Date;
    public sensor_location: string;
    public motion_status: number;
    public battery_status: number;

    // Example
    // "2019-10-08 17:00:26,bedroom,0,88"

    constructor(message: string) {
        this.message = message;

        const msgStrings = message.split(',');
        this.timestamp = new Date(msgStrings[0]);
        this.sensor_location = msgStrings[1];
        this.motion_status = parseInt(msgStrings[2], 10);
        this.battery_status = parseInt(msgStrings[3], 10);
    }

    public getDate(): string {
          return this.timestamp.toString().split('GMT')[0];
    }

    public getRoom(): string {
        return this.sensor_location.charAt(0).toUpperCase() + this.sensor_location.substr(1);
    }

    public hasMotion(): boolean {
        return (this.motion_status === 0) ? false : true;
    }

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

    public toString(): string {
        return '\nTime: ' + this.timestamp.toString() +
        '\nLocation: ' + this.sensor_location +
        '\nMotion Detected: ' + this.motion_status +
        '\nBattery Status: ' + this.battery_status + '%';
    }
}