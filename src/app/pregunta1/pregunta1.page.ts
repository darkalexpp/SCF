import { Component, OnInit } from '@angular/core';
//import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

import { preferencias } from 'src/app/clases/preferencias';
import { vozTexto } from 'src/app/clases/vozTexto';
import { actividad } from 'src/app/clases/actividad';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-pregunta1',
  templateUrl: './pregunta1.page.html',
  styleUrls: ['./pregunta1.page.scss'],
})
export class Pregunta1Page implements OnInit {

    constructor(/*private tts: TextToSpeech,*/ private router: Router,private platform: Platform) { }

  arreglo_informacion=preferencias.raCS;


  imagenes: string [];


  
  numPr=0;
  
  acActual:string;
  NacTotal:string;

  alto="";
  ancho="";
  audioi1;
  audioi2;
  
  audior1;
  audior2;
  audiop;

  audio;

  icdis: boolean = true;
  timerId;

  //txtsp = new vozTexto(this.tts,'','es-EC',0.60);

  act = new actividad(this.arreglo_informacion,4,3);


  ngOnInit() {
    
    this.audioi1 = new Audio('');
    this.audioi2 = new Audio('');
    this.audior1 = new Audio('');
    this.audior2 = new Audio('');
    this.audiop = new Audio('');

    this.audio = new Audio('');
    this.NacTotal=this.act.obtenerNumTotalPreguntas()+'';
    //this.setTam(); //setear tamaño basado en los pixeles
    this.siguientePregunta();



  }

  cardClick(ev) //Evento de click que carga la imagen principal
  {
    var name:string = ev.target.id;
    //console.log("name: "+name);
    //name = name.replace("card","img");
    //var input = document.getElementById(name);
    //var srcAttr = input.getAttribute('src');
    //this.source=srcAttr;//estabelece imagen grande
    //this.enabledM=true;




    

    let id = name.replace('card','');
    id = id.replace('img','');
    console.log("id: "+id);
    var audiocard=this.imagenes[id].replace('img','aupalabra');
    audiocard=audiocard.replace('png','m4a');
    //console.log( audiocard); 

    ///this.audio.pause();
    this.stopAudio();
    this.audiop = new Audio(audiocard);
    this.audiop.load();
    this.audiop.play().catch(function() {
      console.log("printeado")
  });;
    clearTimeout(this.timerId); 
    setTimeout(() => {  
    this.comprobarRespuesta(id);
    }, 1800);



    //let id: string =  name.slice(3); //id de la opcion seleccionada
    //this.comprobarRespuesta(id);
    
  }





    siguientePregunta() //cambia a la nueva pregunta
    {
      if(this.numPr==this.act.arregloResp.length)
      {
        this.stopAudio();
        clearTimeout(this.timerId);
        this.router.navigate(['/pregunta3']);
      
      }
      else
      {
        this.icdis = true;
        //this.source="";
        
        //this.acActual = ''+(this.act.obtenerNumPregunta()+2);
        //this.imagenes = this.act.siguiente();
        this.numPr++;
      
        
        //if (this.act.obtenerNumPregunta()==0)
        
        //else time=0;
          
          this.acActual = ''+(this.act.obtenerNumPregunta()+2);
          this.imagenes = this.act.siguiente();
          //console.log(this.imagenes);
          if(this.numPr>1)
          this.clickOrden(false);
          else
          this.clickOrden(true);
      }      
      }





    comprobarRespuesta(id) //comprueba la respuesta correcta
    {

     
      if(id==this.act.obtenerRespuestaCorrecta())
      {
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {          
          this.audior1= new Audio('assets/auordenes/LoHicMuyBien.m4a');
          this.audior1.load();
          this.audior1.play().catch(function() {
            //console.log("printeado")
        });;
                  }, 0);  
                  /*
        this.audio = new Audio('assets/auordenes/LoHicMuyBien.m4a');
        this.audio.load();
        this.audio.play();*/
        //alert("Muy bien.");           
        //alert("Muy bien.");
        //this.txtsp.texto = "Muy bien.";
        //this.txtsp.sonido();
        //this.siguientePregunta()
      }
      else{
        
        //alert("Inténtalo de nuevo.");
        //this.txtsp.texto = "Inténtalo de nuevo.";
        //this.txtsp.sonido();

          clearTimeout(this.timerId);
          this.timerId =  setTimeout(() => {          
          this.audior2= new Audio('assets/auordenes/IntDeNue.m4a');
          this.audior2.load();
          this.audior2.play().catch(function() {
            //console.log("printeado")
        });;
                  }, 0);  
      }
     
    }
 
    
  clickOrden(v: boolean){
 

        //this.audio.pause();
        this.stopAudio();
        //this.audio.currentTime = 0;
        //this.audio = new Audio('');
       
       var or='assets/auordenes/silabica.m4a';
        var t=1000;
        var t2=9500;
        if(v==false)
        {
          //or='';
          t=0;
          t2=0;
        }
       
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {   
      this.audioi1.pause();       
      this.audioi1 = new Audio(or);
      this.audioi1.load();
      this.audioi1.play().catch(function() {
        //console.log("printeado")
    });;
      if(v==false)
        this.audioi1.pause();


        clearTimeout(this.timerId);  
        this.timerId =setTimeout(() => {          
          this.audio= new Audio(this.act.obtenerRespAudioSilabas());
          this.audio.load();
          this.audio.play().catch(function() {
            //console.log("printeado")
        });;
    
          this.icdis = false;
          
        }, t2);  
        
    }, t); 
  


  }


    setTam()
    {
      this.platform.ready().then(() => {
        console.log('Width: ' + this.platform.width());
        console.log('Width: ' + this.platform.height());

        let b:number =this.platform.width();
        let a:number =this.platform.height();
        //console.log('Height: ' + this.platform.height());
        //this.alto = (""+this.platform.height());
        a = a*0.5;
        b = b*0.5;
        this.alto=a+"";
        this.ancho=b+"";

          });

      
    }

    clickAuResp()
    {
      //this.audio.pause();
      this.stopAudio();

      clearTimeout(this.timerId);
      this.timerId = this.timerId = setTimeout(() => {          
        this.audioi2= new Audio('assets/auordenes/LaPalEs.m4a');
        this.audioi2.load();
        this.audioi2.play().catch(function() {
          //console.log("printeado")
      });;

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {          
          this.audio= new Audio(this.act.obtenerRespAudioSilabas());
          this.audio.load();
          this.audio.play().catch(function() {
            //console.log("printeado")
        });;
    
          this.icdis = false;
        }, 2000);  
      }, 1000);   
    }

    stopAudio()
    {
      this.audio.pause();
      this.audioi1.pause();
      this.audioi2.pause();
      this.audior1.pause();
      //this.audior1.currentTime = 0;
      this.audior2.pause();
      //this.audior2.currentTime = 0;
      this.audiop.pause();
  
    

    }
    
}



  /*
  var pl = this.audio.play();
  if (pl) {
    pl.then(() => {
        // Audio Loading Successful
        // Audio playback takes time
        setTimeout(() => {
            // Follow up operation
            console.log("done.");
        }, this.audio.duration * 1000); // audio.duration is the length of the audio in seconds.


    }).catch((e) => {
        // Audio loading failure
    });
}*/