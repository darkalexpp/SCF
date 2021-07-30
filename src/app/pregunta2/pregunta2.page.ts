import { Component, OnInit } from '@angular/core';
import {recurso} from 'src/app/clases/recurso';
import { actividad } from 'src/app/clases/actividad';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-pregunta2',
  templateUrl: './pregunta2.page.html',
  styleUrls: ['./pregunta2.page.scss'],
})
export class Pregunta2Page implements OnInit {

  arreglo_recursos : recurso [];
  public enabledI = false;
  public enabledM = true;
  nimg=12;

  ra= ['barco','cangrejo','caramelo','conejo','escalera','escoba','cocodrilo','murcielago','oso','pera','sandalia','telefono','carro','dado','fresa'];

  arreglo_preguntas = [];


  imagenes: string [];
  

  arregloResp: number [];

  numPreg: number = -1;

  source="";
  act = new actividad(this.ra,5,3);
  recVoz

  constructor(private speechRec: SpeechRecognition) { }

  ngOnInit() {
  
      //this.arreglo_recursos = this.crearRecursos();
      
      //this.moverArregloInicial();
      //this.crearPreguntas();


    //this.arregloResp = this.respRandom(4);
    this.imagenes = this.act.siguiente();


  }

  
    cardClick(ev){ //Evento de click que carga la imagen principal
    
    var target = ev.srcElement;
    
    var srcAttr = target.attributes.src;
   
    //console.log("target: "+ srcAttr.nodeValue);
    var value:string = srcAttr.nodeValue;

    
    this.source=value;//estabelece imagen grande

    let audio = new Audio('assets/audio/short-circuit.mp3');
    audio.load();
    audio.play();


    srcAttr = target.attributes.id;
    var id:string = srcAttr.nodeValue;
    
    id =  id.slice(3); //id de la opcion seleccionada
    

    this.comprobarRespuesta(id);
    
  }
  clickmic(ev){ //Evento de click en mic

    //alert("aun no le hago :v");
    //this.enabledM = false;
    //this.enabledI = true;
    this.skip();    
    


  }

  clickOrden(ev){
    //this.enabledI = true;
    let audio = new Audio('assets/audio/short-circuit.mp3');
    audio.load();
    audio.play();
  }
/*
  moverArregloInicial() {//Randomiza las posiciones del arreglo de recursos
  
    this.arreglo_recursos = this.arreglo_recursos.sort(() => Math.random() - 0.5);

  }

  respRandom(n: number) // genera las respuestas correctas al azar de la pregunta
  {
    var arr = [];
    for(let i=0;i<n;i++)
    {
      let n1: number = Math.floor(Math.random() * 3); 
      arr.push(n1);


    }
    console.log("Respuestas:"+arr);
    return arr;
  }

    siguiente() {//cambia a la nueva pregunta
    
      this.numPreg++;
      this.source="";
      if(this.numPreg<this.arregloResp.length){
        this.imagenes = this.obtenerImagenesPregunta(this.numPreg);
        
      }else{
        this.numPreg=0;
        this.imagenes = this.obtenerImagenesPregunta(this.numPreg);
      }
      
    }

    comprobarRespuesta(id) //comprueba la respuesta correcta
    {

      
      if(id==this.arregloResp[this.numPreg])
      {
        alert("Buena pelado coco");
        this.siguiente()
      }
      else{
        alert("vales vrg guambra")
      }
    }
    //-------------------------------------------------------------------------------------

    crearRecursos() //convierte el arreglo de ifnormacion en un arreglo de recursos
    {
      var arr = [];
      for(let i =0;i< this.ra.length;i++)
      {
        var r = new recurso;
        r.nombre = this.ra[i];
        r.dirImagen = '/assets/img/'+this.ra[i]+'.jpg';
        r.audioPalabra = '/assets/aupalabra/'+this.ra[i]+'.jpg';
        r.audioSilabas = '/assets/ausilaba/'+this.ra[i]+'.jpg';
        r.audioLetras = '/assets/auletra/'+this.ra[i]+'.jpg';

        arr.push(r);
      }

      
      return arr;
    }


    crearPreguntas() //Inserta en el arreglo bidimensional las preguntas por grupo 
    {
      var pr = this.nimg/4;
      var matrix = [];
      for(let i =0; i<this.nimg;i++ ) {

        var x: recurso [] = this.arreglo_recursos.slice(i,(i+pr));

        this.arreglo_preguntas.push(x);
        console.log(this.arreglo_preguntas);
        i=i+pr-1;
      } 
    }

    obtenerImagenesPregunta(n: number)     {// genera un arreglo de strings que va a ser las fuentes para las 3 imagenes de la pregunta

      
      var arr = [];
      for(let i=0;i<this.arreglo_preguntas[n].length;i++) {
        arr.push(this.arreglo_preguntas[n][i].dirImagen);
      }
      return arr;
    }*/

    comprobarRespuesta(id) //comprueba la respuesta correcta
    {

      
      if(id==this.act.obtenerRespuestaCorrecta())
      {
        
        alert("Buena pelado coco");
        this.enabledI = true;
        this.siguientePregunta();
        
      }
      else{
        alert("vales vrg guambra")
      }
    }    

    siguientePregunta() //cambia a la nueva pregunta
    {
 
        this.source="";
        this.enabledI = false;
        this.enabledM = true;
        
        //console.log(this.arreglo_preguntas[this.numPreg][this.arregloResp[this.numPreg]].audioLetras);        

        this.imagenes = this.act.siguiente();


      
    }    

    skip(){
          this.enabledM = false;
          this.enabledI = true;
    }    

}



