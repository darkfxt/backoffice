import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { TripTemplateService } from '../../shared/services/trip-template.service';
import {
  SaveTripTemplate,
  TripTemplateEditionLeft,
  TripTemplateSelected,
  GetTripTemplates, CreateTripTemplate, ImportTripTemplate, FillItinerary
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
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal/confirmation-modal.component';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import { MatDialog } from '@angular/material';
import {TRANSLATE} from '../../translate-marker';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-trip-template-detail',
  templateUrl: './trip-template-detail.component.html',
  styleUrls: ['./trip-template-detail.component.scss']
})
export class TripTemplateDetailComponent implements OnInit, OnDestroy {

  @Input() fromBooking: boolean;
  @Input() bookingStartDate?: string;
  @Input() set templateToImport(templateToImport: string) {
    if (templateToImport !== null) {
      this._templateToImport = templateToImport;
      this.importTemplate(templateToImport);
    }
  }
  @Input() fillDays?: Array<DayOfTrip>;
  _templateToImport: string;
  _bookingToFill: string;
  @Input() form: FormGroup;
  loading = false;
  loadItinerary = false;
  tripTemplate = new TripTemplate();
  tripTemplate$: Observable<any>;
  tripSubscription: Subscription;
  events: Event[];
  days$: Observable<DayOfTrip[]>;
  daysSubscription: Subscription;
  _deleteSubscription: Subscription;
  _selectedRouteTemplateId: string;
  stepper = {
    header: false,
    itinerary: true
  };

  @Output() templateUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private tripTemplateService: TripTemplateService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private ts: TranslateService
    ) {
    if (this.fromBooking) {
      this.form = this.fb.group({
        itinerary: this.fb.array([
          this.fb.control('')
        ]),
      });
    } else {
      this.form = this.fb.group({
        itinerary: this.fb.array([
          this.fb.control('')
        ]),
        name: ['', Validators.required],
        description: this.fb.control('')
      });
    }


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
        this.tripTemplate.days = this.fillDays ? this.fillDays : [new DayOfTrip([])];
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
    if (this.fillDays) {
      setTimeout(() => this.fillItineraryWithDays(this.fillDays), 0);
    }

  }

  goBack(): void {
    this.router.navigate(['/trip-templates']);
  }

  ngOnDestroy() {
    this.store.dispatch(new TripTemplateEditionLeft(null));
    if (this.tripSubscription)
      this.tripSubscription.unsubscribe();

    if (this._deleteSubscription)
      this._deleteSubscription.unsubscribe();

    if (this.daysSubscription)
      this.daysSubscription.unsubscribe();

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
    this.daysSubscription = this.days$.subscribe(days => {
      if (days)
        tripTemplate.days = days;
    });
  }

  deleteTripTemplate() {

    const dialogConfig = {
      maxHeight: '70%',
      maxWidth: '70%',
      id: 'confirmDialog',
      panelClass: 'eventDialogPanel',
      data: {
        message: `${this.ts.instant(TRANSLATE('Deseas eliminar'))} ${this.tripTemplate.name}?`
      },
      disableClose: true,
      closeOnNavigation: true,
      hasBackdrop: true
    };
    const confirmationReference = this.dialog.open(ConfirmationModalComponent, dialogConfig);

    confirmationReference.afterClosed().subscribe(result => {
      if (result)
        this._deleteSubscription = this.tripTemplateService.deleteById(this.tripTemplate._id).subscribe(resp => {
          this.store.dispatch(new SnackbarOpen(
            {message: `${this.tripTemplate.name} ${this.ts.instant(TRANSLATE('ha sido eliminado'))}`}
          ));
          this.router.navigate(['/trip-templates']);
        });
    });
  }

  importTemplate(templateId) {
    this.store.dispatch(new ImportTripTemplate({tripTemplateId: templateId}));
  }

  fillItineraryWithDays(daysToImport: Array<DayOfTrip>) {
    this.store.dispatch(new FillItinerary({days: daysToImport}))
  }

  onTemplateUpdated(event) {
    this.templateUpdated.emit(event);
  }

  setStep(step) {
    Object.keys(this.stepper).forEach(field => {
      this.stepper[field] = true;
    });
    this.stepper[step] = false;
    window.scroll(0, 0);
  }
}
