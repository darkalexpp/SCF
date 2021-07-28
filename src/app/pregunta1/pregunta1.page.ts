import { Component, OnInit } from '@angular/core';
import {recurso} from 'src/app/clases/recurso';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-pregunta1',
  templateUrl: './pregunta1.page.html',
  styleUrls: ['./pregunta1.page.scss'],
})
export class Pregunta1Page implements OnInit {


  arreglo_recursos : recurso [];

  arreglo_informacion =
  [
    ['','https://image.freepik.com/vector-gratis/casa-dos-pisos_1308-16176.jpg','diraud1','diraud2','diraud3'],
    ['','https://www.freude-kinder.com/wp-content/uploads/2020/06/7-1.jpg','diraud1','diraud2','diraud3'],
    ['','https://hispanicla.com/wp-content/uploads/2010/09/Pinochet.jpg','diraud1','diraud2','diraud3'],
    ['','https://static01.nyt.com/newsgraphics/2019/08/01/candidate-pages/7d63f01f112e79da7ac60c0448a4047a155ff410/trump.jpg','diraud1','diraud2','diraud3'],
    ['','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaYDXhC8h4rm4DuCZ8K1CjAluWxqJwMZgRZQ&usqp=CAU','diraud1','diraud2','diraud3'],
    ['','https://i.ytimg.com/vi/rXQzsQj9noQ/maxresdefault.jpg','diraud1','diraud2','diraud3'],
    ['','https://estaticos.serpadres.es/media/cache/1140x_thumb/uploads/images/article/5fae74835bafe827219e8ace/series_0.jpg','diraud1','diraud2','diraud3'],
    ['','https://www.eltiempo.com/files/article_multimedia/uploads/2018/02/16/5a87aa2aab054.jpeg','diraud1','diraud2','diraud3'],
    ['','https://decine21.com/media/com_decine21/listas/100074/54d51d075bb59603857103d1c1dc1978-780.jpg','diraud1','diraud2','diraud3'],
    ['','https://www.pocoyo.com/img/Categorias/Adivinanzas/2018/01/thumb-adivinanzas-dificiles.jpg','diraud1','diraud2','diraud3'],
    ['','https://files.adventistas.org/noticias/es/2019/07/26110751/livros-de-ellen-white-inspiram-serie-animada-para-criancas.jpg','diraud1','diraud2','diraud3'],
    ['','https://s1.eestatic.com/2021/05/06/imprescindibles/579204207_184285862_1024x576.jpg','diraud1','diraud2','diraud3']
  ];

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
      }
    }
    //-------------------------------------------------------------------------------------

    crearRecursos() //convierte el arreglo de ifnormacion en un arreglo de recursos
    {
      var arr = [];
      for(let i =0;i< this.arreglo_informacion.length;i++)
      {
        var r = new recurso;
        r.nombre = this.arreglo_informacion[i][0];
        r.dirImagen = this.arreglo_informacion[i][1];
        r.audioPalabra = this.arreglo_informacion[i][2];
        r.audioSilabas = this.arreglo_informacion[i][3];
        r.audioLetras = this.arreglo_informacion[i][4];

        arr.push(r);
      }

      
      return arr;
    }


    crearPreguntas() //Inserta en el arreglo bidimensional las preguntas por grupo 
    {
      var pr = this.arreglo_recursos.length/4;//pondras 5 aca guambra
      var cont=0;
      var matrix = [];
      for(let i =0; i<this.arreglo_recursos.length;i++ )
      {
        
        

        var x: recurso [] = this.asignarArreglos(i,(i+pr));

        this.arreglo_preguntas.push(x);
        console.log(this.arreglo_preguntas);

        cont++;
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



