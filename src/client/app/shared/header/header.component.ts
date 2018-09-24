import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('header')
  header: any;

  currentRoute = 'trips';
  open = false;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.currentRoute = this.router.url === '/' ? 'trip-templates' : this.router.url;
  }

  navigate(page) {
    this.currentRoute = page;
    this.open = false;
  }

}
