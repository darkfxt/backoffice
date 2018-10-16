import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input()
  message: string;

  @Input()
  code: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = this.route.snapshot.paramMap.get('message');
    this.code = this.route.snapshot.paramMap.get('code');
  }

}
