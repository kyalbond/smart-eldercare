import { Component, OnInit } from '@angular/core';
import { EmergencyDetails, grandpaJoe } from '../model/emergencyDetails';

/**
 * Class for handling emergency details page
 */
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {

  elderDetails: EmergencyDetails = null;      // Elder currently being monitored

  ngOnInit() {
    this.elderDetails = grandpaJoe;
  }

}
