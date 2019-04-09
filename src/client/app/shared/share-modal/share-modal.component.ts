import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TRANSLATE } from '../../translate-marker';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit, OnDestroy {

  @ViewChild('link') link: ElementRef;
  copySuccessMessage$: Subscription;
  copySuccessMessage = TRANSLATE('Link copiado');

  constructor(
    private dialogRef: MatDialogRef<ShareModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.copySuccessMessage$)
      this.copySuccessMessage$.unsubscribe();
  }

  copyLink() {
    this.link.nativeElement.focus();
    this.link.nativeElement.select();
    document.execCommand('copy');
    this.copySuccessMessage$ = this.translate.get('copySuccessMessage').subscribe(res => {
      this.snackbar.open(res, undefined, {duration: 3000});
    });

  }

}
