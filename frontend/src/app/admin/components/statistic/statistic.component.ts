import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Stats } from 'src/app/models/stats';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  public stats$: Observable<Stats>;

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.stats$ = this.activatedRoute.data.pipe(
      map(({stats}) => stats),
    )
  }

  ngOnInit(): void {
  }

}
