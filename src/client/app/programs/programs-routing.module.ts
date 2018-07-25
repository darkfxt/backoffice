import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CanDeactivateGuard} from '../shared/services/can-deactivate-guard.service';
import {ProgramsComponent} from './programs.component';
import {ProgramComponent} from './program/program.component';


const rRoutes: Routes = [
  {
    path: 'programs',
    children: [
      {
        path: '',
        component: ProgramsComponent,
      },
      {
        path: ':id',
        component: ProgramComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(rRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProgramsRoutingModule { }
