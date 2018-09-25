import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TRANSLATE } from '../../translate-marker';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from '../../shared/models/Account';
import { AccountsService } from '../../shared/services/accounts.service';

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

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private accountsService: AccountsService,
    private router: Router,
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
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.bussy = true;
      let responseMessage: string;
      // this.store.dispatch(new SaveUser({id: this.user.id, body: this.form.value}));
      const body = this.prepareToSave();
      this.accountsService.upsert({id: this.account.id, body: body}).subscribe(resp => {
        responseMessage = 'Cuenta guardada con exito';
      }, err => {
        responseMessage = 'A ocurrido un error intentelo nuevamente';
      }, () => {
        this.bussy = false;
        this.snackBar.open(responseMessage, undefined, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
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

}
