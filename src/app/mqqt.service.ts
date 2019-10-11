import { Injectable } from '@angular/core';
import { Message } from './model/message';
import { Instance } from './model/instance';

declare var Paho: any;    // Mqqt JS import

/**
 * Mqqt Service which handles all raw-data recieved from server
 * sorting it into data objects which can be utilised from the
 * application.
 */
@Injectable({
  providedIn: 'root'
})
export class MqqtService {

  public mqttStatus: any = 'Disconnected';        // Status of Client
  public mqttClient: any = null;                  // Mqqt Client
  public topic: any = 'swen325/a3';               // Topic to subscribe to
  public message: any = '';                       // Latest message from server
  public clientId: any = '342323cwwefdasfrwe';    // This string must be unique to every client

  public msg: Message = null;                     // Latest message from server in data structure
  public instance: Instance = new Instance();     // Latest instance of messages (contains one msg for each room)
  public oldInstance: Instance = new Instance();  // Old instance for getting latest battery info

  public instances: Instance[] = [];              // List of all instances recieved
  public motionMessages: Message[] = [];          // List of all messages with movement

  public locationImg: any = '../../assets/images/house.PNG';  // Current image to be displayed for location
  public locationTime: any = null;             // Latest time of last msg sent
  public locationString: any = 'house.';          // Latest name of last msg sent

  public connected = false;                       // Boolean for if client is connected

  public movementWarning = false;                 // Boolean for if movement has been detected
  public timer: any;                              // Timer for movement check
  public TIMEOUT_TIME = 300000;                   // Timeout for timer (300000 = 5 minutes)

  public graphData: number[] = [0, 0, 0, 0, 0];   // Data for graph to pull information from

  /**
   * Called when a message arrives from the server
   */
  public onMessageArrived = (message) => {
    console.log('Received message');
    this.message = message.payloadString;
    this.msg = new Message(this.message);          // Create a message object out of the payload

    if (this.msg.hasMotion()) {                    // When a message has been detected with motion
      this.motionMessages.reverse();
      this.motionMessages.push(this.msg);
      this.motionMessages.reverse();

      this.locationImg = this.msg.getLocation();
      this.locationString = this.msg.getRoom();
      this.locationTime = this.msg.timestamp;

      // Reset warning timer
      this.movementWarning = false;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.movementWarning = true;
      }, this.TIMEOUT_TIME);

      // Add appropriate data to the graph
      switch (this.msg.sensor_location) {
        case 'kitchen':
          this.graphData[0] = this.graphData[0] + 1;
          break;
        case 'dining':
          this.graphData[1] = this.graphData[1] + 1;
          break;
        case 'toilet':
          this.graphData[2] = this.graphData[2] + 1;
          break;
        case 'living':
          this.graphData[3] = this.graphData[3] + 1;
          break;
        case 'bedroom':
          this.graphData[4] = this.graphData[4] + 1;
      }

    }

    // Create an instance out of the data given
    this.instance.addRoom(this.msg);
    if (this.instance.getLength() === 5) {
      this.instances.push(this.instance);
      this.oldInstance = this.instance;
      this.instance = new Instance();
    }
  }

  /**
   * Attempt to connect to mqqt server
   */
  public connect() {
    this.mqttStatus = 'Connecting...';
    this.mqttClient = new Paho.MQTT.Client('barretts.ecs.vuw.ac.nz', 8883, '/mqtt', this.clientId);

    // set callback handlers
    this.mqttClient.onConnectionLost = this.onConnectionLost;
    this.mqttClient.onMessageArrived = this.onMessageArrived;

    // connect the client
    console.log('Connecting to mqtt via websocket');
    this.mqttClient.connect({ timeout: 10, useSSL: false, onSuccess: this.onConnect, onFailure: this.onFailure });
  }

  /**
   * Attempt to discconect from mqqt server
   */
  public disconnect() {
    if (this.mqttStatus === 'Connected') {
      this.mqttStatus = 'Disconnecting...';
      this.mqttClient.disconnect();
      this.mqttStatus = 'Disconnected';
      this.connected = false;
      clearTimeout(this.timer);
    }
  }

  /**
   * When a successful connection is made to the mqqt server
   */
  public onConnect = () => {
    console.log('Connected');
    this.mqttStatus = 'Connected';
    this.connected = true;

    // Start warning timer
    this.timer = setTimeout(() => {
      this.movementWarning = true;
    }, this.TIMEOUT_TIME);

    // Subscribe to server
    this.mqttClient.subscribe(this.topic);
  }

  /**
   * If failed to connect to server
   */
  public onFailure = (responseObject) => {
    console.log('Failed to connect');
    this.mqttStatus = 'Failed to connect';
  }

  /**
   * When connection is lost to server
   */
  public onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      this.mqttStatus = 'Disconnected';
    }
  }

  /**
   * Compares two dates and returns time in the form of '.. minutes ago'
   * @param date Date to be compared to now
   */
  public timeSince(date: Date): string {
    var eventStartTime = new Date();
    var duration = date.valueOf() - eventStartTime.valueOf();
    var result = (duration / 1000) % 60;

    if (result < 1) {
      return 'less than 1 minute'
    }

    return result + 'minutes';
  }

}
