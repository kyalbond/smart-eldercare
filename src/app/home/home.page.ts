import { Component } from '@angular/core';
import { MqqtService } from '../mqqt.service';

/**
 * Class for handling tab navigation
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  providers: [MqqtService],
})
export class HomePage {
}
