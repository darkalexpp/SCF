import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from '../storage.service';

import { preferencias } from '../clases/preferencias';
import { recVoz } from '../clases/recVoz';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cnt: number;

  constructor(private sr: SpeechRecognition,private router: Router, private menu: MenuController,public storageService: StorageService) {
    this.menu.swipeGesture(true);
    this.cnt=0;
   }
   ngOnInit() {
    new recVoz(this.sr).checkPermission();

    this.storageService.getObject('raCF').then(result => {
      if (result != null) {
      preferencias.raCF=result;
      }else{
        var  temprf = [];
        for (var p of preferencias.rnCF){
          temprf.push(preferencias.BaseRecursosAll[p]);   }
          preferencias.raCF=temprf;   
      }
      }).catch(e => {
      console.log('error: '+ e);  });

      this.storageService.getObject('raCS').then(result => {
        if (result != null) {
        preferencias.raCS=result;
        }else{
          var temprs = [];
          for (var p of preferencias.rnCS){
            temprs.push(preferencias.BaseRecursosAll[p]);   }
        preferencias.raCS=temprs;
        }
        }).catch(e => {
        console.log('error: '+ e);  });  

        this.storageService.get('txtSize').then(result => {
          if (result != null) {
          preferencias.txtsize=result;
          }
          }).catch(e => {
          console.log('error: '+ e);  });
}

  navigate(){
    this.menu.swipeGesture(false);
    this.router.navigate(['/pregunta1'])
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
