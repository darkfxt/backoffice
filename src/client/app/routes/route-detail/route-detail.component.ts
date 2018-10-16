import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-detail',
  template: `
    <app-route>
      <app-detail-header title="New route" class="detail-header-content" (backButtonClicked)="goBack()"></app-detail-header>
    </app-route>
  `
})
export class RouteDetailComponent implements OnInit {

  constructor(private router: Router, ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/routes']);
  }
}
