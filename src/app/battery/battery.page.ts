import { Component, OnInit } from '@angular/core';
import { MqqtService } from '../mqqt.service';

/**
 * MARKING OBJECTIVE 3
 * 
 * Page for handling battery monitoring
 */
@Component({
  selector: 'app-battery',
  templateUrl: './battery.page.html',
  styleUrls: ['./battery.page.scss'],
})
export class BatteryPage implements OnInit {

  constructor(public mqqtService: MqqtService) { }

  ngOnInit() {
  }

}
