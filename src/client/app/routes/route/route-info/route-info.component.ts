import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-route-info',
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.scss']
})
export class RouteInfoComponent implements OnInit {

  @Input()
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get thingsToKnow(): FormArray {
    return this.form.get('things_to_know') as FormArray;
  }

  addTTK() {
    this.thingsToKnow.push(this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  deleteTTK(event, index) {
    this.thingsToKnow.removeAt(index);
  }

}
