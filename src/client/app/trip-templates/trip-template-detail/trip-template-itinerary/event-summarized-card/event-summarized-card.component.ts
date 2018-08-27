import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-event-summarized-card',
  templateUrl: './event-summarized-card.component.html',
  styleUrls: ['./event-summarized-card.component.scss']
})
export class EventSummarizedCardComponent implements OnInit {

  @Input() data: any;
  @Input() day: any;
  @Input() showEmptySlot: boolean;

  @Output() openedDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  openDialog(event){
    this.openedDialog.emit(event);
  }

}
