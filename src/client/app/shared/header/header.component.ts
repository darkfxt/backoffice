import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignOutUser, UserSignedIn } from '../../store/user/user.actions';
import { Location } from '@angular/common';
import { AppState } from '../../store/shared/app.interfaces';
import { getUserEntities, getUserLogged } from '../../store/user';
import { LoggedUserInterface } from '../models/User';
import { TutorialComponent } from '../modal/tutorial/tutorial.component';
import { MatDialog } from '@angular/material';

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
  constructor(private router: Router,
              private store: Store<AppState>,
              private dialog: MatDialog) {
    if (localStorage.getItem('currentUser'))
      this.store.dispatch(new UserSignedIn(JSON.parse(localStorage.getItem('currentUser'))));
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.store.select(getUserLogged).subscribe((loggedUser: LoggedUserInterface) => {
      if (loggedUser && loggedUser.username) {
        this.loggedUser = loggedUser;
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

  goToDevices() {
    this.router.navigate(['/devices']);
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

  goToLogin() {
    this.router.navigate(['/users/login']);
  }

  openTutorial() {
    const dialogRef = this.dialog.open(TutorialComponent, {
      width: '800px',
      maxWidth: '100%',
      height: '800px',
      maxHeight: '100%',
      data: {
        section: this.currentRoute
      },
      id: 'tutorial',
      panelClass: 'tutorial-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
