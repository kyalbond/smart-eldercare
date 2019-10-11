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
    public getBatteryfromRoom(room: string): string {
        this.rooms.forEach(msg => {
            if (msg.sensor_location === room) {
                return msg.battery_status + '';
            }
        });
        return 'n/a'
    }

    /**
     * Get number of rooms in instance
     */
    public getLength(): number {
        return this.rooms.length;
    }

}
