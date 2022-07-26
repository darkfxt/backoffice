import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { User } from '../../shared/models/User';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { CompanyService } from '../../shared/services/company.service';
import { RolesService } from '../../shared/services/roles.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { share } from 'rxjs/operators';
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal/confirmation-modal.component';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/shared/app.interfaces';
import { TRANSLATE } from '../../translate-marker';
import {TranslateService} from '@ngx-translate/core';

export class ComparePasswordValidator implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

const roles = [
  TRANSLATE('TAYLOR_ADMIN'),
  TRANSLATE('USER_ADMIN'),
  TRANSLATE('USER_CONTENT'),
  TRANSLATE('USER_EXECUTIVE')
];

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  form: FormGroup;
  bussy: boolean;
  user = new User();
  roles: Observable<any>;
  organizations: Observable<any>;
  resolverSubscription: Subscription;
  updatePassword = true;
  _deleteSubscription: Subscription;
  selectedRole: any;
  role: FormControl;

  matcher = new ComparePasswordValidator();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private companyService: CompanyService,
    private rolesService: RolesService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private ts: TranslateService
  ) {}

  ngOnInit() {
    this.organizations = this.companyService.getAll();
    this.roles = this.rolesService.getAll();

    this.resolverSubscription = this.route.data.subscribe(( resp: any ) => {
      if (resp)
        this.user = resp.user;

      if (this.user.id)
        this.user.password = '.......';

    });
    const selectedRole: any = this.user.role;
    if (selectedRole !== '')
      Reflect.deleteProperty(selectedRole, 'resources');
    this.selectedRole = selectedRole;
    this.role = new FormControl(selectedRole);
    this.form = this.fb.group({
      username: [this.user.username],
      password: [this.user.password, [Validators.required]],
      confirmPassword: [this.user.password],
      email: [this.user.email, [Validators.required, Validators.email]],
      company_id: [this.user.company_id, Validators.required],
      role: [this.user.role, Validators.required]
    }, { validator: this.checkPasswords });

  }

  ngOnDestroy() {
    this.resolverSubscription.unsubscribe();
    if (this._deleteSubscription)
      this._deleteSubscription.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.bussy = true;
      let responseMessage: string;

      this.userService.upsert({id: this.user.id, body: this.prepareToSave()}).subscribe(resp => {
        responseMessage = this.ts.instant(TRANSLATE('Usuario guardado con exito'));
        this.router.navigate(['/users']);
      }, err => {
        responseMessage = this.ts.instant(TRANSLATE('Ha ocurrido un error intentelo nuevamente'));
      }, () => {
        this.bussy = false;
      });
    } else
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
  }

  prepareToSave() {
    const body = this.form.value;
    body.username = body.email;
    if (this.user.id && this.user.password === this.form.get('password').value) {
      Reflect.deleteProperty(body, 'password');
      Reflect.deleteProperty(body, 'confirmPassword');
    }

    return body;
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    if (!group.controls.password)
      return null;
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  deleteUser() {

    const dialogConfig = {
      maxHeight: '70%',
      maxWidth: '70%',
      id: 'confirmDialog',
      panelClass: 'eventDialogPanel',
      data: {
        message: `${this.ts.instant(TRANSLATE('Deseas eliminar'))} ${this.user.email}?`
      },
      disableClose: true,
      closeOnNavigation: true,
      hasBackdrop: true
    };
    const confirmationReference = this.dialog.open(ConfirmationModalComponent, dialogConfig);

    confirmationReference.afterClosed().subscribe(result => {
      if (result)
        this._deleteSubscription = this.userService.deleteById(this.user.id).subscribe(resp => {
          this.store.dispatch(new SnackbarOpen(
            {message: `${this.user.email} ${this.ts.instant(TRANSLATE('ha sido eliminado'))}`}
          ));
          this.router.navigate(['/users']);
        });
    });
  }

  compareFunction(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

}
