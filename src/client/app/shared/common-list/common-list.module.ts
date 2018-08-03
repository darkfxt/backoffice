import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonListComponent } from './common-list.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ListComponent } from './list/list.component';
import { FiltersComponent } from './filters/filters.component';
import { CommonListDirective } from './common-list.directive';
import { PointSummarizedCardComponent } from '../../places/point/point-summarized-card/point-summarized-card.component';
import {LoadingModule} from '../loading/loading.module';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  imports: [
    CommonModule,
    LoadingModule,
    MatPaginatorModule
  ],
  declarations: [CommonListComponent, PaginatorComponent,
    ListComponent, FiltersComponent,
    CommonListDirective],
  exports: [
    CommonListComponent
  ],
  entryComponents: [PointSummarizedCardComponent]
})
export class CommonListModule { }
