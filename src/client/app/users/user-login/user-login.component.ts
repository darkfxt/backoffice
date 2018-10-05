import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { Observable } from 'rxjs';
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
export class UserLoginComponent implements OnInit {
  form: FormGroup;
  bussy: boolean;
  name: string;
  user$: Observable<User[]>;
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
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(userSelector);
    this.form = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    // this.store.dispatch(new LogginginAdvertiser(new AccountEntity(this.advertiser.email, btoa('hm-adv ' + this.advertiser.password))));
    // this.advertiser$.subscribe(account => {
    //   if (!account['access_token']) {
    //     this.errorLogin = 'email o password incorrect, please try again';
    //     this.advertiser = new AccountEntity(this.advertiser.email,'');
    //   }
    // });
    if (this.form.invalid) {
      return;
    }
    this.email = this.f.email.value;
    this.password = this.f.password.value;
    console.log('un samurai', this.email);
    console.log('no muere así', this.password);
    this.store.dispatch(new SignInUser(this.email, this.password));

    this.user$
      .subscribe(
        data => {
          console.log('laaa chooootaaa', data);
          // this.router.navigate([this.returnUrl]);
          },
        err => {
          this.bussy = false;
          console.log(err);
        }
      );

  }

}
