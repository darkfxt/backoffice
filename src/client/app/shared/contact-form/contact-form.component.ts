import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmationModalComponent } from '../modal/confirmation-modal/confirmation-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TRANSLATE } from '../../translate-marker';
import { getSegmentsErrors } from '../../store/route';
import { ApiError } from '../models/ApiError';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import { SaveSegment } from '../../store/route/route.actions';
import { CommentsService } from '../services/comments.service';

interface ICommentNotification {
  title: string;
  comment: string;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  form: FormGroup;
  title: string = '';
  comment: string = '';
  notification: ICommentNotification = {comment: '', title: ''} ;

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      title: '',
      comment: ''
    });
  }

  ngOnInit() {


  }

  onSubmit() {
    if (this.form.valid) {
      this.commentsService.insert(this.form.value);
    }
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      markAsTtouched(control);
    });

    function markAsTtouched(control) {
      if (control.controls && control.controls.length)
        return control.controls.forEach(subControl => markAsTtouched(subControl));
      control.markAsTouched({onlySelf: true});
    }
  }

}
