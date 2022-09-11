import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';


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
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  public async register() {
    if (!this.registerForm.valid) return;

    const formValue = this.registerForm.value;
    try {
      const user = await lastValueFrom(this.auth.createUser({
        uid: uuidv4(),
        user_role: 'user',
        login: formValue.login,
        password: formValue.password,
      }))

      const session = await lastValueFrom(this.auth.login(formValue.login, formValue.password))
      this.auth.setToken(session.jwt);
      this.router.navigateByUrl('/');

    } catch (e: unknown) {
      if (e instanceof Error) {
        this.snackBar.open(e.message);
      }
    }
  }

}
