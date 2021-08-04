import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cnt: number;

  constructor(private router: Router, private menu: MenuController) {
    this.menu.swipeGesture(true);
    this.cnt=0;
   }

  navigate(){
    this.menu.swipeGesture(false);
    this.router.navigate(['/pregunta1'])
  }

  clickConfig() {
    alert("hola");
  }

  hidenmenu() {
   this.cnt++
   if (this.cnt===10){
    this.menu.enable(true, 'first');
    this.menu.open('first');
    this.cnt=0;
   }

  }
}
