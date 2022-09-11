import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, startWith, switchMap } from 'rxjs';
import { Scooter } from 'src/app/models/scooter';
import { RentService } from 'src/app/rent/services/rent.service';
import { ScootersService } from '../../services/scooters.service';

@Component({
  selector: 'app-scooters-page',
  templateUrl: './scooters-page.component.html',
  styleUrls: ['./scooters-page.component.scss']
})
export class ScootersPageComponent implements OnInit {


  public page = new BehaviorSubject<number>(1);

  public size = new BehaviorSubject<number>(100);

  public scooters =combineLatest([
    this.page,
    this.size,
  ]).pipe(
    startWith([1, 100]),
    switchMap(([page, size]) => this.scootersService.getScooters(page, size))
  );
  constructor(
    private readonly scootersService: ScootersService,
    private readonly rent: RentService,
    private readonly router: Router,
  ) {


  }

  ngOnInit(): void {
  }


  public reload() {
    // this.scooters.next([]);
    this.page.next(1);
  }

  public changePage(page: PageEvent) {
    this.page.next(page.pageIndex);
  }


  public async createRent(scooter: Scooter) {
    try {
      const rent = await this.rent.createRent(new Date(), scooter.uid);

      this.router.navigate(['/rent', rent.uid]);
    } catch {

    }
  }

}
