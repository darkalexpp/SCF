import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { preferencias } from 'src/app/clases/preferencias';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {

  CSMenu: boolean = false;
  CFMenu: boolean = false;
  CISMenu: boolean = false;
  Ttexto : number =preferencias.txtsize;
  recursos: string [] = preferencias.BaseRecursosAll;
  CheckboxesCS = [];
  CheckboxesCF =[];

  constructor(private router: Router,public storageService: StorageService) {
   }

  ngOnInit() {

    this.storageService.getObject('CheckboxesCF').then(result => {
      if (result != null) {
      this.CheckboxesCF=result;
      }else{
        for ( var p of preferencias.BaseRecursosAll){
          this.CheckboxesCF.push({nombre: p, ischecked:false});
          this.CheckboxesCS.push({nombre: p, ischecked:false});
        }
      for (var t of preferencias.rnCF){
        this.CheckboxesCF[t].ischecked=true;
      }
      for (var t of preferencias.rnCS){
        console.log(t);
        this.CheckboxesCS[t].ischecked=true;} 
      }
      }).catch(e => {
      console.log('error: '+ e);  });
    
      this.storageService.getObject('CheckboxesCS').then(result => {
        if (result != null) 
        this.CheckboxesCS=result;
      }).catch(e => {
        console.log('error: '+ e);  });
}

  showSubMenuCS(){

    this.CSMenu=!this.CSMenu;
    
  }
  showSubMenuCF(){

    this.CFMenu=!this.CFMenu;
    
  }
  showSubMenuCIS(){

    this.CISMenu=!this.CISMenu;
    
  }
  changetxt(){
    preferencias.txtsize=this.Ttexto;

  }
  
  guardar(){
var rcf=[];
for (var ck of this.CheckboxesCF){
if (ck.ischecked)
  rcf.push(ck.nombre);}
preferencias.raCF=rcf;

var rcs=[];
for (var ck of this.CheckboxesCF){
if (ck.ischecked)
  rcs.push(ck.nombre);}
preferencias.raCS=rcs;
console.log(rcf);

this.storageService.setObject('raCF', rcf).then(result => {    
}).catch(e => { 
console.log("error: " + e);
});
this.storageService.setObject('raCS', rcs).then(result => {    
}).catch(e => { 
console.log("error: " + e);
});

this.storageService.setObject('CheckboxesCF', this.CheckboxesCF).then(result => {    
}).catch(e => { 
console.log("error: " + e);
});

this.storageService.setObject('CheckboxesCS', this.CheckboxesCS).then(result => {    
}).catch(e => { 
console.log("error: " + e);
});

this.router.navigate(['/home'])
  }
}
