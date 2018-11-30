import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonListComponent } from './common-list.component';
import { ListComponent } from './list/list.component';
import { FiltersComponent } from './filters/filters.component';
import { CommonListDirective } from './common-list.directive';
import { PointSummarizedCardComponent } from '../../places/point-summarized-card/point-summarized-card.component';
import { LoadingModule } from '../loading/loading.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouteSummarizedCardComponent } from '../../routes/route-summarized-card/route-summarized-card.component';
import { TripTemplateSummarizedCardComponent } from '../../trip-templates/trip-template-summarized-card/trip-template-summarized-card.component'; // tslint:disable-line
import { EventSummarizedCardComponent } from '../../trip-templates/trip-template-detail/trip-template-itinerary/event-summarized-card/event-summarized-card.component'; // tslint:disable-line
import { UserSummarizedCardComponent } from '../../users/users-list/user-summarized-card/user-summarized-card.component'; // tslint:disable-line
import { AccountSummarizedCardComponent } from '../../accounts/accounts-list/account-summarized-card/account-summarized-card.component'; // tslint:disable-line
import { BookingSummarizedCardComponent } from '../../booking/booking-list/booking-summarized-card/booking-summarized-card.component';
import { DeviceSummarizedCardComponent } from '../../devices/devices-list/device-summarized-card/device-summarized-card.component'; // tslint:disable-line


@NgModule({
  imports: [
    CommonModule,
    LoadingModule,
    MatPaginatorModule
  ],
  declarations: [CommonListComponent,
    ListComponent, FiltersComponent,
    CommonListDirective],
  exports: [
    CommonListComponent
  ],
  entryComponents: [DeviceSummarizedCardComponent, PointSummarizedCardComponent, RouteSummarizedCardComponent,
    TripTemplateSummarizedCardComponent, EventSummarizedCardComponent, UserSummarizedCardComponent,
    AccountSummarizedCardComponent, BookingSummarizedCardComponent]
})
export class CommonListModule { }
