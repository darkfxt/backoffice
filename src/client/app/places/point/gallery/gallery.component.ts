import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input()
  form: FormGroup;

  @Input()
  preloadedImages: any[];

  previewImages = [];
  deletedItems = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  // Images control
  async onFilesLoaded(files) {
    const fileList: File[] = this.form.value.files || [];

    for (const file of files) {
      fileList.push(file);
      const image = await this.preview(file);
      this.previewImages.push(image);
    }
    this.form.patchValue({files: fileList});
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

  deleteUploadedItem(index){
    const files = this.form.get('files').value;
    files.splice(index, 1);
    this.previewImages.splice(index, 1);
    this.form.patchValue({files: files});
  }

  deleteStoredItem(index){
    const item = this.preloadedImages[index];
    const deletedImages = this.form.get('deleted_images').value;
    this.preloadedImages.splice(index, 1);
    deletedImages.push(item);
    const dImages = deletedImages.map(image => this.fb.group(image));
    const faDImages = this.fb.array(dImages);
    const images = this.preloadedImages.map(image => this.fb.group(image));
    const faImages = this.fb.array(images);
    this.form.setControl('deleted_images', faDImages);
    this.form.setControl('images', faImages);
  }

}
