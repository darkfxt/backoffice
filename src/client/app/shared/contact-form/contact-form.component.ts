import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmationModalComponent } from '../modal/confirmation-modal/confirmation-modal.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TRANSLATE } from '../../translate-marker';
import { getSegmentsErrors } from '../../store/route';
import { ApiError } from '../models/ApiError';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import { SaveSegment } from '../../store/route/route.actions';
import { CommentsService } from '../services/comments.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/shared/app.interfaces';
import { TranslateService } from '@ngx-translate/core';

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

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required)
  });
  notification: ICommentNotification = {comment: '', title: ''};

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    private store: Store<AppState>,
    private ts: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {


  }

  onSubmit() {
    if (this.form.valid) {
      this.commentsService.insert(this.form.value).subscribe((response) => {
        if (response) {
          this.ts.get(TRANSLATE('Mail enviado exitosamente')).subscribe((res) => {
            this.store.dispatch(new SnackbarOpen(
              {message: res}
            ));
          });
        } else {
          this.ts.get(TRANSLATE('Intenta nuevamente')).subscribe((res) => {
            this.store.dispatch(new SnackbarOpen(
              {message: res}
            ));
          });
        }
      });
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        this.markAsTtouched(control);
      });
    }

  }

  markAsTtouched(control) {
    if (control.controls && control.controls.length)
      return control.controls.forEach(subControl => this.markAsTtouched(subControl));
    control.markAsTouched({onlySelf: true});
  }
}
