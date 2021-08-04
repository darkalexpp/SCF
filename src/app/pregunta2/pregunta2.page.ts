import { Component, OnInit } from '@angular/core';

import { actividad } from 'src/app/clases/actividad';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { recVoz } from '../clases/recVoz';

@Component({
  selector: 'app-pregunta2',
  templateUrl: './pregunta2.page.html',
  styleUrls: ['./pregunta2.page.scss'],
})
export class Pregunta2Page implements OnInit {


public enabledI = false;
public enabledM = true;


ra= ['barco','cangrejo','caramelo','conejo','escalera','escoba','cocodrilo','murcielago','oso','pera','sandalia','telefono','carro','dado','fresa'];

imagenes: string [];
source="";
act = new actividad(this.ra,5,3);
recVoz = new recVoz(this.sr);
acActual:string;
NacTotal:string;

constructor(private sr: SpeechRecognition) { }
ngOnInit() {
  let audio = new Audio('assets/audio/short-circuit.mp3'); //Audio orden inicial
    audio.load();
    audio.play();
  this.NacTotal=this.act.obtenerNumTotalPreguntas()+'';
  this.siguientePregunta();
}


  cardClick(ev){ //Evento de click que carga la imagen principal
  
    var name:string = ev.target.id;
    name = name.replace('card','img')
    var input = document.getElementById(name);
    var srcAttr = input.getAttribute('src');
    
    this.source=srcAttr;//estabelece imagen grande
    let audio = new Audio('assets/audio/short-circuit.mp3');
    audio.load();
    audio.play();

    let id: string =  name.slice(3); //id de la opcion seleccionada
    this.comprobarRespuesta(id);
}
clickmic(){ //Evento de click en mic

  //this.skip();   
  var txt = this.recVoz.startListening();
  alert("dice: "+txt);
  alert("coindicencia de: "+this.recVoz.similarity(this.act.obtenerTextoPregunta(),txt))
  if (this.recVoz.similarity(this.act.obtenerTextoPregunta(),txt) >= 0.5){
    let audio = new Audio('assets/audio/short-circuit.mp3');
  audio.load();
  audio.play();
  }else{
    let audio = new Audio('assets/audio/short-circuit.mp3');
  audio.load();
  audio.play();
  }
}

clickOrden(){
 
  let audio = new Audio('assets/audio/short-circuit.mp3'); //Orden inicial
  audio.load();
  audio.play();
}

clickAuResp(){
 // let audio = new Audio(this.act.obtenerRespAudioLetras());
  let audio = new Audio('assets/audio/short-circuit.mp3'); // palabra respuesta
  audio.load();
  audio.play();
}

  comprobarRespuesta(id) //comprueba la respuesta correcta
  {
    if(id==this.act.obtenerRespuestaCorrecta())
    {
      
      alert("Muy bien.");
      let audio = new Audio('assets/audio/short-circuit.mp3');
  audio.load();
  audio.play();
      this.enabledI = true;
      
    }
    else{
      alert("Inténtalo de nuevo.")
      let audio = new Audio('assets/audio/short-circuit.mp3');
  audio.load();
  audio.play();
    }
  }    

  siguientePregunta(){ //cambia a la nueva pregunta

      this.source="";
      this.acActual = ''+(this.act.obtenerNumPregunta()+1);
      this.imagenes = this.act.siguiente();
    //  let audio = new Audio(this.act.obtenerRespAudioLetras());
      let audio = new Audio('assets/audio/short-circuit.mp3'); //audio palabra respuesta
    audio.load();
    audio.play();
  }    

  skip(ev){
    if(ev.detail.checked){
        this.enabledM = false;
        this.enabledI = true;
    }else{
      this.enabledM = true;
        this.enabledI = false;
    }
  }    
}



