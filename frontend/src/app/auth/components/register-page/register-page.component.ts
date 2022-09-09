import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public registerForm = this.fb.group({
    login: '',
    password: '',
    repeatPassword: '',
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

   public register() {
    if (!this.registerForm.valid) return;

    const formValue = this.registerForm.value;
    try {
      await lastValueFrom(this.auth.createUser({}))

    } catch (e: unknown){
      if (e instanceof Error) {
        this.snackBar.open(e.message);
      }
    }
   }

}
