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

  constructor(private router: Router) { }

  ngOnInit() {
    this.imageUrl = ( this.data.images && this.data.images.length > 0 )
      ? this.data.images[0].url
      : '/assets/images/imageNotFound.png';
    this.title = this.data.name;
    this.description = this.data.description || '';
    this.created_by = this.data.created_by;
  }

  editSegment() {
    this.router.navigate([`/trip-templates/${this.data._id}`]);
  }

}
