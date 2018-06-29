import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-bkg">
      <mat-progress-spinner
        class="spinner"
        color="primary"
        mode="indeterminate"
        diameter="50">
      </mat-progress-spinner>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})

export class LoadingComponent {}
