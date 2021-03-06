import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { GeoFeature } from '../models/geo-feature.model';

@Injectable()
export class GeoFeatureService {
  constructor(private httpClient: HttpClient) {}

  getGeoFeatures(orgUnit, level): Observable<GeoFeature[]> {
    const url = `../../../api/geoFeatures.json?ou=ou:${orgUnit};${level}&displayProperty=NAME`;
    return this.httpClient
      .get(url)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
