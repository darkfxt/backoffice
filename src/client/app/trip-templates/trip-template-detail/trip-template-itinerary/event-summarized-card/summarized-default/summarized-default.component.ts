import { Component, Input, OnInit } from '@angular/core';
import { iconMap } from '../../../../../shared/models/TripTemplate';

@Component({
  selector: 'app-summarized-default',
  templateUrl: './summarized-default.component.html',
  styleUrls: ['./summarized-default.component.scss']
})
export class SummarizedDefaultComponent implements OnInit {
  @Input() data: any;
  @Input() day: any;
  @Input() showEmptySlot: boolean;
  @Input() editMode: boolean;
  iconMap = iconMap;
  constructor() { }

  ngOnInit() {
  }

}
