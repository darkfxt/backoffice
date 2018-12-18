import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationModalComponent } from '../modal/confirmation-modal/confirmation-modal.component';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import { MatDialog } from '@angular/material';

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

  @Output()
  extensionError: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  multiple: boolean;

  @Input()
  accept;

  errorMessage;

  constructor(private renderer: Renderer2, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.accept = this.accept || 'image/*';
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
    this.errorMessage = false;
    this.filesLoaded.emit(event.target.files);
  }

  onDrag(event) {
    event.preventDefault();
    event.stopPropagation();
    this.errorMessage = false;

    if (event.type === 'dragenter' || event.type === 'dragover') {
      this.renderer.addClass(event.target, 'over');
    } else if (event.type === 'dragleave') {
      this.renderer.removeClass(event.target, 'over');
    } else if (event.type === 'drop') {
      this.renderer.removeClass(event.target, 'over');
      if (this.filterFiles(event.dataTransfer.files))
        return this.extensionError.emit(true);
      this.filesLoaded.emit(event.dataTransfer.files);
    }
  }

  private filterFiles(files): boolean {
    for (let i = 0; i < files.length; i++)
      if (this.accept.indexOf(files[i].type) === -1)
        return true;
  }
}
