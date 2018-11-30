import { NgModule } from '@angular/core';

import { HoursMinutesPipe } from './hours-minutes.pipe';

const PIPES = [
  HoursMinutesPipe
];

@NgModule({
  imports: [],
  declarations: [...PIPES],
  providers: [],
  exports: [...PIPES]
})
export class PipesModule {
}
