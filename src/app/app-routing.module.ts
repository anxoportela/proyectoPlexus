import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlojamientosComponent } from './components/alojamientos/alojamientos.component';
import {InicioComponent} from './components/inicio/inicio.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'alojamientos', component: AlojamientosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
