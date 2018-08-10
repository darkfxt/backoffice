import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-trip-template-detail',
  templateUrl: './trip-template-detail.component.html',
  styleUrls: ['./trip-template-detail.component.scss']
})
export class TripTemplateDetailComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({});
  }

}
