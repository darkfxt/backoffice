import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appMainListContainer]'
})
export class CommonListDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
