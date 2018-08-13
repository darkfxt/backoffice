import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  isDialog: boolean;

  @Output()
  backButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  iconType: string;

  constructor() { }

  ngOnInit() {
    this.iconType = this.isDialog? 'close' : 'arrow_back';
  }

  goBack(e){
    e.preventDefault();
    this.backButtonClicked.emit();
  }

}
