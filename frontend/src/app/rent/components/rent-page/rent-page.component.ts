import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, shareReplay, switchMap } from 'rxjs';
import { Rent } from 'src/app/models/rent';
import { RentService } from '../../services/rent.service';

@Component({
  selector: 'app-rent-page',
  templateUrl: './rent-page.component.html',
  styleUrls: ['./rent-page.component.scss']
})
export class RentPageComponent implements OnInit {


  public rent: Observable<Rent>

  constructor(
    private readonly route: ActivatedRoute,
    private readonly rentService: RentService,
    private readonly router: Router,
  ) {
    const id = route.snapshot.params['id'];
    this.rent = this.route.params.pipe(
      switchMap(params => this.rentService.getRent(params['rentId'])),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    )
  }

  ngOnInit(): void {
  }


  async stopRent(uid: string) {
    try {

      await this.rentService.stopRent(uid);

      this.router.navigate(['/']);
    } catch {

    }
  }
}
