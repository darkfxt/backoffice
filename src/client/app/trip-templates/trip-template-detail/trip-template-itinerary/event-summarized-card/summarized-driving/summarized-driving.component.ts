import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/shared/app.interfaces';
import { RemoveEvent } from '../../../../../store/trip-template/event/event.actions';

@Component({
  selector: 'app-summarized-driving',
  templateUrl: './summarized-driving.component.html',
  styleUrls: ['./summarized-driving.component.scss']
})
export class SummarizedDrivingComponent implements OnInit {

  @Input() data: any;
  @Input() day: any;
  @Input() showEmptySlot: boolean;
  @Input() editMode: boolean;

  @Output() openedDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log('hola cargaste un autito');
    console.log(this.data);
  }

  onRemoveEvent(index) {
    this.store.dispatch(new RemoveEvent(index));
  }

}
