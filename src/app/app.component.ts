import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {



  constructor(private router: Router,private menu: MenuController) {
  }

  clickConfig() {
    this.menu.close('first');
    this.router.navigate(['/configuraciones'])
  }
}
