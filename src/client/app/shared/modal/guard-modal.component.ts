import { Component } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-guard-modal',
  template: `
    <h2 mat-dialog-title>Deseas irte de este sitio?</h2>
    <mat-dialog-content>Si te vas perderas todos los cambios que no hayas guardado</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close [mat-dialog-close]="true" (click)="choose(false)">Permanecer</button>
      <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
      <button mat-button [mat-dialog-close]="true" (click)="choose(true)">Irme</button>
    </mat-dialog-actions>
  `,
})
export class GuardModalComponent {

  constructor(private modalService: ModalService) { }

  choose(choice: boolean): void {
    this.modalService.navigateAwaySelection$.next(choice);
  }

}
