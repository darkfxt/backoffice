import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  links = {
    'booking': '#heading=h.ti4dckiufzai',
    'trip_templates': '#heading=h.ajf0e7jlxls3',
    'routes': '#heading=h.skz2kerotdit',
    'places': '#heading=h.v63d1ho41w3q'
  };
  hash = '';
  constructor(
    private dialogRef: MatDialogRef<TutorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.hash = this.data.section === '/' ? this.links['booking'] : this.links[this.data.section] || '';
  }

}
