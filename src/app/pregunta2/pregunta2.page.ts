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

constructor(private sr: SpeechRecognition) { }
ngOnInit() {
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

  this.skip();   
  var txt = this.recVoz.startListening();
  alert("dice: "+txt);
}

clickOrden(){
 
  let audio = new Audio('assets/audio/short-circuit.mp3');
  audio.load();
  audio.play();
}

  comprobarRespuesta(id) //comprueba la respuesta correcta
  {
    if(id==this.act.obtenerRespuestaCorrecta())
    {
      
      alert("Muy bien.");
      this.enabledI = true;
      this.siguientePregunta();
      
    }
    else{
      alert("Inténtalo de nuevo.")
    }
  }    

  siguientePregunta() //cambia a la nueva pregunta
  {

      this.source="";
      this.enabledI = false;
      this.enabledM = true;
      this.imagenes = this.act.siguiente();
      //console.log(this.act.obtenerRespAudioLetras());     
  }    

  skip(){
        this.enabledM = false;
        this.enabledI = true;
  }    

}



