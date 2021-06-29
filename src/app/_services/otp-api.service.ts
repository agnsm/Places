import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Place } from '../_models/place';
import { UserInfo } from '../_models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class OtpApiService {
  private baseUrl = environment.otpApiUrl;
  private apikey = environment.otpApiKey

  constructor(private http: HttpClient) { }

  findPlaces(userInfo: UserInfo) {
    return this.http.get<Place[]>(this.baseUrl + 'radius?' + `radius=${userInfo.radius}&lon=${userInfo.longitude}&lat=${userInfo.latitude}&format=json&apikey=${this.apikey}`).pipe(
      map((places: Place[]) => {
        places.map((place) => {
          place.dist = Number((place.dist / 1000).toFixed(2));
          place.kinds = place.kinds.replace(/,/g, ', ');
          place.kinds = place.kinds.replace(/_/g, ' ');
        });
        return places;
      })
    )
  }

}
