import { Message } from "../model/message";

export class Instance{
    rooms: Message[] = [];

    // Example
    // 0: Message {message: "2019-10-08 17:01:36,living,0,76", timestamp: Tue Oct 08 2019 17:01:36 GMT+1300 (New Zealand Daylight Time), sensor_location: "living", motion_status: 0, battery_status: 76}
    // 1: Message {message: "2019-10-08 17:01:36,kitchen,0,90", timestamp: Tue Oct 08 2019 17:01:36 GMT+1300 (New Zealand Daylight Time), sensor_location: "kitchen", motion_status: 0, battery_status: 90}
    // 2: Message {message: "2019-10-08 17:01:36,dining,0,15", timestamp: Tue Oct 08 2019 17:01:36 GMT+1300 (New Zealand Daylight Time), sensor_location: "dining", motion_status: 0, battery_status: 15}
    // 3: Message {message: "2019-10-08 17:01:36,toilet,0,84", timestamp: Tue Oct 08 2019 17:01:36 GMT+1300 (New Zealand Daylight Time), sensor_location: "toilet", motion_status: 0, battery_status: 84}
    // 4: Message {message: "2019-10-08 17:01:36,bedroom,0,57", timestamp: Tue Oct 08 2019 17:01:36 GMT+1300 (New Zealand Daylight Time), sensor_location: "bedroom", motion_status: 0, battery_status: 57}
    // length: 5

    public addRoom(msg: Message){
        this.rooms.push(msg);
    }

    public getLength(): number{
        return this.rooms.length;
    }

    public toString(): string {
        var s = 'Instance ------> ';
        this.rooms.forEach(element => {
            s += element
        });
        return s + '<-------'
    }
}