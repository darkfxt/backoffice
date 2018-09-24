import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TRANSLATE } from '../../translate-marker';
import { SavePoint } from '../../store/place/place.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { SaveUser } from '../../store/user/user.actions';
import { User } from '../../shared/models/User';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  form: FormGroup;
  bussy: boolean;
  user = new User();
  roles = [
    TRANSLATE('OWNER'),
    TRANSLATE('ADMIN'),
    TRANSLATE('USER_NAVIGATION')
  ];
  organizations = [
    {name: 'culo', id: '1'}
  ];
  resolverSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.resolverSubscription = this.route.data.subscribe(( resp: any ) => {
      if (resp)
        this.user = resp.user;
    });

    this.form = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.maxLength(50)]],
      last_name: [this.user.last_name, [Validators.required, Validators.maxLength(50)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      organization: [this.user.organization, Validators.required],
      role: [this.user.role, Validators.required]
    });
  }

  ngOnDestroy() {
    this.resolverSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.bussy = true;
      this.store.dispatch(new SaveUser({id: this.user.id, body: this.form.value}));
      this.snackBar.open('Usuario guardado', undefined, {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
    } else
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
  }

}
