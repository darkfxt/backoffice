import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Route from '../../../../../server/api/entity/Route';

@Component({
  selector: 'app-trip-template-detail-header',
  templateUrl: './trip-template-detail-header.component.html',
  styleUrls: ['./trip-template-detail-header.component.scss']
})
export class TripTemplateDetailHeaderComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
