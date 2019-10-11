import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MqqtService } from '../mqqt.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-senior',
  templateUrl: './senior.page.html',
  styleUrls: ['./senior.page.scss'],
})
export class SeniorPage {

  constructor(
    public router: Router,
    public mqqtService: MqqtService,
    private alertController: AlertController,
  ) {
    setInterval(() => {
      if (mqqtService.movementWarning === true) {
        this.createAlert('WARNING', 'No movement has occured for 5 minutes!');
      }
    }, 5000);
  }

  public connect() {
    this.mqqtService.connect();
  }

  public disconnect() {
    this.mqqtService.disconnect();
  }

  public navBattery() {
    this.router.navigate(['/battery']);
  }

  public navEmergency() {
    this.router.navigate(['/emergency']);
  }

  async createAlert(alrtHeader: any, alrtMessage: any) {
    const alert = await this.alertController.create({
      header: alrtHeader,
      message: alrtMessage,
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
            this.mqqtService.movementWarning = false;
            this.router.navigate(['home/tabs/senior']);
          }
        }
      ]
    });
    await alert.present();
  }
}
