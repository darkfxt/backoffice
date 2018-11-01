import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TRANSLATE } from '../../translate-marker';
import {MatDialog, MatSnackBar} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from '../../shared/models/Account';
import { AccountsService } from '../../shared/services/accounts.service';
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal/confirmation-modal.component';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/shared/app.interfaces';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {

  form: FormGroup;
  bussy: boolean;
  account = new Account();
  resolverSubscription: Subscription;
  primary_color_toogle: boolean;
  secondary_color_toogle: boolean;
  _deleteSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private accountsService: AccountsService,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.resolverSubscription = this.route.data.subscribe(( resp: any ) => {
      if (resp)
        this.account = resp.account;
    });

    this.form = this.fb.group({
      name: [this.account.name, [Validators.required, Validators.maxLength(50)]],
      primary_color: [this.account.primary_color, Validators.required],
      secondary_color: [this.account.secondary_color, Validators.required],
      logo: [this.account.logo, Validators.required],
      file: undefined,
      deleted_images: this.fb.array([])
    });

  }

  ngOnDestroy() {
    this.resolverSubscription.unsubscribe();
    if (this._deleteSubscription)
      this._deleteSubscription.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/accounts']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.bussy = true;
      let responseMessage: string;
      // this.store.dispatch(new SaveUser({id: this.user.id, body: this.form.value}));
      const body = this.prepareToSave();
      this.accountsService.upsert({id: this.account.id, body: body}).subscribe(resp => {
        responseMessage = 'Cuenta guardada con exito';
        this.router.navigate(['/accounts']);
      }, err => {
        responseMessage = 'A ocurrido un error intentelo nuevamente';
      }, () => {
        this.bussy = false;
        this.snackBar.open(responseMessage, undefined, {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    } else
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
  }

  private prepareToSave(): FormData {
    const formData = new FormData();
    const data = Object.assign({}, this.form.value);
    formData.append('data', JSON.stringify(data));
    const image = data.file;
    if (image)
      formData.append('files[]', image, image.name);
    return formData;
  }

  deleteAccount() {

    const dialogConfig = {
      maxHeight: '70%',
      maxWidth: '70%',
      id: 'confirmDialog',
      panelClass: 'eventDialogPanel',
      data: {
        message: `Deseas eliminar ${this.account.name}?`
      },
      disableClose: true,
      closeOnNavigation: true,
      hasBackdrop: true
    };
    const confirmationReference = this.dialog.open(ConfirmationModalComponent, dialogConfig);

    confirmationReference.afterClosed().subscribe(result => {
      if (result)
        this._deleteSubscription = this.accountsService.deleteById(this.account.id).subscribe(resp => {
          this.store.dispatch(new SnackbarOpen(
            {message: `${this.account.name} ha sido eliminado`}
          ));
          this.router.navigate(['/accounts']);
        });
    });
  }

}
