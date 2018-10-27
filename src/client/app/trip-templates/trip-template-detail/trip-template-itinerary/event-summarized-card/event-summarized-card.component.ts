import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/shared/app.interfaces';
import { RemoveEvent } from '../../../../store/trip-template/event/event.actions';
import { ListItemInterface } from '../../../../shared/common-list/common-list-item/list-item.interface';
import { EventSummarizedCardDirective } from './event-summarized-card.directive';
import { ListItemComponent } from '../../../../shared/common-list/common-list-item/common-list-item.component';
import {SummarizedDrivingComponent} from './summarized-driving/summarized-driving.component';
import {SummarizedDefaultComponent} from './summarized-default/summarized-default.component';

@Component({
  selector: 'app-event-summarized-card',
  templateUrl: './event-summarized-card.component.html',
  styleUrls: ['./event-summarized-card.component.scss']
})
export class EventSummarizedCardComponent implements OnInit {

  @Input() data: any;
  @Input() day: any;
  @Input() showEmptySlot: boolean;
  @Input() editMode: boolean;
  drawingComponent: ListItemComponent;

  @Output() openedDialog: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(EventSummarizedCardDirective) appEventListContainer: EventSummarizedCardDirective;

  iterationList: Array<any>;

  constructor(private store: Store<AppState>,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.eventType === 'DRIVING')
      this.drawingComponent = new ListItemComponent(SummarizedDrivingComponent);
    else
      this.drawingComponent = new ListItemComponent(SummarizedDefaultComponent);
    this.loadComponent(this.drawingComponent.component);
  }

  openDialog(event) {
    this.openedDialog.emit(event);
  }

  onRemoveEvent(index) {
    this.store.dispatch(new RemoveEvent(index));
  }

  loadComponent(componentToRender) {
    const componentFactoryInstance = this.componentFactoryResolver.resolveComponentFactory(componentToRender);
    const viewContainerRef = this.appEventListContainer.viewContainerRef;
    viewContainerRef.clear();
    // if (this.iterationList) {
    //   this.iterationList.forEach((item, index) => {
        const componentRef = viewContainerRef.createComponent(componentFactoryInstance);
        (<ListItemInterface>componentRef.instance).data = this.data;
    //   });
    // }
  }

}
