import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Place } from 'src/app/_models/place';
import { UserInfo } from 'src/app/_models/userInfo';
import { OtpApiService } from 'src/app/_services/otp-api.service';
import { faFilter, faSortAmountDown, faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {
  faSort = faSortAmountDown;
  faFilter = faFilter;
  faUndo = faUndo;
  sortForm!: FormGroup;
  filterForm!: FormGroup;
  sortCollapsed = true;
  filterCollapsed = true;
  sortModes = ['rateDesc', 'rateAsc', 'distAsc', 'distDesc'];
  sortModesPL = ['Popularność malejąco', 'Popularność rosnąco', 'Odległość rosnąco', 'Odległość malejąco'];
  categories = ['architecture', 'cultural', 'historic', 'industrial_facilities', 'natural', 'religion', 'sport', 'amusement', 'other'];
  categoriesPL = ['architektura', 'kultura', 'historyczne', 'obiekty przemysłowe', 'natura', 'religia', 'sport', 'rozrywka', 'inne'];
  userInfo: UserInfo;
  places: Place[] = [];

  constructor(private otpApi: OtpApiService, private router: Router, private fb: FormBuilder) {
    this.userInfo = this.router.getCurrentNavigation()?.extras.state?.userInfo;
    console.log(this.userInfo);
   }

  ngOnInit(): void {
    this.initializeForms();
    this.getPlaces();
  }

  initializeForms() {
    this.sortForm = this.fb.group({
      sortMode: 'rateDesc',
    });
    this.filterForm = this.fb.group({
      architecture: false,
      cultural: false,
      historic: false,
      industrial_facilities: false,
      natural: false,
      religion: false,
      sport: false,
      amusement: false,
      other: false,
    });
  };

  getPlaces() {
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

  sort() {
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

}
