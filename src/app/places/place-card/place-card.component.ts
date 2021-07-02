import { Component, Input, OnInit } from '@angular/core';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Place } from 'src/app/_models/place';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent implements OnInit {
  @Input() place!: Place;
  link = '';
  faMap = faMapMarkedAlt;

  constructor() { }

  ngOnInit(): void {
    this.link = 'https://www.google.com/maps/place/' + this.place.point.lat + ',' + this.place.point.lon;
  }

}
