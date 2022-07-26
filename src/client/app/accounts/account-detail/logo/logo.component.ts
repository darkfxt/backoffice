import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { StaticsService } from '../../../shared/services/statics.service';

@Component({
  selector: 'app-account-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input()
  form: FormGroup;
  errorMessage;

  previewImage;

  constructor(private fb: FormBuilder,
              public staticsService: StaticsService) { }

  ngOnInit() {
    this.previewImage = this.form.get('logo').value;
  }

  // Images control
  async onFilesLoaded(file) {
    this.errorMessage = false;
    const image = await this.preview(file[0]);
    this.previewImage = image;
    this.form.patchValue({file: file[0]});
    this.form.patchValue({logo: 'added'});
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
    const deletedImage = [this.form.get('logo').value];
    this.form.patchValue({file: undefined});
    this.form.patchValue({logo: ''});
    this.form.setControl('deleted_images', this.fb.array(deletedImage));
    this.previewImage = undefined;
  }

  onExtensionError(event) {
    this.errorMessage = true;
  }
}
