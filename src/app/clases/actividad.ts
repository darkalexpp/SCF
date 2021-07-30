import { recurso } from 'src/app/clases/recurso';

export class actividad{
    arreglo_recursos : recurso [];
    arreglo_informacion : string [];
    arreglo_preguntas = [];
    //imagenes: string [];
    arregloResp: number [];
    numPreg: number = -1;
    numRecursos: number;
    numPreguntas: number;
    numOpcionesPregunta: number;
    


    constructor(private info: string [], private numPr: number, private OpPr: number)//info es la informacion en arreglo bidimensional de 5 campos, numPr es el numero de preguntas y OpPr Sson opciones por pregunta
    {
        this.arreglo_informacion = info;
        this.numRecursos = info.length;
        this.numPreguntas = numPr;
        this.numOpcionesPregunta=OpPr;
        this.arreglo_recursos = this.crearRecursos();
        this.moverArregloInicial();
        this.crearPreguntas();     
        this.arregloResp = this.respRandom(numPr);
        this.siguiente();

        
    }


    crearRecursos() //convierte el arreglo de ifnormacion en un arreglo de recursos
    {
      var arr = [];
      for(let i =0;i< this.arreglo_informacion.length;i++)
      {
        var r = new recurso;
        r.nombre = this.arreglo_informacion[i];
        r.dirImagen = '/assets/img/'+this.arreglo_informacion[i]+'.jpg';
        r.audioPalabra = '/assets/aupalabra/'+this.arreglo_informacion[i]+'.jpg';
        r.audioSilabas = '/assets/ausilaba/'+this.arreglo_informacion[i]+'.jpg';
        r.audioLetras = '/assets/auletra/'+this.arreglo_informacion[i]+'.jpg';

        arr.push(r);
      }

      
      return arr;
    }

    moverArregloInicial()//Randomiza las posiciones del arreglo de recursos
    {
      /*
      for(let i=0;i<this.numRecursos+3;i++)
      {
        let n1: number = Math.floor(Math.random() * this.numRecursos);//en vez de 12 tu pondras 15 guambra
        let n2 = Math.floor(Math.random() * this.numRecursos);
        while(n1===n2)
        {
          n2 = Math.floor(Math.random() * this.numRecursos);
        }
  
        let aux = this.arreglo_recursos[n1];
  
        this.arreglo_recursos[n1]=this.arreglo_recursos[n2];
        this.arreglo_recursos[n2]=aux;
        
        
  
      }*/
      this.arreglo_recursos = this.arreglo_recursos.sort(() => Math.random() - 0.5);
  
    }
    
    
    crearPreguntas() //Inserta en el arreglo bidimensional las preguntas por grupo 
    {
      var pr = this.arreglo_recursos.length/this.numPreguntas;//pondras 5 aca guambra
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
        let n1: number = Math.floor(Math.random() * this.OpPr); 
        arr.push(n1);
  
  
      }
      console.log("Respuestas:"+arr);
      return arr;
    }    

    siguiente() //cambia a la nueva pregunta-----------------------------ARREGLA
    {
      this.numPreg++;
      //this.source="";
      var imagenes: string [];
      if(this.numPreg<this.arregloResp.length)
      {
        imagenes = this.obtenerImagenesPregunta(this.numPreg);
        
      }
      else
      {
        this.numPreg=0;
        imagenes = this.obtenerImagenesPregunta(this.numPreg);
      }
      return imagenes;
      
    }    


    obtenerImagenesPregunta(n: number) // genera un arreglo de strings que va a ser las fuentes para las 3 imagenes de la pregunta
    {
      console.log("ARR PREGUNTAS: "+this.arreglo_preguntas[0][0]);
      var arr = [];
      for(let i=0;i<this.arreglo_preguntas[n].length;i++)
      {
          console.log("n: "+n);
          console.log("i :"+i);
        arr.push(this.arreglo_preguntas[n][i].dirImagen);
       
      }
      return arr;
    }    


    obtenerRespuestaCorrecta()
    {
        return this.arregloResp[this.numPreg];
    }    


    obtenerTextoPregunta()
    {
        return this.arreglo_preguntas[this.numPreg][this.arregloResp[this.numPreg]].nombre;
    }

}