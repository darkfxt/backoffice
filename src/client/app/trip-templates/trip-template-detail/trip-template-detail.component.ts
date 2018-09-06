import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, eventsFromTemplateSelector, tripTemplateLoadingSelector, tripTemplateSelector } from '../../store';
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
    private route: ActivatedRoute
    ) {
    store.select(tripTemplateLoadingSelector).subscribe((isLoading) => {
      this.loading = isLoading;
    });
    this.form = this.fb.group({
      itinerary: this.fb.array([
        this.fb.control('')
      ]),
      name: this.fb.control(''),
      description: this.fb.control('')
    });
    // this.tripTemplate$ = store.select(tripTemplateSelector);
  }

  ngOnInit() {

    this.route.data.subscribe(( data: any ) => {
      if (data) {
        this.tripTemplate = data.selectedTripTemplate;
        this.form = this.fb.group({
          name: this.fb.control(data.tripTemplate.name),
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

    this.store.select(tripTemplateSelector).subscribe( (data: any) => {
      // if (data.selectedTripTemplate) {
      //   this.tripTemplate = data.selectedTripTemplate;
      //   this.form = this.fb.group({
      //     name: this.fb.control(data.selectedTripTemplate.name),
      //     description: this.fb.control(data.selectedTripTemplate.description)
      //   });
      // }
      if (data.selectedTripTemplate && data.selectedTripTemplate._id &&
        data.selectedTripTemplate._id !== 'new' && this._selectedRouteTemplateId === 'new') {
        this.router.navigate([`/trip-templates/${data.selectedTripTemplate._id}`]);
      }
      if (data.selectedTripTemplateEvents) {
        this.events = data.selectedTripTemplateEvents;
        this.form = this.fb.group({
          itinerary: this.fb.array(data.selectedTripTemplateEvents),
          name: this.fb.control(this.form.value.name),
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
    }
  }

  prepareToSave() {
    const formData = new FormData();
    const data = Object.assign({}, this.form.value);

    this.form = this.fb.group({name: this.tripTemplate.name, description: this.tripTemplate.description});
  }

  setName(name) {
    // console.log('este es el fucking nombre', name);
    // this.tripTemplate.name = name;
    // this.store.dispatch(new SetNameForTemplate(name));
  }

  setDescription(description) {
    // // console.log('esta es la fucking descripcion', description);
    // // this.tripTemplate.description = description;
    // this.store.dispatch(new SetDescriptionForTemplate(description));
  }

}
