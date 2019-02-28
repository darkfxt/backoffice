import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../../../shared/services/accounts.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Device } from '../../../shared/models/Device';
import { AppState } from '../../../store/shared/app.interfaces';
import { select, Store } from '@ngrx/store';
import { getAllDevices } from '../../../store/device';

@Component({
  selector: 'app-booking-detail-header',
  templateUrl: './booking-detail-header.component.html',
  styleUrls: ['./booking-detail-header.component.scss']
})
export class BookingDetailHeaderComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  options: any[] = [];
  options$: Subscription;
  filteredOptions: Observable<any>;
  filteredDevices$: Observable<Device[]>;
  has_gps = false;
  devices$: Observable<Device[]>;
  devices: Device[];
  stateCtrl = new FormControl();

  constructor(private accountService: AccountsService,
              private store: Store<AppState>) {
    this.devices$ = this.store.pipe(select(getAllDevices));
  }

  ngOnInit() {
    this.options$ = this.accountService.getAll().subscribe(accounts => {
      this.options = accounts;
    });
    this.devices$.subscribe((devices: Device[]) => {
      if (devices.length > 0) {
        this.devices = devices;
        if (this.form.value) {
          const parForm = this.form.value;
          if (parForm.device_id) {
            this.has_gps = true;
          }
        }
      }
    });
    this.filteredDevices$ = this.form.get('device_id').valueChanges
      .pipe(
        startWith(''),
        map(device => device ? this._filterDevices(device) :
          this.devices ? this.devices.slice() : [])
      );
    this.filteredOptions = this.form.get('account_id').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngOnDestroy() {
    this.options$.unsubscribe();
  }

  private _filter(value: string): string[] {
    if (typeof value !== 'string')
      return this.options;

    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  get minDate(): Date {
    return this.form.get('start_date').value || new Date();
  }

  get minDate2(): Date {
    return this.form.get('start_date').value === '' ? new Date() : this.form.get('start_date').value;
  }

  getValue(value: any) {
    if (typeof value !== 'string')
      return value.id;
    return value;
  }

  onToggleGPS() {
    this.has_gps = !this.has_gps;
    if (this.has_gps) {
      this.form.patchValue({
        device_id: ['', Validators.required],
        pickup_point: '',
        dropoff_point: ''
      });
    } else
      this.form.patchValue({
        device_id: undefined,
        pickup_point: undefined,
        dropff_point: undefined
      });

  }

  displayFn(value) {
    if (value && value.name)
      return value.name;
    else
      return '';
  }

  private _filterDevices(value: string): Device[] {
    if (typeof value !== 'string')
      return this.devices;

    const filterValue = value.toLowerCase();
    return this.devices.filter(device => device.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onLeaveAutocomplete(event, control) {
    const regexpOption = /^mat-option-.*/g;
    if (typeof this.form.get(control).value === 'string' &&
      (event.relatedTarget === null || !regexpOption.test(event.relatedTarget.id)))
      this.form.get(control).setValue('');
  }

}
