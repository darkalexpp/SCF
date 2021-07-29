import { Component, OnInit } from '@angular/core';
import {recurso} from 'src/app/clases/recurso';

@Component({
  selector: 'app-pregunta1',
  templateUrl: './pregunta1.page.html',
  styleUrls: ['./pregunta1.page.scss'],
})
export class Pregunta1Page implements OnInit {

  arreglo_recursos : recurso [];
  nimg=12;

  ra= ['barco','cangrejo','caramelo','conejo','escalera','escoba','lokidrilo','murcielago','oso','pera','sandalia','telefono'];

  arreglo_preguntas = [];


  imagenes: string [];
  

  arregloResp: number [];

  numPreg: number = -1;

  source="";

  constructor() { }

  ngOnInit() {
  
      this.arreglo_recursos = this.crearRecursos();
      
      this.moverArregloInicial();
      this.crearPreguntas();


    this.arregloResp = this.respRandom(4);
    this.siguiente();

  }

  cardClick(ev) //Evento de click que carga la imagen principal
  {
    
    var target = ev.srcElement;
    var srcAttr = target.attributes.src;
   
    
    var value:string = srcAttr.nodeValue;

    
    this.source=value;//estabelece imagen grande




    srcAttr = target.attributes.id;
    var id:string = srcAttr.nodeValue;
    
    id =  id.slice(3); //id de la opcion seleccionada
    

    this.comprobarRespuesta(id);
    
  }

  moverArregloInicial()//Randomiza las posiciones del arreglo de recursos
  {
    for(let i=0;i<15;i++)
    {
      let n1: number = Math.floor(Math.random() * 12);//en vez de 12 tu pondras 15 guambra
      let n2 = Math.floor(Math.random() * 12);
      while(n1===n2)
      {
        n2 = Math.floor(Math.random() * 12);
      }

      let aux = this.arreglo_recursos[n1];

      this.arreglo_recursos[n1]=this.arreglo_recursos[n2];
      this.arreglo_recursos[n2]=aux;
      

    }

  }

  asignarArreglos(ini,fin)//Funcion que genera un arreglo con los recursos para la pregunta
  {
    var arr = [];
    for(let i=ini;i<fin;i++)
    {
      arr.push(this.arreglo_recursos[i]);
      
    }

    return arr;
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

    siguiente() //cambia a la nueva pregunta
    {
      this.numPreg++;
      this.source="";
      if(this.numPreg<this.arregloResp.length)
      {
        this.imagenes = this.obtenerImagenesPregunta(this.numPreg);
        
      }
      else
      {
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
        let audio = new Audio('assets/audio/short-circuit.mp3');
        audio.load();
        audio.play();
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

    obtenerImagenesPregunta(n: number) // genera un arreglo de strings que va a ser las fuentes para las 3 imagenes de la pregunta
    {
      
      var arr = [];
      for(let i=0;i<this.arreglo_preguntas[n].length;i++)
      {
        arr.push(this.arreglo_preguntas[n][i].dirImagen);
       
      }
      return arr;
    }
}



