import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Message } from "../model/message";
import { Instance } from '../model/instance'

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html'
})
export class HomePage {

  private mqttStatus: string = 'Disconnected';
  private mqttClient: any = null;
  private message: any = '';
  private messageToSend: string = 'Type your message here.';
  private topic: string = 'swen325/a3';
  private clientId: string = '342323cwwefdasfrwe'; // this string must be unique to every client

  private instances: Instance[] = [];

  private instance: Instance = new Instance();

  constructor(
    private router: Router
    ){
  }

  public connect() {
  	this.mqttStatus = 'Connecting...';
  	this.mqttClient = new Paho.MQTT.Client('barretts.ecs.vuw.ac.nz', 8883, '/mqtt', this.clientId);
 
	  // set callback handlers
	  this.mqttClient.onConnectionLost = this.onConnectionLost;
	  this.mqttClient.onMessageArrived = this.onMessageArrived;

	  // connect the client
	  console.log('Connecting to mqtt via websocket');
	  this.mqttClient.connect({timeout:10, useSSL:false, onSuccess:this.onConnect, onFailure:this.onFailure});
  }

  public disconnect() {
  	if(this.mqttStatus == 'Connected') {
  		this.mqttStatus = 'Disconnecting...';
  		this.mqttClient.disconnect();
  		this.mqttStatus = 'Disconnected';
  	}
  }

  public sendMessage() {
  	if(this.mqttStatus == 'Connected') {
  		this.mqttClient.publish(this.topic, this.messageToSend);
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

    if(this.instance.getLength() == 5){
      this.instances.push(this.instance);
      console.log(this.instance)
      this.instance = new Instance();
    }

  }

  public navToSenior() {
    this.router.navigate(['/senior']);
  }

}
