import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  getThumbnailUrl(imageUrl: string): string {
    return imageUrl.replace('taylorgps.s3.amazonaws.com', 'static.taylorgps.com/fit-in/200x200');
  }

  getLargeUrl(imageUrl: string): string {
    return imageUrl.replace('taylorgps.s3.amazonaws.com', 'static.taylorgps.com/fit-in/800x600');
  }

  getMediumUrl(imageUrl: string): string {
    return imageUrl.replace('taylorgps.s3.amazonaws.com', 'static.taylorgps.com/fit-in/300x200');
  }

  getTinyPicUrl(imageUrl: string): string {
    return imageUrl.replace('taylorgps.s3.amazonaws.com', 'static.taylorgps.com/fit-in/170x130');
  }

  getCellphoneLandscape(imageUrl: string): string {
    return imageUrl.replace('taylorgps.s3.amazonaws.com', 'static.taylorgps.com/fit-in/600x400');
  }
}
