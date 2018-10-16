import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { User } from '../../shared/models/User';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { CompanyService } from '../../shared/services/company.service';
import { RolesService } from '../../shared/services/roles.service';
import { ErrorStateMatcher } from '@angular/material/core';
import {share} from 'rxjs/operators';

export class ComparePasswordValidator implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

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

  matcher = new ComparePasswordValidator();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private companyService: CompanyService,
    private rolesService: RolesService
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
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.bussy = true;
      let responseMessage: string;

      this.userService.upsert({id: this.user.id, body: this.prepareToSave()}).subscribe(resp => {
        responseMessage = 'Usuario guardado con exito';
      }, err => {
        responseMessage = 'A ocurrido un error intentelo nuevamente';
      }, () => {
        this.bussy = false;
        // this.snackBar.open(responseMessage, undefined, {
        //   duration: 3000,
        //   verticalPosition: 'bottom',
        //   horizontalPosition: 'left'
        // });
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

}
