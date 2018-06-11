import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlaceService} from '../shared/services/place.service';
import {Coordinates} from '../shared/models/Coordinates';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {
  map: google.maps.Map;
  previewImages = [];
  placeForm: FormGroup;
  place = {
    name: ''
  };
  coords: Observable<any>;

  constructor(private fb: FormBuilder, private placeService: PlaceService) {
  }

  ngOnInit() {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      geo: this.fb.group({
        label: '',
        location: '',
        address: ''
      }),
      glPlaceId: '',
      files: null
    });
  }

  // Images control
  async onFilesLoaded(files) {
    let fileList: File[] = this.placeForm.value.files || [];
    fileList = fileList.concat(files);
    this.placeForm.get('files').patchValue(fileList);
    console.log(this.placeForm.value)
    for (const file of files) {
      const image = await this.preview(file);
      this.previewImages.push(image);
    }
  }

  private preview(file){
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          resolve({file: file, preview: e.target.result});
        };
        reader.readAsDataURL(file);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteItem(source, index){
    this.previewImages.splice(index, 1);
  }

  // Form control
  onSubmit() {
    console.log(this.placeForm.value);
    if (!this.placeForm.valid) {
      return false;
    }

    const formData = this.prepareToSave(this.placeForm.value);
    this.placeService.addPlace(formData).subscribe((resp) => {
      console.log(resp);
    });
  }

  private prepareToSave(place): FormData {
    const formData = new FormData();
    formData.append('name', place.name);
    formData.append('type', place.type);
    formData.append('description', place.description);
    const files = place.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i], files[i].name);
      }
    }
    return formData;
  }

}
