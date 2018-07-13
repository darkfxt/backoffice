import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-route-cover',
  templateUrl: './route-cover.component.html',
  styleUrls: ['./route-cover.component.scss']
})
export class RouteCoverComponent implements OnInit {

  @Input()
  form: FormGroup;

  previewImage;

  constructor() { }

  ngOnInit() {
  }

  // Images control
  async onFilesLoaded(file) {
    console.log(file);
    const image = await this.preview(file[0]);
    this.previewImage = image;
    this.form.patchValue({file: file[0]});
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

  deleteUploadedItem(){
    const deletedImage = this.form.get('image').value !== null? [this.form.get('image').value] : [];
    this.form.patchValue({file: undefined, image: undefined, deleted_images: deletedImage});
    this.previewImage = undefined;
  }
}
