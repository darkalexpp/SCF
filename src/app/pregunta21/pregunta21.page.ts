import { Component, OnInit, ViewChildren,QueryList } from '@angular/core';
import { Platform } from '@ionic/angular';

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
  
    colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
  
    //Preguntas
  
    //preguntas=['Pregunta 1','Pregunta 2','Pregunta 3','Prgeunta 4','Pregunta 5','Pregunta 6','Pregunta 7'];
    constructor(private platform: Platform) { }
  

  ngOnInit() {
    this.setTam();
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  startDrawing(ev) {
 
    //this.contentScrollActive=false;
   
    var target = ev.srcElement;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    //console.log(value);  

    let c1 = this.canvas.find(can => can.nativeElement.id == value);
    //console.log(c1.nativeElement);  
    
    
    this.canvasElement = c1.nativeElement;
    var canvasPosition = this.canvasElement.getBoundingClientRect();
   
    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }
   
  moved(ev) {

    var target = ev.srcElement;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    //console.log(value);  

    let c1 = this.canvas.find(can => can.nativeElement.id == value);
    //console.log(c1.nativeElement);  
    
    this.canvasElement = c1.nativeElement;
    var canvasPosition = this.canvasElement.getBoundingClientRect();
   
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX - canvasPosition.x;
    let currentY = ev.touches[0].pageY - canvasPosition.y;
   
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = 5;
   
    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
   
    ctx.stroke();
   
    this.saveX = currentX;
    this.saveY = currentY;

    
    
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
