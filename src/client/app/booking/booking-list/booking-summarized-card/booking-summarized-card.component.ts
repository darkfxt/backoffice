import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const STATUS_CONVERTER = {
  0: 'DRAFT',
  1: 'PUBLISHED',
  2: 'CANCELED'
}

@Component({
  selector: 'app-booking-summarized-card',
  templateUrl: './booking-summarized-card.component.html',
  styleUrls: ['./booking-summarized-card.component.scss']
})
export class BookingSummarizedCardComponent implements OnInit {

  @Input() data: any;
  @Input() selectionMode = false;
  imageUrl: string;
  title: string;
  subtitleData: any;
  description: string;
  status: string;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('dentro del summarized', this.data);
    this.imageUrl = ( this.data.logo && this.data.logo.url )
      ? this.data.logo.url
      : '/assets/images/imageNotFound.png';
    this.title = this.data.name;
    this.status = STATUS_CONVERTER[this.data.status || 0];
    // this.description = this.data.role.name;
  }

  editBooking() {
    this.router.navigate([`/booking/${this.data._id}`]);
  }

}
