import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pregunta21Page } from './pregunta21.page';

const routes: Routes = [
  {
    path: '',
    component: Pregunta21Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pregunta21PageRoutingModule {}
