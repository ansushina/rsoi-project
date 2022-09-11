import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {


  public authForm = this.fb.group({
    login: '',
    password: '',
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  public async login() {
    if (!this.authForm.valid) return;

    const formValue = this.authForm.value;
    console.log(this.authForm.valid, this.authForm.value);
    try {
      const session = await lastValueFrom(this.auth.login(formValue.login, formValue.password));
      this.auth.setToken(session.jwt);
      this.router.navigateByUrl('/');
    } catch {
      this.snackBar.open('Не удалось войти. Проверьте праивльность заполнения полей.')
    }
  }
}
