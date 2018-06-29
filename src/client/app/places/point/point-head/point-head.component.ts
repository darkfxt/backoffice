import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PlaceService} from '../../../shared/services/place.service';
import {Observable, Subscription} from 'rxjs';
import {PlaceStore} from '../../../shared/services/place-store.services';


@Component({
  selector: 'app-point-head',
  templateUrl: './point-head.component.html',
  styleUrls: ['./point-head.component.scss']
})
export class PointHeadComponent implements OnInit, OnDestroy {

  @Input('headGroup')
  placeForm: FormGroup;

  _subscription: Subscription;

  @Output()
  optionSelected: EventEmitter<string> = new EventEmitter<string>();

  private autocompleteTimeout;
  private lastSearch;
  options: Observable<any[]>;

  constructor(private placeService: PlaceService, private placeStore: PlaceStore) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this._subscription)
      this._subscription.unsubscribe();
  }

  onOptionSelected(e) {
    this.placeForm.patchValue({name: e.option.value.name.split(',')[0]});
    this._subscription = this.placeService.getDetail(e.option.value.place_id).subscribe(resp => {
      this.placeStore.setLocation(resp);
    });
  }

  displayFn(value) {
    return value.name;
  }

  search(event) {
    console.log('search');
    if (this.placeForm.value.name.length < 3 || this.placeForm.value.name === this.lastSearch){
      return false;
    }

    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.lastSearch = this.placeForm.value.name;
      this.options = this.placeService.autocomplete(this.placeForm.value.name);
    }, 300);

  }
}
