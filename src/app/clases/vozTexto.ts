import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

export class vozTexto{
    texto: string;
    locacion: string;
    velocidad: number;
    
    
    constructor(private tts: TextToSpeech,private t: string, private l : string, private v: number) { 
        this.texto = t;
        this.locacion = l;
        this.velocidad = v;
     
    }
    
    
    
    sonido()
    {
        this.tts.speak({
            text:this.texto,
            locale: this.locacion,
            rate:this.velocidad
          
          });   
    }


}


