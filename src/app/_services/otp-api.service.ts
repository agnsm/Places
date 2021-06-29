import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    return this.http.get<Place[]>(this.baseUrl + 'radius?' + `radius=${userInfo.radius}&lon=${userInfo.longitude}&lat=${userInfo.latitude}&format=json&apikey=${this.apikey}`);
  }

}
