import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'pregunta1',
    loadChildren: () => import('./pregunta1/pregunta1.module').then( m => m.Pregunta1PageModule)
  },
  {
    path: 'pregunta2',
    loadChildren: () => import('./pregunta2/pregunta2.module').then( m => m.Pregunta2PageModule)
  },
  {
    path: 'pregunta3',
    loadChildren: () => import('./pregunta3/pregunta3.module').then( m => m.Pregunta3PageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
