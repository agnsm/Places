import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Place } from 'src/app/_models/place';
import { UserInfo } from 'src/app/_models/userInfo';
import { OtpApiService } from 'src/app/_services/otp-api.service';
import { faFilter, faSortAmountDown, faStreetView, faThumbtack, faUndo } from '@fortawesome/free-solid-svg-icons';
import { zoomInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss'],
  animations: [
    zoomInOnEnterAnimation({ duration: 500 })
  ]
})
export class PlaceListComponent implements OnInit {
  faSort = faSortAmountDown;
  faFilter = faFilter;
  faRadius = faStreetView;
  faLocation = faThumbtack;
  faUndo = faUndo;
  sortForm!: FormGroup;
  filterForm!: FormGroup;
  sortCollapsed = true;
  filterCollapsed = true;
  sortModes = ['rateDesc', 'rateAsc', 'distAsc', 'distDesc'];
  sortModesPL = ['Popularność malejąco', 'Popularność rosnąco', 'Odległość rosnąco', 'Odległość malejąco'];
  categories = ['architecture', 'cultural', 'historic', 'industrial_facilities', 'natural', 'religion', 'sport', 'amusements', 'other'];
  categoriesPL = ['architektura', 'kultura', 'historyczne', 'obiekty przemysłowe', 'natura', 'religia', 'sport', 'rozrywka', 'inne'];
  userInfo: UserInfo;
  link = '';
  places: Place[] = [];
  noPlaces = false;
  filterMode = false;

  constructor(private otpApi: OtpApiService, private router: Router, private fb: FormBuilder) {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.userInfo;
    if (!this.userInfo) {
      this.router.navigateByUrl('/');
    }
   }

  ngOnInit(): void {
    this.initializeForms();
    this.getPlaces();
    this.link = 'https://www.google.com/maps/place/' + this.userInfo.latitude + ',' + this.userInfo.longitude;
  }

  initializeForms() {
    this.sortForm = this.fb.group({
      sortMode: this.sortModes[0],
    });
    this.filterForm = this.fb.group({
      architecture: false,
      cultural: false,
      historic: false,
      industrial_facilities: false,
      natural: false,
      religion: false,
      sport: false,
      amusements: false,
      other: false,
    });
  };

  getPlaces() {
    this.otpApi.findPlaces(this.userInfo).subscribe(response => {
      this.places = this.deleteBlank(response);
      if (!this.places.length) {
        this.noPlaces = true;
      } else {
        this.noPlaces = false;
      }
      this.sortPlaces();
    });
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

  sortPlaces() {
    switch (this.sortForm.value['sortMode']) {
      case this.sortModes[0]:
        this.places = this.places.sort((a, b) => b.rate - a.rate);
        break;

      case this.sortModes[1]:
        this.places = this.places.sort((a, b) => a.rate - b.rate);
        break;

      case this.sortModes[2]:
        this.places = this.places.sort((a, b) => a.dist - b.dist);
        break;

      case this.sortModes[3]:
        this.places = this.places.sort((a, b) => b.dist - a.dist);
        break;

      default:
        break;
    }
  }

  filterPlaces() {
    this.filterMode = true;
    let kindsArr: string[] = [];
    Object.keys(this.filterForm.controls).forEach(kind => {
      if (this.filterForm.value[kind]) {
        kindsArr.push(kind);
      }
    });
    let kinds = kindsArr.join(',');
    this.userInfo.kinds = kinds;
    this.getPlaces();
  }

}
