import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { vozTexto } from 'src/app/clases/vozTexto';
import { actividad } from 'src/app/clases/actividad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta1',
  templateUrl: './pregunta1.page.html',
  styleUrls: ['./pregunta1.page.scss'],
})
export class Pregunta1Page implements OnInit {

    constructor(private tts: TextToSpeech, private router: Router) { }

  arreglo_informacion= ['barco','cangrejo','caramelo','conejo','escalera','escoba','cocodrilo','murcielago','oso','pera','sandalia','telefono'];
  


  imagenes: string [];
  enabledM=false;

  
  numPr=0;
  

  source="";

  txtsp = new vozTexto(this.tts,'','es-EC',0.60);

  act = new actividad(this.arreglo_informacion,4,3);


  ngOnInit() {
  
    
    this.siguientePregunta();

  }

  cardClick(ev) //Evento de click que carga la imagen principal
  {
    var name:string = ev.target.id;
    name = name.replace('card','img')
    var input = document.getElementById(name);
    var srcAttr = input.getAttribute('src');
    this.source=srcAttr;//estabelece imagen grande
    this.enabledM=true;

    let id: string =  name.slice(3); //id de la opcion seleccionada
    this.comprobarRespuesta(id);
    
  }





    siguientePregunta() //cambia a la nueva pregunta
    {
      if(this.numPr==this.act.arregloResp.length)
      {
      this.router.navigate(['/pregunta2']);
      }
      else
      {
        this.source="";
        this.enabledM=false;
        this.imagenes = this.act.siguiente();
        this.numPr++;
      }
    }

    comprobarRespuesta(id) //comprueba la respuesta correcta
    {

      
      if(id==this.act.obtenerRespuestaCorrecta())
      {
        alert("Muy bien.");
        this.txtsp.texto = "Muy bien.";
        this.txtsp.sonido();
        this.siguientePregunta()
      }
      else{
        
        alert("Inténtalo de nuevo.");
        this.txtsp.texto = "Inténtalo de nuevo.";
        this.txtsp.sonido();
        let audio = new Audio('assets/audio/short-circuit.mp3');
        audio.load();
        audio.play();
      }
    }
 

    sonidoPregunta()
    {

      var text = this.act.obtenerTextoPregunta();
      this.txtsp.texto = text; 
      this.txtsp.sonido();
    }
    
}



