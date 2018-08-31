import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
