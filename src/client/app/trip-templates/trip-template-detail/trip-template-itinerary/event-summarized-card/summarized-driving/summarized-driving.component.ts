import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RemoveEvent } from '../../../../../store/trip-template/trip-template.actions';
import { AppState } from '../../../../../store';
import { Store } from '@ngrx/store';

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
  }

  onRemoveEvent(index) {
    this.store.dispatch(new RemoveEvent(index));
  }

}
