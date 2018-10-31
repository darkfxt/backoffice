import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { AccountsService } from '../../../shared/services/accounts.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-booking-detail-header',
  templateUrl: './booking-detail-header.component.html',
  styleUrls: ['./booking-detail-header.component.scss']
})
export class BookingDetailHeaderComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  options: any[] = [];
  options$: Subscription;
  filteredOptions: Observable<any[]>;
  has_gps: boolean;

  constructor(private accountService: AccountsService) { }

  ngOnInit() {
    this.options$ = this.accountService.getAll().subscribe(accounts => {
      this.options = accounts;
    });

    this.filteredOptions = this.form.get('client_id').valueChanges
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
    return new Date();
  }

  get minDate2(): Date {
    return this.form.get('start_date').value === '' ? new Date() : this.form.get('start_date').value;
  }

  onToggleGPS() {
    if (this.has_gps)
      this.form.patchValue({
        device_id: ['', Validators.required],
        pickup_point: ['', Validators.required],
        dropoff_point: ['', Validators.required]
      });
    else
      this.form.patchValue({
        device_id: '',
        pickup_point: '',
        dropff_point: ''
      });
    this.has_gps = !this.has_gps;
  }

  displayFn(value) {
    return value.name;
  }

}
