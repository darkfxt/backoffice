import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PlaceService} from '../../place.service';
import {Observable} from 'rxjs';
import {PlaceStore} from '../../place-store.services';


@Component({
  selector: 'app-point-head',
  templateUrl: './point-head.component.html',
  styleUrls: ['./point-head.component.scss']
})
export class PointHeadComponent implements OnInit {

  @Input('headGroup')
  placeForm: FormGroup;

  @Output()
  optionSelected: EventEmitter<string> = new EventEmitter<string>();

  private autocompleteTimeout;
  private lastSearch;
  options: Observable<any[]>;

  constructor(private placeService: PlaceService, private placeStore: PlaceStore) { }

  ngOnInit() {
  }

  onOptionSelected(e) {
    this.placeForm.patchValue({name: e.option.value.name.split(',')[0]});
    this.placeService.getDetail(e.option.value.place_id).subscribe(resp => {
      this.placeStore.setLocation({
        label: resp.name,
        formatted_address: resp.formatted_address,
        point: resp.location,
        place_id: resp.place_id
      });
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
