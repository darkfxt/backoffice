import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSummarizedEventContainer]'
})
export class EventSummarizedCardDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
