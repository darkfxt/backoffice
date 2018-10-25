import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Event, TypeOfEvent } from '../../../../shared/models/TripTemplate';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../../store/shared/app.interfaces';
import { getTripTemplatesEntities } from '../../../../store/trip-template';
import {AddEvent} from '../../../../store/trip-template/event/event.actions';

@Component({
  selector: 'app-custom-event',
  templateUrl: './custom-event.component.html',
  styleUrls: ['./custom-event.component.scss']
})
export class CustomEventComponent implements OnInit {

  @Input() isDialog ? = false;
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
    this._subscription = this.store.select(getTripTemplatesEntities).subscribe((data: any) => {
      if (data.dayForEvent) this.dayOfEvent = data.dayForEvent;
    });
  }

  onButtonClick() {
    const newEvent: Event = this.convertToEvent(TypeOfEvent.OTHER, this.dayOfEvent);
    this.store.dispatch(new AddEvent(newEvent));
    this.closeDialog();
  }

  convertToEvent(event_type: string, order: number): Event {
    const data = this.form.value;
    const converted: Event = new Event(
      data.name,
      data.description,
      data.event_type,
      order || 1
    );

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
