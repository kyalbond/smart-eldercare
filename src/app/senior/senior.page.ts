import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MqqtService } from '../mqqt.service';

@Component({
  selector: 'app-senior',
  templateUrl: './senior.page.html',
  styleUrls: ['./senior.page.scss'],
})
export class SeniorPage {
  
  constructor(
    public router: Router,
    public mqqtService: MqqtService
  ) {
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
}
