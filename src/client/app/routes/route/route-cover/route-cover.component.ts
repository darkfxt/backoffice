import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {StaticsService} from '../../../shared/services/statics.service';

@Component({
  selector: 'app-route-cover',
  templateUrl: './route-cover.component.html',
  styleUrls: ['./route-cover.component.scss']
})
export class RouteCoverComponent implements OnInit {

  @Input()
  form: FormGroup;

  previewImage;

  constructor(private fb: FormBuilder,
              private staticsService: StaticsService) { }

  ngOnInit() {
    this.previewImage = this.form.get('images').value[0];
  }

  // Images control
  async onFilesLoaded(file) {
    const image = await this.preview(file[0]);
    this.previewImage = image;
    this.form.patchValue({file: file[0]});
  }

  private preview(file) {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          resolve({file: file, url: e.target.result});
        };
        reader.readAsDataURL(file);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteUploadedItem() {
    const deletedImage = (<FormArray>this.form.get('images')).controls.length > 0 ? this.form.get('images').value : [];
    this.form.patchValue({file: undefined});
    this.form.setControl('images', this.fb.array([]));
    this.form.setControl('deleted_images', this.fb.array(deletedImage));
    this.previewImage = undefined;
  }

}
