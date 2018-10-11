import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoggedUserInterface } from '../models/User';
import { Store } from '@ngrx/store';
import {SignOutUser, UserSignedIn} from '../../store/user/user.actions';
import { Location } from '@angular/common';
import { AppState } from '../../store/shared/app.interfaces';
import { getUserEntities } from '../../store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('header')
  header: any;
  isLogged = false;
  loggedUser: any = {username: 'Usuario'};
  currentRoute;
  open = false;
  path: string;
  constructor(private router: Router, private store: Store<AppState>, private location: Location) {
    if (localStorage.getItem('currentUser'))
      this.store.dispatch(new UserSignedIn(JSON.parse(localStorage.getItem('currentUser'))));
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.store.select(getUserEntities).subscribe((data: any) => {
      if (data && data.loggedUser) {
        this.loggedUser = data.loggedUser;
        this.isLogged = true;
      } else {
        this.loggedUser = {username: 'Usuario'};
        this.isLogged = false;
      }
    });
  }

  navigate(page) {
    this.currentRoute = page;
    this.open = false;
  }

  onSignOut() {
    this.store.dispatch(new SignOutUser());
  }

  goToAccounts() {
    this.router.navigate(['/accounts']);
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

  goToLogin() {
    this.router.navigate(['/users/login']);
  }

}
