import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-template-summarized-card',
  templateUrl: './trip-template-summarized-card.component.html',
  styleUrls: ['./trip-template-summarized-card.component.scss']
})
export class TripTemplateSummarizedCardComponent implements OnInit {
  @Input() data: any;
  imageUrl: string;
  title: string;
  description: string;
  created_by: string;
  tripTotalLength = 0;
  tripTotalTime = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.title = this.data.name;
    this.description = this.data.description || '';
    this.created_by = this.data.created_by;
    this.tripTotalLength = this.data.tripTotalLength;
    this.tripTotalTime = this.data.tripTotalTime;
  }

  editSegment() {
    this.router.navigate([`/trip-templates/${this.data._id}`]);
  }

}
