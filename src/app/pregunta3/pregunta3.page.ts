import { Component, OnInit } from '@angular/core';



import { preferencias } from 'src/app/clases/preferencias';
import { vozTexto } from 'src/app/clases/vozTexto';
import { actividad } from 'src/app/clases/actividad';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pregunta3',
  templateUrl: './pregunta3.page.html',
  styleUrls: ['./pregunta3.page.scss'],
})
export class Pregunta3Page implements OnInit {

  constructor(private platform: Platform, private router: Router) { }
  arreglo_informacion=preferencias.raCS;


  imagenes: string [];
  enabledM=false;

  
  numPr=0;
  
  acActual:string;
  NacTotal:string;

  source="";
  alto="";
  ancho="";

  //txtsp = new vozTexto(this.tts,'','es-EC',0.60);

  act = new actividad(this.arreglo_informacion,4,3);


  ngOnInit() {
  
    this.NacTotal=this.act.obtenerNumTotalPreguntas()+'';
    //this.setTam(); setear tamaño basado en los pixeles
    this.act.establecerRecursosRimas(preferencias.raCI);
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
      this.router.navigate(['/home']);
      }
      else
      {
        this.source="";
        this.enabledM=false;
        this.acActual = ''+(this.act.obtenerNumPregunta()+1);
        //
        console.log(this.act.obtenerFuentePreguntaRima());
        //
        this.imagenes = this.act.siguiente();
        this.numPr++;
        
      }
    }

    comprobarRespuesta(id) //comprueba la respuesta correcta
    {

      
      if(id==this.act.obtenerRespuestaCorrecta())
      {
        alert("Muy bien.");
        //this.txtsp.texto = "Muy bien.";
        //this.txtsp.sonido();
        this.siguientePregunta()
      }
      else{
        
        alert("Inténtalo de nuevo.");
        //this.txtsp.texto = "Inténtalo de nuevo.";
        //this.txtsp.sonido();
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

    sonidoPregunta()
    {

      var text = this.act.obtenerTextoPregunta();
      //this.txtsp.texto = text; 
     //this.txtsp.sonido();
    }
    setTam()
    {
      this.platform.ready().then(() => {
        console.log('Width: ' + this.platform.width());

        let a:number =this.platform.width();
        //console.log('Height: ' + this.platform.height());
        //this.alto = (""+this.platform.height());
        a = a*0.20
        this.alto=a+"";
        this.ancho=a+"";

          });

      
    }
    
}


