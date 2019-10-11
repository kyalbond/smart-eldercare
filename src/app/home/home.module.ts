import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

/**
 * Set routes for tab navigation
 */
const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'senior',
        loadChildren: './senior/senior.module#SeniorPageModule'
      },
      {
        path: 'graph',
        loadChildren: './graph/graph.module#GraphPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/senior',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
