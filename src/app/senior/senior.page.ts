import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MqqtService } from '../mqqt.service';
import { AlertController } from '@ionic/angular';

/**
 * SeniorPage is the main screen of this application. It handles displaying where
 * the elder was last seen, the ability to connect to the server, navigate to emergency,
 * battery status and movements.
 */
@Component({
  selector: 'app-senior',
  templateUrl: './senior.page.html',
  styleUrls: ['./senior.page.scss'],
})
export class SeniorPage {
  public timeSince = 'never'

  /**
   * Initialize variables and start an interval timer for check if it has been 5 minutes.
   * (Occurs every 5 seconds)
   * 
   * @param router For navigating to different page
   * @param mqqtService Mqqt service handler
   * @param alertController For displaying alerts
   */
  constructor(
    public router: Router,
    public mqqtService: MqqtService,
    private alertController: AlertController,
  ) {
    setInterval(() => {
      if (mqqtService.movementWarning === true) {
        this.createAlert('WARNING', 'No movement has occured for 5 minutes!');
      }
      try { 
        this.timeSince = mqqtService.timeSince(mqqtService.locationTime) + ' ago';
      } catch (error) {}
    }, 1000);
  }

  /**
   * Connect to mqqt server
   */
  public connect() {
    this.mqqtService.connect();
  }

  /**
   * Disconnect from mqqt server
   */
  public disconnect() {
    this.mqqtService.disconnect();
  }

  /**
   * Navigate to battery page
   */
  public navBattery() {
    this.router.navigate(['/battery']);
  }

  /**
   * Navigate to emergency page
   */
  public navEmergency() {
    this.router.navigate(['/emergency']);
  }

  /**
   * Create alert
   * @param alrtHeader alert header string
   * @param alrtMessage alert message string
   */
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
