import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TRANSLATE } from '../../../translate-marker';

const STATUS_CONVERTER = {
  0: TRANSLATE('DRAFT'),
  1: TRANSLATE('PUBLISHED'),
  2: TRANSLATE('CANCELED')
};

@Component({
  selector: 'app-booking-summarized-card',
  templateUrl: './booking-summarized-card.component.html',
  styleUrls: ['./booking-summarized-card.component.scss']
})
export class BookingSummarizedCardComponent implements OnInit {

  @Input() data: any;
  @Input() selectionMode = false;
  status: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.status = STATUS_CONVERTER[this.data.status || 0];
    console.log('pingas', this.data);
    // this.description = this.data.role.name;
  }

  editBooking() {
    this.router.navigate([`/booking/${this.data._id}`]);
  }

}
