import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { TripTemplateService } from '../../shared/services/trip-template.service';
import {
  SaveTripTemplate,
  TripTemplateEditionLeft,
  TripTemplateSelected,
  GetTripTemplates, CreateTripTemplate, ImportTripTemplate
} from '../../store/trip-template/trip-template.actions';
import { TripTemplate, Event, DayOfTrip } from '../../shared/models/TripTemplate';
import { AppState } from '../../store/shared/app.interfaces';
import {
  getAllDays,
  getAllTripTemplates,
  getCurrentTripTemplate, getDaysForSelectedTrip,
  getTripTemplateSelectedId,
  getTripTemplatesEntities, getTripTemplatesIds
} from '../../store/trip-template';
import { PaginationOptions } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { selectLoaderEntity } from '../../store/shared/reducers';
import { first } from 'rxjs/internal/operators';

@Component({
  selector: 'app-trip-template-detail',
  templateUrl: './trip-template-detail.component.html',
  styleUrls: ['./trip-template-detail.component.scss']
})
export class TripTemplateDetailComponent implements OnInit, OnDestroy {

  @Input() fromBooking = false;
  @Input() set templateToImport(templateToImport: string) {
    if(templateToImport !== null) {
      console.log('me estás metiendo el' + templateToImport);
      this._templateToImport = templateToImport;
      this.importTemplate(templateToImport);
    }
  }
  _templateToImport: string;
  form: FormGroup;
  loading = false;
  loadItinerary = false;
  tripTemplate = new TripTemplate();
  tripTemplate$: Observable<any>;
  tripSubscription: Subscription;
  events: Event[];
  days$: Observable<DayOfTrip[]>;

  _selectedRouteTemplateId: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private routesService: TripTemplateService,
    private route: ActivatedRoute,
    ) {
    this.form = this.fb.group({
      itinerary: this.fb.array([
        this.fb.control('')
      ]),
      name: ['', Validators.required],
      description: this.fb.control('')
    });

    this.tripTemplate$ = this.store.pipe(select(getAllTripTemplates));
    this.store.dispatch(new GetTripTemplates(new PaginationOptions()));
  }

  ngOnInit() {
    this.store.select(selectLoaderEntity).subscribe(loader => () => this.loading = loader.show );
    this.route.data.subscribe(( data: any ) => {
      if (data.tripTemplate && data.tripTemplate._id) {
        this.tripTemplate = data.tripTemplate;
        this.form = this.fb.group({
          name: [data.tripTemplate.name, Validators.required],
          description: this.fb.control(data.tripTemplate.description)
        });
        this.tripSubscription =  this.tripTemplate$.subscribe((templates: any) => {
          if (templates.length && templates.length > 0) {
            this.store.dispatch(new TripTemplateSelected(data.tripTemplate._id));
            this.days$ = this.store.pipe(select(getDaysForSelectedTrip));
            this.loadItinerary = true;
          }
        });
      } else {
        this.tripTemplate = new TripTemplate();
        this.tripTemplate._id = 'new';
        this.tripTemplate.days = [new DayOfTrip([])];
        const templateIDs: Observable<string[]> = this.store.pipe(select(getTripTemplatesIds));
        this.tripSubscription = templateIDs
          .subscribe((templates: any) => {
          if (!this.loading && templates.indexOf('new') === -1) {
            this.store.dispatch(new CreateTripTemplate({tripTemplate: this.tripTemplate}));
            this.store.dispatch(new TripTemplateSelected('new'));
            this.days$ = this.store.pipe(select(getDaysForSelectedTrip));
            this.loadItinerary = true;
          }
        });
      }

    });

    this.route.params.subscribe(value => this._selectedRouteTemplateId = value.id );

    if (this.tripTemplate._id !== 'new') {
      this.store.select(getCurrentTripTemplate).subscribe((data: any) => {
        if (data) {
          if (data._id &&
            data._id !== 'new' && this._selectedRouteTemplateId === 'new') {
            this.router.navigate([`/trip-templates/${data._id}`]);
          }
          /*if (data.selectedTripTemplateEvents) {
            this.events = data.selectedTripTemplateEvents;
            this.form = this.fb.group({
              itinerary: this.fb.array(data.selectedTripTemplateEvents),
              name: [this.form.value.name, Validators.required],
              description: this.fb.control(this.form.value.description)
            });
          }*/
        }
      });
    }


  }

  goBack(): void {
    this.router.navigate(['/trip-templates']);
  }

  ngOnDestroy() {
    this.store.dispatch(new TripTemplateEditionLeft(null));
    if (this.tripSubscription)
      this.tripSubscription.unsubscribe();
  }

  saveTripTemplate() {
    if (this.form.valid) {
      const tripTemplateToSave: TripTemplate = new TripTemplate();
      tripTemplateToSave.name = this.form.value.name;
      tripTemplateToSave.description = this.form.value.description;
      this.attachItineraryToTrip(tripTemplateToSave);
      if (this._selectedRouteTemplateId !== 'new')
        tripTemplateToSave._id = this._selectedRouteTemplateId;
      this.store.dispatch(new SaveTripTemplate(tripTemplateToSave));
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }
  }

  attachItineraryToTrip(tripTemplate: TripTemplate) {
    return this.days$.subscribe(days => tripTemplate.days = days);
  }

  importTemplate(templateId) {
    console.log('mirá hasta donde llegaste con este ' + templateId);
    this.store.dispatch(new ImportTripTemplate({tripTemplateId: templateId}));
  }


}
