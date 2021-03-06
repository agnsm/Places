import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../_models/userInfo';
import { slideInDownOnEnterAnimation, slideInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    slideInUpOnEnterAnimation(),
    slideInDownOnEnterAnimation()
  ]
})
export class HomeComponent implements OnInit {
  userInfo: UserInfo = {
    latitude: -1,
    longitude: -1,
    radius: -1
  };
  form!: FormGroup;
  min: number = 100;
  max: number = 50000;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      radius: ['', [Validators.required, Validators.min(this.min), Validators.max(this.max)]],
    });
 }

  search() {
    if (this.form.controls.radius.invalid) {
      this.form.controls.radius.markAsTouched();
    } else {
      this.userInfo.radius = this.form.controls.radius.value;
      this.getLocation();
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          this.userInfo.longitude = position.coords.longitude;
          this.userInfo.latitude = position.coords.latitude;
          this.navigate();
      });
    }
  }

  navigate() {
    this.router.navigateByUrl('/places', {state: {userInfo: this.userInfo} });
  }

}
