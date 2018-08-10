import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListItemInterface } from '../../shared/common-list/common-list-item/list-item.interface';

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
    this.imageUrl = ( this.data.images && this.data.images.length > 0 )
      ? this.data.images[0].url
      : 'https://www.theraband.com/media/catalog/product/cache/18/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/ImageNotFound_3.png';
    this.title = this.data.name;
    this.subtitle = this.data.geo.address.formatted_address;
    this.description = this.data.description;
  }

  editPoint(){
    this.router.navigate([`/places/${this.data._id}`]);
  }
}
