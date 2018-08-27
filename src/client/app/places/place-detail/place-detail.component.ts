import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-place-detail',
  template: `
    <app-point>
      <app-detail-header title="New place" class="detail-header-content" (backButtonClicked)="goBack()"></app-detail-header>
    </app-point>`,
})
export class PlaceDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/places']);
  }

}
