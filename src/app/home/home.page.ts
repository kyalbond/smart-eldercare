import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Message } from "../model/message";
import { Instance } from '../model/instance'

import { MqqtService } from '../mqqt.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  providers: [MqqtService]
})
export class HomePage {

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

  public navToSenior() {
    this.router.navigate(['/senior']);
  }

}
