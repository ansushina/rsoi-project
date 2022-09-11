import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/rent/services/rent.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public rents = this.rent.getUserRent();



  displayedColumns: string[] = ['scooterName', 'startDate', 'endDate', 'price'];

  login = localStorage.getItem('login')


  constructor(
    private readonly rent: RentService

  ) { }

  ngOnInit(): void {
  }

}
