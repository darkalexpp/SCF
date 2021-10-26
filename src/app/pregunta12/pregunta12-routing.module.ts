import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pregunta12Page } from './pregunta12.page';

const routes: Routes = [
  {
    path: '',
    component: Pregunta12Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pregunta12PageRoutingModule {}
