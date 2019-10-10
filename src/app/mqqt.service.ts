import { Injectable } from '@angular/core';

import { Message } from './model/message';
import { Instance } from './model/instance';

declare var Paho: any;

@Injectable({
  providedIn: 'root'
})
export class MqqtService {

  public mqttStatus: any = 'Disconnected';
  public mqttClient: any = null;
  public topic: any = 'swen325/a3';
  public message: any = '';
  public clientId: any = '342323cwwefdasfrwe'; // this string must be unique to every client

  public msg: Message = null;
  public instance: Instance = new Instance();

  public instances: Instance[] = [];
  public motionInstances: Message[] = [];

  public locationImg: any = '../../assets/images/house.PNG';
  public locationTime: any = 'never';
  public locationString: any = 'house.';

  public connected = false;

  public graphData: number[] = [1,2,3,4,5]

  public onMessageArrived = (message) => {
    console.log('Received message');
    this.message = message.payloadString;
    this.msg = new Message(this.message);

    if (this.msg.hasMotion()) {
      this.motionInstances.push(this.msg);
      this.locationImg = this.msg.getLocation();
      this.locationString = this.msg.getRoom();
      this.locationTime = this.msg.getDate();

      switch (this.msg.sensor_location) {
        case 'kitchen':
          console.log('inccrementing kit')
          this.graphData[0] = this.graphData[0] + 1;
        case 'dining':
            console.log('inccrementing dining')
          this.graphData[1] = this.graphData[1] + 1;
        case 'toilet':
            console.log('inccrementing toilet')
          this.graphData[2] = this.graphData[2] + 1;
        case 'living':
            console.log('inccrementing living')
          this.graphData[3] = this.graphData[3] + 1;
        case 'bedroom':
            console.log('inccrementing bedroom')
          this.graphData[4] = this.graphData[4] + 1;
      }

    }

    this.instance.addRoom(this.msg);
    if (this.instance.getLength() === 5) {
      this.instances.push(this.instance);
      console.log(this.instance);
      this.instance = new Instance();
    }
  }

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

  public disconnect() {
    if (this.mqttStatus === 'Connected') {
      this.mqttStatus = 'Disconnecting...';
      this.mqttClient.disconnect();
      this.mqttStatus = 'Disconnected';
      this.connected = false;
    }
  }

  public onConnect = () => {
    console.log('Connected');
    this.mqttStatus = 'Connected';
    this.connected = true;

    // subscribe
    this.mqttClient.subscribe(this.topic);
  }

  public onFailure = (responseObject) => {
    console.log('Failed to connect');
    this.mqttStatus = 'Failed to connect';
  }


  public onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      this.mqttStatus = 'Disconnected';
    }
  }
}
