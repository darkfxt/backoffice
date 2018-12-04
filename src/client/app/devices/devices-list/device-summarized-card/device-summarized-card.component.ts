import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-summarized-card',
  templateUrl: './device-summarized-card.component.html',
  styleUrls: ['./device-summarized-card.component.scss']
})
export class DeviceSummarizedCardComponent implements OnInit {

  @Input() data: any;
  @Input() selectionMode = false;
  imageUrl: string;
  title: string;
  description: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.title = this.data.name;
    // this.description = this.data.role.name;
  }

  editAsset() {
    this.router.navigate([`/devices/${this.data.id}`]);
  }

}
