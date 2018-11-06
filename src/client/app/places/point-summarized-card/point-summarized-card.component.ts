import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListItemInterface } from '../../shared/common-list/common-list-item/list-item.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/shared/app.interfaces';
import { EventSelected, TerminalSelected, UpdateEvent } from '../../store/trip-template/event/event.actions';

@Component({
  selector: 'app-point-summarized-card',
  templateUrl: './point-summarized-card.component.html',
  styleUrls: ['./point-summarized-card.component.scss']
})
export class PointSummarizedCardComponent implements ListItemInterface, OnInit {
  @Input() data: any;
  @Input() selectionMode = 'false';
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  created_by: string;

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {
    this.imageUrl = ( this.data.images && this.data.images.length > 0 )
      ? this.data.images[0].url
      : '/assets/images/imageNotFound.png';
    this.title = this.data.name;
    this.subtitle = this.data.type;
    this.description = this.data.description || '';
    this.created_by = this.data.created_by;
  }

  editPoint() {
    if (this.selectionMode === 'select') {
      this.store.dispatch(new EventSelected({_id: this.data._id, type: 'POINT'}));
      return;
    }
    if (this.selectionMode === 'update') {
        this.store.dispatch(new TerminalSelected({terminal: this.data}));
      return;
    }
    this.router.navigate([`/places/${this.data._id}`]);
  }
}
