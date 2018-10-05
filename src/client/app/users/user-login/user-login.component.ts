import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SignInUser } from '../../store/user/user.actions';
import { AppState, userSelector } from '../../store';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/internal/operators';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  bussy: boolean;
  name: string;
  user$: Subscription;
  user = new User('', '');
  errorLogin: string;
  password: string;
  email: string;
  returnUrl: string;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.user$ = this.store.select(userSelector).subscribe(
      data => {
        // this.router.navigate([this.returnUrl]);
      },
      err => {
        this.bussy = false;
        this.errorLogin = err.toString();
        console.log(err);
      });
    this.form = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      this.email = this.f.email.value;
      this.password = this.f.password.value;
      this.store.dispatch(new SignInUser(this.email, this.password));
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }

  }

}
