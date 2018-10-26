import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/shared/app.interfaces';
import { RemoveEvent, UpdateEvent } from '../../../../../store/trip-template/event/event.actions';

@Component({
  selector: 'app-summarized-driving',
  templateUrl: './summarized-driving.component.html',
  styleUrls: ['./summarized-driving.component.scss']
})
export class SummarizedDrivingComponent implements OnInit {

  @Input() data: any;
  @Input() day: any;
  @Input() showEmptySlot: boolean;
  @Input() editMode: boolean;

  @Output() openedDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

  }

  onRemoveEvent(index) {
    this.store.dispatch(new RemoveEvent(index));
  }

  onUpdateEvent(index) {
    const updatedEvent = this.data;
    updatedEvent.product.origin = {
      '_id': '5bc8f251b58f4a0010536668',
      'name': 'Cachi',
      'search_name': 'Cachi',
      'description': 'Ciudad de Cachi',
      'type': 'REFERENCE',
      'geo': {
        'label': '-25.120235,-66.162496',
        'point': {
          'lat': -25.1202353,
          'lng': -66.16249649999997
        },
        'address': {
          'country_code': 'AR',
          'country': 'Argentina',
          'locality': 'Cachi',
          'region': 'Salta',
          'postalCode': '',
          'route': '',
          'street_number': '',
          'formatted_address': 'Cachi, Salta, Argentina'
        }
      },
      'images': [],
      'place_id': 'ChIJd0e5BEIeHJQRRVAm2F8cxMw',
      'status': 1,
      'company_id': 1,
      'created_by': 'jerez.matias@gmail.com'
    };
    this.store.dispatch(new UpdateEvent(updatedEvent));
  }

}
