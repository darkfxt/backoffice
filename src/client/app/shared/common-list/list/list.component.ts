import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

import { CommonListDirective } from '../common-list.directive';
import {ListItemComponent} from '../common-list-item/common-list-item.component';
import {ListItemInterface} from '../common-list-item/list-item.interface';
import {PointSummarizedCardComponent} from '../../../places/point/point-summarized-card/point-summarized-card.component';
import {LoadingComponent} from '../../loading/loading.component';
import {loadConfigurationFromPath} from 'tslint/lib/configuration';
import {AppState, loadingSelector} from '../../../store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() objectList: Observable<any[]>;
  @Input() componentsList: ListItemComponent[];
  @Input() drawingComponent: ListItemComponent;
  @ViewChild(CommonListDirective) appMainListContainer: CommonListDirective;
  iterationList: any[];
  loading = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }


  ngOnInit() {
    this.objectList.subscribe( (data: any) => {
      this.loading = data.loading;
      if(!data.loading){
        this.iterationList = data.points;
        console.log('apap', this.drawingComponent.component.constructor.name);
        this.loadComponent(this.drawingComponent.component);
      }
    });

  }

  loadComponent(componentToRender) {
    const componentFactoryInstance = this.componentFactoryResolver.resolveComponentFactory(componentToRender);
    const viewContainerRef = this.appMainListContainer.viewContainerRef;
    viewContainerRef.clear();
    for(const item of this.iterationList){
      const componentRef = viewContainerRef.createComponent(componentFactoryInstance);
      (<ListItemInterface>componentRef.instance).data = item;
    }

  }

}
