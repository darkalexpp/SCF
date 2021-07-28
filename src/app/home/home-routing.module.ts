import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { recurso } from '../clases/recurso';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), /*recurso*/],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
