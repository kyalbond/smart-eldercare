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
  public message: any = '';
  public topic: any = 'swen325/a3';
  public clientId: any = '342323cwwefdasfrwe'; // this string must be unique to every client

  public instances: Instance[] = [];

  public instance: Instance = new Instance();

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
    }
  }

  public onConnect = () => {
    console.log('Connected');
    this.mqttStatus = 'Connected';

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

  public onMessageArrived = (message) => {
    console.log('Received message');
    this.message = message.payloadString;
    this.instance.addRoom(new Message(this.message));

    if (this.instance.getLength() === 5) {
      this.instances.push(this.instance);
      console.log(this.instance);
      this.instance = new Instance();
    }

  }
}
