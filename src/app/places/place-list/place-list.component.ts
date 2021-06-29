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
   }

  ngOnInit(): void {
    if (!this.userInfo) {
      this.router.navigateByUrl('/');
    } else {
      console.log(this.userInfo);
      this.otpApi.findPlaces(this.userInfo).subscribe(response => {
        console.log(response);
        this.places = response;
        console.log(this.places);
      });
    }
  }

}
