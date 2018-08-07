import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGuard} from '../../shared/form-guard/form-guard';
import {MatDialog} from '@angular/material';
import {ModalService} from '../../shared/modal/modal.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})

export class ProgramComponent extends FormGuard implements OnInit, OnDestroy{

  constructor(dialog: MatDialog, modalService: ModalService, private fb: FormBuilder) {
    super(dialog, modalService);
  }

  ngOnInit() {
    this.form = this.fb.group({});
  }

  ngOnDestroy(){
  }

  onSubmit() {
    console.log('nada');
  }

}
