import { Component, OnInit, ViewChildren,QueryList } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { preferencias } from '../clases/preferencias';

@Component({
  selector: 'app-pregunta21',
  templateUrl: './pregunta21.page.html',
  styleUrls: ['./pregunta21.page.scss'],
})
export class Pregunta21Page implements OnInit {



  // Canvas stuff
    @ViewChildren('imageCanvas') canvas: QueryList<any>;
    
  
    canvasElement: any;
  
    saveX: number;
    saveY: number; 

    alto = "";
    ancho = ""; 

  // Color Stuff
    selectedColor = '#9e2956';
  
    colors = ['#ffffff',  '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
  
    //Preguntas
  

    drawing:boolean = false;
    tamLinea:number=4;
  
    txtorden: string= "Dibuja palabras que inicien con el sonido que te voy a decir";
    txtSize=preferencias.txtsize;
    audio;
    acActual:number=1;

    constructor(private platform: Platform, private router: Router) { }


  ngOnInit() {
    this.audio = new Audio('assets/auordenes/fonemica21.m4a'); //Orden inicial alternativo
    this.audio.load();
    this.audio.play();
    this.setTam();
  }

  selectColor(color) {
    console.log(color);
    this.selectedColor = color;
  }
  clickOrden(){
    this.audio.pause();
    if (this.acActual==2)
    this.audio = new Audio('assets/auordenes/fonemica22.m4a'); //Orden inicial alternativo
    else
    this.audio = new Audio('assets/auordenes/fonemica21.m4a'); //Orden inicial alternativo
    this.audio.load();
    this.audio.play();
  }
  siguientePregunta(){ //cambia a la nueva pregunta
    if(this.acActual==2)    {
    this.router.navigate(['/home']);    }
    else{   
      this.acActual++;
      this.txtorden= "Dibuja palabras que terminen con el sonido que te voy a decir";
      this.clearCanvas();
      this.audio = new Audio('assets/auordenes/fonemica22.m4a'); //Orden inicial alternativo
      this.audio.load();
      this.audio.play();
    }}

    clearCanvas(){
      let ctx = this.canvasElement.getContext('2d');
      ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  startDrawing(ev) {

    this.drawing=true;
 
    //this.contentScrollActive=false;
   
    var target = ev.srcElement;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    //console.log(value);  

    let c1 = this.canvas.find(can => can.nativeElement.id == value);
    //console.log(c1.nativeElement);  
    
    
    this.canvasElement = c1.nativeElement;
    var canvasPosition = this.canvasElement.getBoundingClientRect();
   
    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }
   
  moved(ev) {
    if (!this.drawing) 
    return;

    var target = ev.srcElement;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    //console.log(value);  

    let c1 = this.canvas.find(can => can.nativeElement.id == value);
    //console.log(c1.nativeElement);  
    
    this.canvasElement = c1.nativeElement;
    var canvasPosition = this.canvasElement.getBoundingClientRect();
   
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.pageX - canvasPosition.x;
    let currentY = ev.pageY - canvasPosition.y;
   
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.tamLinea;
   
    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
   
    ctx.stroke();
   
    this.saveX = currentX;
    this.saveY = currentY;

    
    
  }  

  endDraw(){
    this.drawing = false;
  }

  setTam()
  {
    this.platform.ready().then(() => {
      //console.log('Width: ' + this.platform.width());
      //console.log('Width: ' + this.platform.height());

      let b:number =this.platform.width();
      let a:number =this.platform.height();
      //console.log('Height: ' + this.platform.height());
      //this.alto = (""+this.platform.height());

      this.alto=a+"";
      this.ancho=b+"";

        });

    
  }

}
