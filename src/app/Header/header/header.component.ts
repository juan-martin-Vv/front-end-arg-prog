import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';

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


  isAdmin!:boolean;
  constructor(config:NgbCarouselConfig,
    private miApi:InyectorDataService,
    private miAuth:TokenService
    ) {
    config.showNavigationArrows=true;
    config.showNavigationIndicators=true
    this.images=[...this.images,'../../../assets/V4CQNELMTFE4DDFOY6SO2AATTE.jpg']
    this.images=[...this.images,'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940']
   }

  ngOnInit(): void {
    this.miAuth.isAdminObs.subscribe(d=>this.isAdmin=d)
    console.log(this.images)

  }

}
