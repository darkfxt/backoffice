import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListItemInterface } from '../../../shared/common-list/common-list-item/list-item.interface';

@Component({
  selector: 'app-point-summarized-card',
  templateUrl: './point-summarized-card.component.html',
  styleUrls: ['./point-summarized-card.component.scss']
})
export class PointSummarizedCardComponent implements ListItemInterface, OnInit {
  @Input() data: any;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;

  constructor(private router: Router) {

  }

  ngOnInit(){
    console.log('fuck', this.data);
    this.imageUrl = ( this.data.images && this.data.images.length > 0 )
      ? this.data.images[0].url
      : 'http://leeford.in/wp-content/uploads/2017/09/image-not-found.jpg';
    this.title = this.data.name;
    this.subtitle = this.data.geo.address.formatted_address;
    this.description = this.data.description;
  }

  editPoint(){
    this.router.navigate([`/places/${this.data._id}`]);
  }
}
