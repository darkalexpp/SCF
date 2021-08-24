import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pregunta21PageRoutingModule } from './pregunta21-routing.module';

import { Pregunta21Page } from './pregunta21.page';
import { ColorSelectorComponent } from '../componentes/color-selector/color-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pregunta21PageRoutingModule
    
  ],
  declarations: [Pregunta21Page, ColorSelectorComponent]
})
export class Pregunta21PageModule {}
