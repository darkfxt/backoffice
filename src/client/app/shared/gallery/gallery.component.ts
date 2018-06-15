import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input()
  form: FormGroup;

  previewImages = [];

  constructor() { }

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

  deleteItem(source, index){
    const files = this.form.get('files').value;
    files.splice(index, 1);
    this.previewImages.splice(index, 1);
    this.form.patchValue({files: files});
  }

}
