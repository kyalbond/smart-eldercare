import { Message } from './message';

/**
 * Class for holding one set of messages in one instance (maximum of 5, one for each room).
 */
export class Instance {
    rooms: Message[] = [];

    /**
     * Add 'room' to instance
     * @param msg Message to be added
     */
    public addRoom(msg: Message) {
        this.rooms.push(msg);
    }

    /**
     * Gets room with corresponding string name
     * @param room Room to get from instance
     */
    public getRoom(room: string) {
        this.rooms.forEach(msg => {
            if (msg.sensor_location === room) {
                return msg.battery_status;
            }
        });
    }

    /**
     * Get number of rooms in instance
     */
    public getLength(): number {
        return this.rooms.length;
    }

    /**
     * Print instance in a nice format.
     */
    public toString(): string {
        let s = 'Instance ------> ';
        this.rooms.forEach(element => {
            s += element;
        });
        return s + '<-------';
    }
}
