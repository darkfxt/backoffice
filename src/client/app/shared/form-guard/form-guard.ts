import {CanComponentDeactivate} from '../services/can-deactivate-guard.service';
import {Observable} from 'rxjs';
import {GuardModalComponent} from '../modal/guard-modal.component';
import {HostListener} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModalService} from '../modal/modal.service';

export abstract class FormGuard implements CanComponentDeactivate{

  constructor(private dialog: MatDialog, private modalService: ModalService){

  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {

    this.dialog.open(GuardModalComponent, {
      width: '250px'
    });

    return this.modalService.navigateAwaySelection$;

  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
      return true;
    } else {
      return false;
    }
  }

}
