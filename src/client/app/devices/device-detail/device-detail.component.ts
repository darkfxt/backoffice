import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../../shared/models/Account';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Device} from '../../shared/models/Device';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/shared/app.interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountsService} from '../../shared/services/accounts.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DeviceService} from '../../shared/services/device.service';
import {DeleteDevice, SaveDevice} from '../../store/device/device.actions';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit, OnDestroy {

  form: FormGroup;
  bussy: boolean;
  device = new Device();
  resolverSubscription: Subscription;
  _deleteSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.resolverSubscription = this.route.data.subscribe(( resp: any ) => {
      if (resp)
        this.device = resp.device;
    });

    this.form = this.fb.group({
      name: [this.device.name, [Validators.required]],
      serial_number: [this.device.serial_number, Validators.required],
    });
  }

  ngOnDestroy() {
    this.resolverSubscription.unsubscribe();
    if (this._deleteSubscription)
      this._deleteSubscription.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/devices']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.bussy = true;
      const body = Object.assign(this.device, this.form.value);
      this.store.dispatch(new SaveDevice({body}));
    } else
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
  }

  deleteDevice() {
    this.store.dispatch(new DeleteDevice({id: this.device.id}));
  }

}
