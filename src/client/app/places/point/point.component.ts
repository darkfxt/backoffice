import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlaceService} from '../../shared/services/place.service';

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
        point: '',
        address: this.fb.group({
          country_code: '',
          country: '',
          locality: '',
          region: '',
          postalCode: '',
          route: '',
          street_number: '',
          formatted_address: ''
        })
      }),
      place_id: '',
      files: null,
      status: '1'
    });
  }

  // Form control
  onSubmit() {
    console.log(this.placeForm.value);

    if(this.placeForm.valid) {
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
    formData.append('data', JSON.stringify(place));
    const images = place.files;
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append('files[]', images[i], images[i].name);
      }
    }
    return formData;
  }

}
