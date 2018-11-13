import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DevicesResolver } from './devices.resolver';

const devicesRoutes: Routes = [{
  path: 'devices',
  children: [
    {
      path: '',
      component: DevicesListComponent,
      canDeactivate: [CanDeactivateGuard],
      canActivate: [AuthGuard]
    },
    {
      path: ':id',
      component: DeviceDetailComponent,
      resolve: {
        device: DevicesResolver
      },
      canDeactivate: [CanDeactivateGuard],
      canActivate: [AuthGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(devicesRoutes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
