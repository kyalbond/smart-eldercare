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

        var msgStrings = message.split(',');
        this.timestamp = new Date(msgStrings[0]);
        this.sensor_location = msgStrings[1];
        this.motion_status = parseInt(msgStrings[2]);
        this.battery_status = parseInt(msgStrings[3]);
    }

    public toString(): string {
        return '\nTime: ' + this.timestamp.toString() +   
        '\nLocation: ' + this.sensor_location +
        '\nMotion Detected: ' + this.motion_status +
        '\nBattery Status: ' + this.battery_status + '%';
    }
}