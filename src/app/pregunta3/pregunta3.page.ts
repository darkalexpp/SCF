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
  arreglo_informacion=preferencias.raCI1;


  imagenes: string [];
  enabledM=false;

  
  numPr=0;
  
  acActual:string;
  NacTotal:string;

  source="";
  alto="";
  ancho="";
  audio;
  audioi1;
  audioi2;
  
  audior1;
  audior2;
  audiop;
  timerId;

  icdis: boolean = true;

  //txtsp = new vozTexto(this.tts,'','es-EC',0.60);

  act = new actividad(this.arreglo_informacion,2,3);


  ngOnInit() {
    
    this.audioi1 = new Audio('');
    this.audioi2 = new Audio('');
    this.audior1 = new Audio('');
    this.audior2 = new Audio('');
    this.audiop = new Audio('');

    this.audio = new Audio('');
  
    this.NacTotal=this.act.obtenerNumTotalPreguntas()+'';
    //this.setTam(); setear tamaño basado en los pixeles
    this.act.establecerRecursosRimas(preferencias.raCI2);
    
    this.siguientePregunta();



  }

  cardClick(ev) //Evento de click que carga la imagen principal
  {
    var name:string = ev.target.id;
    //name = name.replace('card','img')
    //var input = document.getElementById(name);
    //var srcAttr = input.getAttribute('src');
    //this.source=srcAttr;//estabelece imagen grande
    //this.enabledM=true;

    //name = ev.target.id;

    let id = name.replace('img','')
    var audiocard=this.imagenes[id].replace('img','aupalabra');
    audiocard=audiocard.replace('png','m4a');
    //console.log( audiocard); 

    this.stopAudio();
    this.audiop = new Audio(audiocard);
    this.audiop.load();
    this.audiop.play();
    clearTimeout(this.timerId); 
    setTimeout(() => {  
    this.comprobarRespuesta(id);
    }, 1800);

    
  }





    siguientePregunta() //cambia a la nueva pregunta
    {
      
      if(this.numPr==this.act.arregloResp.length)
      {
      this.router.navigate(['/home']);
      }
      else
      {
        this.icdis=true;
        this.source="";
        this.enabledM=false;
        this.acActual = ''+(this.act.obtenerNumPregunta()+2);
        //
        
        //
        this.imagenes = this.act.siguiente();
        this.source = this.act.obtenerFuentePreguntaRima().dirImagen.toString();
        this.numPr++;
        this.clickOrden();
        
      }
    }

    comprobarRespuesta(id) //comprueba la respuesta correcta
    {

      
      if(id==this.act.obtenerRespuestaCorrecta())
      {
        //alert("Muy bien.");
        //this.txtsp.texto = "Muy bien.";
        //this.txtsp.sonido();
        //this.siguientePregunta()
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {          
          this.audior1= new Audio('assets/auordenes/LoHicMuyBien.m4a');
          this.audior1.load();
          this.audior1.play();
                  }, 0);          
      }
      else{
        
        clearTimeout(this.timerId);
        this.timerId =  setTimeout(() => {          
        this.audior2= new Audio('assets/auordenes/IntDeNue.m4a');
        this.audior2.load();
        this.audior2.play();
                }, 0); 
      }
      this.enabledM=false;
    }
 
    
  clickOrden(){
  //this.audio.pause();
    this.stopAudio();
    //this.audio.currentTime = 0;
    //this.audio = new Audio('');
  
    
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {   
    this.audioi1.pause();       
    this.audioi1 = new Audio('assets/auordenes/silabica.m4a');
    this.audioi1.load();
    this.audioi1.play();

    clearTimeout(this.timerId);  
    this.timerId = setTimeout(() => {          
      this.audioi2= new Audio('assets/auordenes/LaPalEs.m4a');
      this.audioi2.load();
      this.audioi2.play();


      clearTimeout(this.timerId);  
      this.timerId =setTimeout(() => {          
        this.audio= new Audio(this.act.obtenerRespAudioLetras());
        this.audio.load();
        this.audio.play();

        this.icdis = false;
        
      }, 2000);  
    }, 9500);   
    }, 3000); 

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

    clickAuResp()
    {
      //this.audio.pause();
      this.stopAudio();

      clearTimeout(this.timerId);
      this.timerId = this.timerId = setTimeout(() => {          
        this.audioi2= new Audio('assets/auordenes/LaPalEs.m4a');
        this.audioi2.load();
        this.audioi2.play();

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {          
          this.audio= new Audio(this.act.obtenerRespAudioLetras());
          this.audio.load();
          this.audio.play();
    
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


