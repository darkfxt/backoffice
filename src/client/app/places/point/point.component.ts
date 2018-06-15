import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlaceService} from '../place.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {

  placeForm: FormGroup;
  place = {
    name: ''
  };

  constructor(private fb: FormBuilder, private placeService: PlaceService) {
  }

  ngOnInit() {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      geo: this.fb.group({
        label: ['', Validators.required],
        location: '',
        address: ['', Validators.required]
      }),
      place_id: '',
      files: null
    });
  }

  // Form control
  onSubmit() {
    console.log(this.placeForm.value);
    if (this.placeForm.valid) {
      const formData = this.prepareToSave(this.placeForm.value);
      this.placeService.addPlace(formData).subscribe((resp) => {
        console.log(resp);
      });
    }else{
      Object.keys(this.placeForm.controls).forEach(field => {
        const control = this.placeForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  private prepareToSave(place): FormData {
    const formData = new FormData();
    formData.append('name', place.name);
    formData.append('type', place.type);
    formData.append('description', place.description);
    formData.append('geo', JSON.stringify(place.geo));
    const files = place.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i], files[i].name);
      }
    }
    return formData;
  }

}
