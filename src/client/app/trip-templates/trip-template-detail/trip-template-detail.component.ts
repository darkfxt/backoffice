import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { TripTemplateService } from '../../shared/services/trip-template.service';
import {
  GetEventsForTripTemplate,
  SaveTripTemplate,
  TripTemplateEditionLeft,
  TripTemplateSelected, SetDescriptionForTemplate,
  SetNameForTemplate
} from '../../store/trip-template/trip-template.actions';
import { TripTemplate, Event } from '../../shared/models/TripTemplate';
import { SaveSegment } from '../../store/route/route.actions';
import { MatSnackBar } from '@angular/material';
import { AppState } from '../../store/shared/app.interfaces';
import {getTripTemplatesEntities} from '../../store/trip-template';

@Component({
  selector: 'app-trip-template-detail',
  templateUrl: './trip-template-detail.component.html',
  styleUrls: ['./trip-template-detail.component.scss']
})
export class TripTemplateDetailComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  tripTemplate = new TripTemplate();
  events: Event[];

  _selectedRouteTemplateId: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private routesService: TripTemplateService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    // store.select(tripTemplateLoadingSelector).subscribe((isLoading) => {
    //   this.loading = isLoading;
    // });
    this.form = this.fb.group({
      itinerary: this.fb.array([
        this.fb.control('')
      ]),
      name: ['', Validators.required],
      description: this.fb.control('')
    });
    // this.tripTemplate$ = store.select(tripTemplateSelector);
  }

  ngOnInit() {

    this.route.data.subscribe(( data: any ) => {
      if (data) {
        this.tripTemplate = data.selectedTripTemplate;
        this.form = this.fb.group({
          name: [data.tripTemplate.name, Validators.required],
          description: this.fb.control(data.tripTemplate.description)
        });
        this.store.dispatch(new TripTemplateSelected(data.tripTemplate));
        this.store.dispatch(new GetEventsForTripTemplate(data.tripTemplate._id));
      } else {
        this.tripTemplate = new TripTemplate();
        this.store.dispatch(new TripTemplateSelected(this.tripTemplate));
        this.store.dispatch(new GetEventsForTripTemplate(undefined));
      }
    });

    this.route.params.subscribe(value => this._selectedRouteTemplateId = value.id );

    this.store.select(getTripTemplatesEntities).subscribe( (data: any) => {
      if (data.selectedTripTemplate && data.selectedTripTemplate._id &&
        data.selectedTripTemplate._id !== 'new' && this._selectedRouteTemplateId === 'new') {
        this.router.navigate([`/trip-templates/${data.selectedTripTemplate._id}`]);
      }
      if (data.selectedTripTemplateEvents) {
        this.events = data.selectedTripTemplateEvents;
        this.form = this.fb.group({
          itinerary: this.fb.array(data.selectedTripTemplateEvents),
          name: [this.form.value.name, Validators.required],
          description: this.fb.control(this.form.value.description)
        });
      }
    });


  }

  goBack(): void {
    this.router.navigate(['/trip-templates']);
  }

  ngOnDestroy() {
    this.store.dispatch(new TripTemplateEditionLeft(null));
  }

  saveTripTemplate() {
    if (this.form.valid) {
      this.loading = true;
      const tripTemplateToSave: TripTemplate = new TripTemplate();
      tripTemplateToSave.name = this.form.value.name;
      tripTemplateToSave.description = this.form.value.description;
      tripTemplateToSave.events = this.form.value.itinerary;
      if (this._selectedRouteTemplateId !== 'new')
        tripTemplateToSave._id = this._selectedRouteTemplateId;
      this.store.dispatch(new SaveTripTemplate(tripTemplateToSave));

      this.snackBar.open('Trip saved', undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }
  }

  prepareToSave() {
    const formData = new FormData();
    const data = Object.assign({}, this.form.value);

    this.form = this.fb.group({name: this.tripTemplate.name, description: this.tripTemplate.description});
  }


}
