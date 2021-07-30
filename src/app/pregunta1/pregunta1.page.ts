import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { vozTexto } from 'src/app/clases/vozTexto';
import { actividad } from 'src/app/clases/actividad';

@Component({
  selector: 'app-pregunta1',
  templateUrl: './pregunta1.page.html',
  styleUrls: ['./pregunta1.page.scss'],
})
export class Pregunta1Page implements OnInit {

    constructor(private tts: TextToSpeech) { }
/*
  arreglo_informacion =
  [
    ['casa','https://image.freepik.com/vector-gratis/casa-dos-pisos_1308-16176.jpg','diraud1','diraud2','diraud3'],
    ['perro','https://www.freude-kinder.com/wp-content/uploads/2020/06/7-1.jpg','diraud1','diraud2','diraud3'],
    ['gato','https://hispanicla.com/wp-content/uploads/2010/09/Pinochet.jpg','diraud1','diraud2','diraud3'],
    ['auto','https://static01.nyt.com/newsgraphics/2019/08/01/candidate-pages/7d63f01f112e79da7ac60c0448a4047a155ff410/trump.jpg','diraud1','diraud2','diraud3'],
    ['carro','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaYDXhC8h4rm4DuCZ8K1CjAluWxqJwMZgRZQ&usqp=CAU','diraud1','diraud2','diraud3'],
    ['moto','https://i.ytimg.com/vi/rXQzsQj9noQ/maxresdefault.jpg','diraud1','diraud2','diraud3'],
    ['sonido','https://estaticos.serpadres.es/media/cache/1140x_thumb/uploads/images/article/5fae74835bafe827219e8ace/series_0.jpg','diraud1','diraud2','diraud3'],
    ['ave','https://www.eltiempo.com/files/article_multimedia/uploads/2018/02/16/5a87aa2aab054.jpeg','diraud1','diraud2','diraud3'],
    ['avion','https://decine21.com/media/com_decine21/listas/100074/54d51d075bb59603857103d1c1dc1978-780.jpg','diraud1','diraud2','diraud3'],
    ['espacio','https://www.pocoyo.com/img/Categorias/Adivinanzas/2018/01/thumb-adivinanzas-dificiles.jpg','diraud1','diraud2','diraud3'],
    ['lugar','https://files.adventistas.org/noticias/es/2019/07/26110751/livros-de-ellen-white-inspiram-serie-animada-para-criancas.jpg','diraud1','diraud2','diraud3'],
    ['comida','https://s1.eestatic.com/2021/05/06/imprescindibles/579204207_184285862_1024x576.jpg','diraud1','diraud2','diraud3']
  ];*/
  arreglo_informacion= ['barco','cangrejo','caramelo','conejo','escalera','escoba','cocodrilo','murcielago','oso','pera','sandalia','telefono'];
  


  imagenes: string [];
  

  

  

  source="";

  txtsp = new vozTexto(this.tts,'','es-EC',0.60);

  act = new actividad(this.arreglo_informacion,4,3);


  ngOnInit() {
  
    
    this.imagenes = this.act.siguiente();

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





    siguientePregunta() //cambia a la nueva pregunta
    {
 
        this.source="";

        this.imagenes = this.act.siguiente();


      
    }

    comprobarRespuesta(id) //comprueba la respuesta correcta
    {

      
      if(id==this.act.obtenerRespuestaCorrecta())
      {
        alert("Buena pelado coco");
        this.txtsp.texto = "Buena pelado coco";
        this.txtsp.sonido();
        this.siguientePregunta()
      }
      else{
        
        alert("vales vrg guambra");
        this.txtsp.texto = "vales vrg guambra";
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



