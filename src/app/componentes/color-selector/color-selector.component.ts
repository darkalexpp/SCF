import { Component, OnInit,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss'],
})
export class ColorSelectorComponent implements OnInit {
  @Output() newSelectedColor = new EventEmitter<string>();
  selectedColor = '#9e2956';
  

  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
  constructor() { }

  ngOnInit() {}

  colorChanged(color) {
    this.selectedColor=color;
    
    this.newSelectedColor.emit(this.selectedColor);
    //console.log(this.selectedColor);
  }

}