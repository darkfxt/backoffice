import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  disableBackButton: boolean;

  @Input()
  isDialog: string;

  @Input()


  @Output()
  backButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  saveButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  navUrl: string;

  iconType: string;

  constructor() { }

  ngOnInit() {
    this.iconType = this.isDialog === 'false' ? 'close' : 'arrow_back';
  }

  goBack(e) {
    e.preventDefault();
    this.backButtonClicked.emit();
  }

  onSave(e) {
    this.saveButtonClicked.emit();
  }

}
