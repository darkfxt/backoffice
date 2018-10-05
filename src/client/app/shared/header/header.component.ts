import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoggedUserInterface } from '../models/User';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import {SignOutUser} from '../../store/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('header')
  header: any;
  loggedUser: any;
  currentRoute = 'trips';
  open = false;
  constructor(private router: Router, private store: Store<AppState>) {
    this.loggedUser = JSON.stringify(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.currentRoute = this.router.url === '/' ? 'trip-templates' : this.router.url;
  }

  navigate(page) {
    this.currentRoute = page;
    this.open = false;
  }

  onSignOut() {
    this.store.dispatch(new SignOutUser());
  }

}
