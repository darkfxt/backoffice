import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip-template-summarized-card',
  templateUrl: './trip-template-summarized-card.component.html',
  styleUrls: ['./trip-template-summarized-card.component.scss']
})
export class TripTemplateSummarizedCardComponent implements OnInit {
  @Input() data: any;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.imageUrl = ( this.data.images && this.data.images.length > 0 )
      ? this.data.images[0].url
      : 'https://www.theraband.com/media/catalog/product/cache/18/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/ImageNotFound_3.png';
    this.title = this.data.name;
    this.subtitle = this.data.route_type;
    this.description = this.data.description;
  }

  editSegment(){
    this.router.navigate([`/trip-templates/${this.data._id}`]);
  }

}
