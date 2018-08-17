import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-event-summarized-card',
  templateUrl: './event-summarized-card.component.html',
  styleUrls: ['./event-summarized-card.component.scss']
})
export class EventSummarizedCardComponent implements OnInit {

  @Input() data: any;

  @Output() ordinalSelected: number;

  constructor() { }

  ngOnInit() {
  }

}
