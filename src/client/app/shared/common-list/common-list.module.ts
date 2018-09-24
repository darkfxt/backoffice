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
import { TripTemplateSummarizedCardComponent } from '../../trip-templates/trip-template-summarized-card/trip-template-summarized-card.component';
import { EventSummarizedCardComponent } from '../../trip-templates/trip-template-detail/trip-template-itinerary/event-summarized-card/event-summarized-card.component';


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
  entryComponents: [PointSummarizedCardComponent, RouteSummarizedCardComponent,
    TripTemplateSummarizedCardComponent, EventSummarizedCardComponent]
})
export class CommonListModule { }
