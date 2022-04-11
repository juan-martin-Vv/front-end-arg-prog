import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[NgbCarouselConfig]
})
export class HeaderComponent implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators = false;
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @Input()
  isAdmin!:boolean;
  constructor(config:NgbCarouselConfig) {
    config.showNavigationArrows=true;
    config.showNavigationIndicators=true
    this.images=[...this.images,'../../../assets/V4CQNELMTFE4DDFOY6SO2AATTE.jpg']
   }

  ngOnInit(): void {
    console.log(this.images)
  }

}
