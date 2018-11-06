import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/shared/app.interfaces';

@Component({
  selector: 'app-user-summarized-card',
  templateUrl: './user-summarized-card.component.html',
  styleUrls: ['./user-summarized-card.component.scss']
})
export class UserSummarizedCardComponent implements OnInit {

  @Input() data: any;
  @Input() selectionMode = false;
  imageUrl: string;
  title: string;
  subtitleData: any;
  description: string;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.imageUrl = ( this.data.images && this.data.images.length > 0 )
      ? this.data.images[0].url
      : '/assets/images/imageNotFound.png';
    this.title = this.data.username;
    this.description = this.data.role.name;
  }

  editUser() {
    this.router.navigate([`/users/${this.data.id}`]);
  }

}
