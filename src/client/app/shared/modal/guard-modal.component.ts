import {Component} from '@angular/core';
import {ModalService} from './modal.service';

@Component({
  selector: 'app-guard-modal',
  template: `
    <h2 mat-dialog-title>Delete all</h2>
    <mat-dialog-content>Are you sure?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close [mat-dialog-close]="true" (click)="choose(false)">No</button>
      <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
      <button mat-button [mat-dialog-close]="true" (click)="choose(true)">Yes</button>
    </mat-dialog-actions>
  `,
})
export class GuardModalComponent {

  constructor(private modalService: ModalService) { }

  choose(choice: boolean): void {
    this.modalService.navigateAwaySelection$.next(choice);
  }

}
