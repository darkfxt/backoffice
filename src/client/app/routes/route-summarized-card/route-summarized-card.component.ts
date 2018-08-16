import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {EventSelected} from '../../store/trip-template/trip-template.actions';

@Component({
  selector: 'app-route-summarized-card',
  templateUrl: './route-summarized-card.component.html',
  styleUrls: ['./route-summarized-card.component.scss']
})
export class RouteSummarizedCardComponent implements OnInit {

  @Input() data: any;
  @Input() selectionMode = false;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit(){
    this.imageUrl = ( this.data.images && this.data.images.length > 0 )
      ? this.data.images[0].url
      : 'https://www.theraband.com/media/catalog/product/cache/18/image/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/ImageNotFound_3.png';
    this.title = this.data.name;
    this.subtitle = this.data.route_type;
    this.description = this.data.description;
  }

  editSegment(){
    if(this.selectionMode) {
      this.store.dispatch(new EventSelected(this.data));
      return;
    }
    this.router.navigate([`/routes/${this.data._id}`]);
  }

}
