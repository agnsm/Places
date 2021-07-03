import { Component, Input, OnInit } from '@angular/core';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Place } from 'src/app/_models/place';
import { fadeInAnimation, headShakeAnimation } from 'angular-animations';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
  animations: [
    fadeInAnimation({ duration: 500 }),
    headShakeAnimation()
  ]
})
export class PlaceCardComponent implements OnInit {
  @Input() place!: Place;
  link = '';
  faMap = faMapMarkedAlt;
  cardVisible = false;
  iconVisible = false;

  constructor() { }

  ngOnInit(): void {
    this.link = 'https://www.google.com/maps/place/' + this.place.point.lat + ',' + this.place.point.lon;
  }

  onInViewportChange(inViewport: boolean) {
    if (!this.cardVisible) {
      this.cardVisible = inViewport;
    }
  }

  onInViewportChangeIcon(inViewport: boolean) {
    this.iconVisible = inViewport;
  }

}
