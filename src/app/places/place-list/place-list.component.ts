import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from 'src/app/_models/place';
import { UserInfo } from 'src/app/_models/userInfo';
import { OtpApiService } from 'src/app/_services/otp-api.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {
  userInfo: UserInfo;
  places: Place[] = [];

  constructor(private otpApi: OtpApiService, private router: Router) {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.userInfo;
    console.log(this.userInfo);
   }

  ngOnInit(): void {
    if (!this.userInfo) {
      this.router.navigateByUrl('/');
    } else {
      this.otpApi.findPlaces(this.userInfo).subscribe(response => {
        console.log(response);
        this.places = this.deleteBlank(response).sort((a, b) => b.rate - a.rate);
        console.log(this.places);
      });
    }
  }

  deleteBlank(places: Place[]): Place[] {
    let i = places.length;
    while (i--) {
      if (places[i].name == '') {
        places.splice(i, 1);
      }
    }
    return places;
  }

}
