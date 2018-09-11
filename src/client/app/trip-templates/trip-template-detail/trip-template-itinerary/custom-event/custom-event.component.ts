import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-custom-event',
  templateUrl: './custom-event.component.html',
  styleUrls: ['./custom-event.component.scss']
})
export class CustomEventComponent implements OnInit {

  form: FormGroup;
  hours = new Array(24);
  minutes = new Array(60);
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: '',
      description: '',
      hours: '',
      minutes: ''
    });
  }

}
