import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rent-creation-page',
  templateUrl: './rent-creation-page.component.html',
  styleUrls: ['./rent-creation-page.component.scss']
})
export class RentCreationPageComponent implements OnInit {



  public rentCreationForm = this.fb.group({
    dateFrom: '',
    dateTo: '',
  })


  public get dateFromControl() {
    return this.rentCreationForm.controls['dateFrom'] as FormControl;
  }

  public get minDate() {
    return this.rentCreationForm.controls['dateFrom'].value;
  }

  public get dateToControl() {
    return this.rentCreationForm.controls['dateTo'] as FormControl;
  }

  public get maxDate() {
    return this.rentCreationForm.controls['dateTo'].value;
  }

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
