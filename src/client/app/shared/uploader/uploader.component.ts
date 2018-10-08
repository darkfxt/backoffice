import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  @Input()
  group: FormGroup;

  @Input()
  mode: any;

  @Output()
  filesLoaded: EventEmitter<File[]> = new EventEmitter<File[]>();

  @Input()
  multiple: boolean;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    if (typeof this.mode === 'object') {
      Object.keys(this.mode).forEach((key) => {
        if (this.mode[key]) {
          this.mode = key;
          return false;
        }
      });
    }
  }

  onFileSelected(event) {
    this.filesLoaded.emit(event.target.files);
  }

  onDrag(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === 'dragenter' || event.type === 'dragover') {
      this.renderer.addClass(event.target, 'over');
    } else if (event.type === 'dragleave') {
      this.renderer.removeClass(event.target, 'over');
    } else if (event.type === 'drop') {
      this.renderer.removeClass(event.target, 'over');
      this.filesLoaded.emit(event.dataTransfer.files);
    }
  }

}
