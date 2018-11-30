import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StaticsService} from '../../../shared/services/statics.service';

@Component({
  selector: 'app-account-summarized-card',
  templateUrl: './account-summarized-card.component.html',
  styleUrls: ['./account-summarized-card.component.scss']
})
export class AccountSummarizedCardComponent implements OnInit {

  @Input() data: any;
  @Input() selectionMode = false;
  imageUrl: string;
  title: string;
  subtitleData: any;
  description: string;

  constructor(private router: Router,
              private staticsService: StaticsService) { }

  ngOnInit() {
    this.imageUrl = ( this.data.logo && this.data.logo.url )
      ? this.staticsService.getThumbnailUrl(this.data.logo.url)
      : '/assets/images/imageNotFound.png';
    this.title = this.data.name;
    // this.description = this.data.role.name;
  }

  editAccount() {
    this.router.navigate([`/accounts/${this.data.id}`]);
  }

}
