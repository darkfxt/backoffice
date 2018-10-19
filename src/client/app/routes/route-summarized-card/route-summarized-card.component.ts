import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/shared/app.interfaces';
import {EventSelected} from '../../store/trip-template/event/event.actions';

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
  subtitleData: any;
  description: string;
  created_by: string;
  route_type: string;

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {
    this.imageUrl = ( this.data.images && this.data.images.length > 0 )
      ? this.data.images[0].url
      : '/assets/images/imageNotFound.png';
    this.title = this.data.name;
    this.description = this.data.description;
    this.route_type = this.data.route_type;
    this.created_by = this.data.created_by;
    const distanceAndTime = this.calculateDistanceAndTime(this.data.legs);
    this.subtitleData = {
      routeType: this.data.route_type,
      distance: distanceAndTime.distance,
      duration: distanceAndTime.duration
    };
  }

  calculateDistanceAndTime(legs: any[]): any {
    let distance = 0;
    let duration = 0;
    legs.forEach((element) => {
      distance += element.distance.value;
      duration += element.duration.value;
    });

    return {
      distance: distance / 1000, duration: (duration / (60 * 60 )).toFixed(2)
    };
  }

  editSegment() {
    if (this.selectionMode) {
      this.store.dispatch(new EventSelected(this.data));
      return;
    }
    this.router.navigate([`/routes/${this.data._id}`]);
  }

}
