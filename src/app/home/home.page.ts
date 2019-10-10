import { Component} from '@angular/core';
import { MqqtService } from '../mqqt.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  providers: [MqqtService],
})
export class HomePage {


}
