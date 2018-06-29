import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('header')
  header: any;

  currentRoute = 'trips';
  constructor(router: Router) {
  }

  ngOnInit() {
  }

}
