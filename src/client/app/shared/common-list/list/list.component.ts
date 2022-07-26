import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonListDirective } from '../common-list.directive';
import { ListItemComponent } from '../common-list-item/common-list-item.component';
import { ListItemInterface } from '../common-list-item/list-item.interface';
import { PointSummarizedCardComponent } from '../../../places/point-summarized-card/point-summarized-card.component';
import { LoadingComponent } from '../../loading/loading.component';
import { loadConfigurationFromPath } from 'tslint/lib/configuration';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() objectList: any;
  @Input() drawingComponent: ListItemComponent;
  @Input() storeToWatch: string;
  @Input() selectionMode ? = 'false';
  @ViewChild(CommonListDirective) appMainListContainer: CommonListDirective;
  iterationList: any[];
  loading = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }


  ngOnInit() {
    this.iterationList = this.objectList;
    this.loadComponent(this.drawingComponent.component);
    // this.objectList.subscribe( (data: any) => {
    //   this.loading = data.loading;
    //   if (!data.loading) {
    //     this.iterationList = data[this.storeToWatch];
    //     this.loadComponent(this.drawingComponent.component);
    //   }
    // });

  }

  loadComponent(componentToRender) {
    const componentFactoryInstance = this.componentFactoryResolver.resolveComponentFactory(componentToRender);
    const viewContainerRef = this.appMainListContainer.viewContainerRef;
    viewContainerRef.clear();
    if (this.iterationList) {
      this.iterationList.forEach((item, index) => {
        const componentRef = viewContainerRef.createComponent(componentFactoryInstance);
        (<ListItemInterface>componentRef.instance).data = Object.assign({}, item, {index});
        if (this.selectionMode) { (<ListItemInterface>componentRef.instance).selectionMode = this.selectionMode; }
      });
    }
  }

}
