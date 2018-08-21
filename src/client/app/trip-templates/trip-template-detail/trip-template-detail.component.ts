import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState, eventsFromTemplateSelector, tripTemplateLoadingSelector, tripTemplateSelector} from '../../store';
import {ActivatedRoute, Router} from '@angular/router';
import {TripTemplateService} from '../../shared/services/trip-template.service';
import {
  GetEventsForTripTemplate,
  SaveTripTemplate,
  TripTemplateEditionLeft,
  TripTemplateSelected
} from '../../store/trip-template/trip-template.actions';
import {TripTemplate, Event} from '../../shared/models/TripTemplate';

@Component({
  selector: 'app-trip-template-detail',
  templateUrl: './trip-template-detail.component.html',
  styleUrls: ['./trip-template-detail.component.scss']
})
export class TripTemplateDetailComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  tripTemplate: TripTemplate;
  events: Event[];

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
    // this.tripTemplate$ = store.select(tripTemplateSelector);
  }

  ngOnInit() {

    this.route.data.subscribe(( data: any ) => {
      if (data) {
        this.store.dispatch(new TripTemplateSelected(data.tripTemplate));
        this.store.dispatch(new GetEventsForTripTemplate(data.tripTemplate._id));
      } else {
        this.store.dispatch(new TripTemplateSelected(new TripTemplate()));
        this.store.dispatch(new GetEventsForTripTemplate(undefined));
      }
    });

    this.store.select(tripTemplateSelector).subscribe( (data: any) => {
      if (data.selectedTripTemplate){
        this.tripTemplate = data.selectedTripTemplate;
      }
      if(data.selectedTripTemplateEvents){
        this.events = data.selectedTripTemplateEvents;
      }
    });

    this.form = this.fb.group({
      itinerary: this.fb.array([])
    });
  }

  goBack(): void{
    this.router.navigate(['/trip-templates']);
  }

  ngOnDestroy() {
    this.store.dispatch(new TripTemplateEditionLeft(null));
  }

  saveTripTemplate(){
      const tripTemplateToSave: TripTemplate = Object.assign({}, this.tripTemplate, {events: this.events});
      this.store.dispatch(new SaveTripTemplate(tripTemplateToSave));

  }

}
