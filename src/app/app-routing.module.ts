import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MaterialDashboardComponent} from './material-dashboard/material-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialDashboardComponent
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)  
    ],
   exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
