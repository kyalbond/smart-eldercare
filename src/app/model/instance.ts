import { Message } from './message';

export class Instance {
    rooms: Message[] = [];

    public addRoom(msg: Message) {
        this.rooms.push(msg);
    }

    public getRoom(room: string) {
        this.rooms.forEach(msg => {
            if (msg.sensor_location === room) {
                return msg.battery_status;
        }});
    }

    public getLength(): number {
        return this.rooms.length;
    }

    public toString(): string {
        let s = 'Instance ------> ';
        this.rooms.forEach(element => {
            s += element;
        });
        return s + '<-------';
    }
}
