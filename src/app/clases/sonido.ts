export class sonido{

    audio : any;
    src : string;
    




constructor(private source: string )//info es la informacion en arreglo bidimensional de 5 campos, numPr es el numero de preguntas y OpPr Sson opciones por pregunta
{

    
    this.audio = new Audio();
    this.audio.src = source;
    this.audio.load();
    

    
}


playAudio() { 
this.audio.play();
//this.audio.loop = true;
}

stopAudio() {
this.audio.pause(); 
}
}