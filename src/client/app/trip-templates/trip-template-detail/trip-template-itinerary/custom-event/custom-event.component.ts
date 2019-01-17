import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Event, TypeOfEvent } from '../../../../shared/models/TripTemplate';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import { AppState } from '../../../../store/shared/app.interfaces';
import {getSelectedDayId, getTripTemplatesEntities} from '../../../../store/trip-template';
import {AddEvent} from '../../../../store/trip-template/event/event.actions';

@Component({
  selector: 'app-custom-event',
  templateUrl: './custom-event.component.html',
  styleUrls: ['./custom-event.component.scss']
})
export class CustomEventComponent implements OnInit {

  @Input() isDialog ? = false;
  @Input() dialogRef: any;
  @Input() day?: any;
  form: FormGroup;
  hours = new Array(24);
  minutes = new Array(60);
  _subscription: Subscription;
  dayOfEvent: number;
  selectedDay$: Observable<string>;
  constructor(private fb: FormBuilder,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.selectedDay$ = this.store.pipe(select(getSelectedDayId));
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
    const newEvent: Event = this.convertToEvent(TypeOfEvent.CUSTOM, this.dayOfEvent);
    this.store.dispatch(new AddEvent({event: newEvent, day: this.selectedDay$.toString()}));
    this.closeDialog();
  }

  convertToEvent(event_type: string, order: number): Event {
    const data = this.form.value;
    return new Event(data.name, data.description, TypeOfEvent.CUSTOM, order || 1, this.day, data);
  }

  closeDialog() {
    if (this.isDialog) {
      if (this.dialogRef)
        this.dialogRef.close('CLOSE');
      return;
    }
  }

}
