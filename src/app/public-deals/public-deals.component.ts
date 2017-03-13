import { Component, OnInit } from '@angular/core';
import { Deal } from '../deal';
import { AuthService } from '../auth.service';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-public-deals',
  templateUrl: './public-deals.component.html',
  styleUrls: ['./public-deals.component.css']
})
export class PublicDealsComponent implements OnInit {

  publicDeals: Deal[];

  constructor(private dealsService: DealsService, private auth: AuthService) { }

  ngOnInit() {
    this.dealsService.getPublicDeals()
          .then(deals => this.publicDeals = deals);
  }

}
