import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddEvent} from '../../../../store/trip-template/trip-template.actions';
import {Event, eventType} from '../../../../shared/models/TripTemplate';
import {Store} from '@ngrx/store';
import {AppState, tripTemplateSelector} from '../../../../store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-custom-event',
  templateUrl: './custom-event.component.html',
  styleUrls: ['./custom-event.component.scss']
})
export class CustomEventComponent implements OnInit {

  @Input() isDialog? = false;
  @Input() dialogRef: any;
  form: FormGroup;
  hours = new Array(24);
  minutes = new Array(60);
  _subscription: Subscription;
  dayOfEvent: number;
  constructor(private fb: FormBuilder,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: '',
      description: '',
      hours: '',
      minutes: ''
    });
    this._subscription = this.store.select(tripTemplateSelector).subscribe((data: any) => {
      if (data.dayForEvent) this.dayOfEvent = data.dayForEvent;
    });
  }

  onButtonClick() {
    const newEvent: Event = this.convertToEvent(eventType.OTHER, this.dayOfEvent);
    this.store.dispatch(new AddEvent(newEvent));
    this.closeDialog();
  }

  convertToEvent(event_type: string, order: number): Event {
    const converted: Event = new Event();
    const data = this.form.value;
    converted.name = data.name;
    converted.description = data.description;
    converted.geo = [];
    converted.event_type = event_type;
    converted.ordinal = order || 1;
    return converted;
  }

  closeDialog() {
    if (this.isDialog) {
      if (this.dialogRef)
        this.dialogRef.close('CLOSE');
      return;
    } else
      console.log('pepe');
  }

}
