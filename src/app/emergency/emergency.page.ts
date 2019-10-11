import { Component, OnInit } from '@angular/core';
import { EmergencyDetails, grandpaJoe } from '../model/emergencyDetails';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {

  elderDetails: EmergencyDetails = null;

  constructor() {
  }

  ngOnInit() {
    this.elderDetails = grandpaJoe;
  }

}
