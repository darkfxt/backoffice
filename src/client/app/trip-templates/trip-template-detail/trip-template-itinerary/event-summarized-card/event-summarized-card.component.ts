import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppState} from '../../../../store';
import {Store} from '@ngrx/store';
import {RemoveEvent} from '../../../../store/trip-template/trip-template.actions';

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

  @Output() openedDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  openDialog(event){
    this.openedDialog.emit(event);
  }

  onRemoveEvent(index) {
    console.log('se va a remover el índice:', index);
    this.store.dispatch(new RemoveEvent(index));
  }

}
