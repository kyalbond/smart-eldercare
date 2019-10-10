import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MqqtService } from '../mqqt.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  providers: [MqqtService]
})
export class HomePage {

  public locationImg: any = '../../assets/images/house.PNG';
  public locationTime: any = 'Unknown';
  public locationString: any = 'No Movement';

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
}
