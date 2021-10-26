import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pregunta12PageRoutingModule } from './pregunta12-routing.module';

import { Pregunta12Page } from './pregunta12.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pregunta12PageRoutingModule
  ],
  declarations: [Pregunta12Page]
})
export class Pregunta12PageModule {}
