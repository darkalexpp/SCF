import { Component, OnInit } from '@angular/core';

import { preferencias } from 'src/app/clases/preferencias';
import { actividad } from 'src/app/clases/actividad';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { recVoz } from '../clases/recVoz';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta2',
  templateUrl: './pregunta2.page.html',
  styleUrls: ['./pregunta2.page.scss'],
})
export class Pregunta2Page implements OnInit {


public enabledI = false;
public enabledM = true;


ra=[];
imagenes: string [];
source="";
act: any;
recVoz = new recVoz(this.sr);
acActual:string;
NacTotal:string;
enablemic:boolean=true;
txtorden:string="Adivina y pronuncia la palabra que se forma con los siguientes sonidos. ";

audio;
timerId;
numPr=0;

constructor(private sr: SpeechRecognition, private router: Router) { 
  this.ra=preferencias.raCF;
  this.act = new actividad(this.ra,preferencias.CFActividades,3);
}
ngOnInit() {

  this.audio = new Audio('assets/auordenes/fonemica.m4a'); //Audio orden inicial
  this.audio.load();
  this.audio.play();
  this.NacTotal=this.act.obtenerNumTotalPreguntas()+'';
    this.siguientePregunta();
}


cardClick(ev){ //Evento de click que carga la imagen principal
  this.audio.pause(); 
  clearTimeout(this.timerId);
    var n:string = ev.target.id;
    let id:string = n.replace('card','');
    id = id.replace('img','');
    
    var audiocard=this.imagenes[id].replace('img','aupalabra');
    audiocard=audiocard.replace('png','m4a');
    console.log( audiocard); 

    this.audio = new Audio(audiocard);
    this.audio.load();
    this.audio.play();
    this.timerId=setTimeout(() => {  
    this.comprobarRespuesta(id);
    }, 2000);
}

clickmic(){ //Evento de click en mic

  this.audio.pause();
   var txt =  this.recVoz.startListening();
  alert("dice: "+txt);
  alert("coindicencia de: "+this.recVoz.similarity(this.act.obtenerTextoPregunta(),txt))
  if (this.recVoz.similarity(this.act.obtenerTextoPregunta(),txt) >= 0.5){
    this.audio = new Audio('assets/auordenes/LoHicMuyBien.m4a');
    this.audio.load();
    this.audio.play();
  }else{
    this.audio = new Audio('assets/auordenes/IntDeNue.m4a');
    this.audio.load();
    this.audio.play();
  }
}

clickOrden(){
  this.audio.pause();
 if (this.enablemic)
 this.audio = new Audio('assets/auordenes/fonemica.m4a'); //Orden inicial
  else
  this.audio = new Audio('assets/auordenes/fonemica2.m4a'); //Orden inicial alternativo
  this.audio.load();
  this.audio.play();
}

clickAuResp(){
  this.audio.pause();
  this.audio = new Audio(this.act.obtenerRespAudioLetras());
 // let audio = new Audio('assets/audio/short-circuit.mp3'); // palabra respuesta
 this.audio.load();
 this.audio.play();
}

  comprobarRespuesta(id) //comprueba la respuesta correcta
  {
    this.audio.pause();
    if(id==this.act.obtenerRespuestaCorrecta()){  
      this.audio = new Audio('assets/auordenes/LoHicMuyBien.m4a');
      this.audio.load();
      this.audio.play();
      this.enabledI = true;
    }
    else{
      this.audio = new Audio('assets/auordenes/IntDeNue.m4a');
      this.audio.load();
      this.audio.play();
    }

  }    

  siguientePregunta(){ //cambia a la nueva pregunta
    this.audio.pause();  
    clearTimeout(this.timerId);

    if(this.numPr==this.act.arregloResp.length)
    {
    this.router.navigate(['/pregunta3']);
    }
    else
    {   
      this.numPr++;
    var time: number = 0;
    if (this.act.obtenerNumPregunta()==-1)
    time=6500;
    else time=0;
      this.source="";
      this.acActual = ''+(this.act.obtenerNumPregunta()+2);
      this.imagenes = this.act.siguiente();
      //console.log(this.imagenes);
      this.timerId = setTimeout(() => {   
        this.audio.pause();       
        this.audio = new Audio('assets/auordenes/LaPalEs.m4a');
        this.audio.load();
        this.audio.play();
    this.timerId=setTimeout(() => {     
      this.audio.pause();       
      this.audio= new Audio(this.act.obtenerRespAudioLetras());
      this.audio.load();
      this.audio.play();
              }, 2300);   
  }, time); 
            }
    }

  skip(ev){
    this.audio.pause();
    clearTimeout(this.timerId);
    if(ev.detail.checked){
      this.txtorden="Adivina y pronuncia la palabra que se forma con los siguientes sonidos. ";
      this.audio = new Audio('assets/auordenes/fonemica.m4a'); //Orden inicial alternativo
      this.enablemic=true;
      this.enabledM = true;
        this.enabledI = false;
    }else{
      this.txtorden="Adivina y selecciona la imagen que corresponde a los siguientes sonidos. ";
      this.audio = new Audio('assets/auordenes/fonemica2.m4a'); //Orden inicial
      this.enablemic=false;
        this.enabledM = false;
        this.enabledI = true;

    }
    this.audio.load();
    this.audio.play();
    this.timerId=setTimeout(() => {   
      this.audio.pause();       
      this.audio = new Audio('assets/auordenes/LaPalEs.m4a');
      this.audio.load();
      this.audio.play();
  this.timerId= setTimeout(() => {       
    this.audio.pause();     
    this.audio= new Audio(this.act.obtenerRespAudioLetras());
    this.audio.load();
    this.audio.play();
            }, 2200);   
}, 7500); 
  }    
}



